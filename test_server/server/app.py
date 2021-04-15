#!/usr/bin/env python3
import asyncio
import websockets
import logging

async def server(websocket, path):
	while True:
		data = await websocket.recv()
		print(f"< {data}")


start_server = websockets.serve(server, "localhost", 8765)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
