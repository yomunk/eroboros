"""
Small example OSC client
"""
import argparse
import random
import time
import math


from pythonosc import udp_client


if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument("--ip", default="127.0.0.1",
      help="The ip of the OSC server")
  parser.add_argument("--port", type=int, default=6789,
      help="The port the OSC server is listening on")
  args = parser.parse_args()

  client = udp_client.SimpleUDPClient(args.ip, args.port)

  for x in range(10000):
    wave = 0.5*(1+math.sin(time.time()))
    client.send_message("/curvy", wave )

    if wave > 0.5:
      client.send_message('/jive', 1)
    else:
      client.send_message('/jive', 0)
    time.sleep(0.001)

client.send_message('/jive', 0)
client.send_message('/curvy', 0)
