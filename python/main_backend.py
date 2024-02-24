import serial
import socket
import threading

# Serial port configuration
serial_port = 'COM5'  # Replace 'COMx' with your serial port
baud_rate = 9600  # Set your baud rate
timeout = 1  # Set your read timeout

# UDP configuration for sending data
remote_host = '10.20.30.255'  # Remote IP address for sending data
remote_port = 12345  # Remote port for sending data

# UDP configuration for receiving data
local_host = '0.0.0.0'  # Listen on all available interfaces
local_port = 12345  # Local port for receiving data

# Initialize serial connection
ser = serial.Serial(serial_port, baud_rate, timeout=timeout)

# Initialize UDP socket for sending data
send_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Initialize UDP socket for receiving data
recv_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
recv_sock.bind((local_host, local_port))  # Bind socket to local host and port

def udp_receive():
    while True:
        data, addr = recv_sock.recvfrom(1024)  # Buffer size is 1024 bytes
        print(f"Received message: {data} from {addr}")

# Start UDP receive thread
recv_thread = threading.Thread(target=udp_receive, daemon=True)
recv_thread.start()

try:
    while True:
        if ser.in_waiting > 0:
            data = ser.readline()  # Read data from serial port
            print(data)
            send_sock.sendto(data, (remote_host, remote_port))  # Send data over UDP
except KeyboardInterrupt:
    print("Program terminated by user")

finally:
    ser.close()  # Close serial port
    send_sock.close()  # Close UDP send socket
    recv_sock.close()  # Close UDP receive socket
    print("Serial and UDP connections closed")