# buttplug.io control via OSC signals

import asyncio
import logging
import sys
from pythonosc.osc_server import AsyncIOOSCUDPServer
from pythonosc.dispatcher import Dispatcher
from buttplug import Client, WebsocketConnector, ProtocolSpec

# The IP address and port that the OSC server will listen on
ip = "127.0.0.1"
port = 6789

async def main():
    # Slightly weird setup to allow dispatcher to call non-async functions 
    # on receiving OSC inputs within an async loop.
    async def curvy_control(ctrl):
        await client.devices[1].actuators[0].command(ctrl)
    
    def curvy_handler(address, *args):
        asyncio.get_event_loop().create_task(curvy_control(args[0]))

    async def jive_control(ctrl):
        await client.devices[0].actuators[0].command(ctrl)
    
    def jive_handler(address, *args):
        asyncio.get_event_loop().create_task(jive_control(args[0]))

    # Set up the dispatcher to handle incoming OSC messages
    dispatcher = Dispatcher()
    dispatcher.map("/jive", jive_handler)
    dispatcher.map("/curvy", curvy_handler)

     # Create the server
    server = AsyncIOOSCUDPServer((ip, port), dispatcher, asyncio.get_event_loop())
    # Create the transport layer for UDP communication
    transport, protocol = await server.create_serve_endpoint()  # Create datagram endpoint and start serving

    # Set up connections for buttplug.io    
    client = Client("Feedbacker", ProtocolSpec.v3)
    connector = WebsocketConnector("ws://127.0.0.1:12345", logger=client.logger)

    try:
        await client.connect(connector)
    except Exception as e:
        logging.error(f"Could not connect to server, exiting: {e}")
        return

    # Scan for devices
    await client.start_scanning()
    await asyncio.sleep(5)
    await client.stop_scanning()

    # Enter main loop, waiting for OSC messages; exit after 60s. 
    await asyncio.sleep(60)
    # Clean up at end    
    await client.disconnect()
    await transport.close()


# First things first. We set logging to the console and at INFO level.
logging.basicConfig(stream=sys.stdout, level=logging.INFO)

asyncio.run(main(), debug=True)