

hmap_conf = []
	for coord in res:
		X = coord[0]
		Y = coord[1]

		xy = {x: X, y: Y, value: 0}
		if xy in hmap_conf:
			xy.value = xy.value + 1

		hmap_conf.append(xy)
