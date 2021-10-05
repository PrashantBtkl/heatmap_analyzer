#!/usr/bin/env python3
import asyncio
import websockets
import json
import db
import logging


def store(pos):
	conn = db.get_conn()

	pos = json.loads(pos,)
	try:
		db.store_positions(pos, conn)
		print("successfully stored for page_id",pos["page_id"])
	except Exception as e:
		print("exception occured :", e)
	finally:
		conn.close()



async def get_info(websocket, path):
	while True:
		data = await websocket.recv()
		if data:
			store(data)


start_server = websockets.serve(get_info, "localhost", 8765)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
