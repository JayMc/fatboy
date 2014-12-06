items:
	name: 'bundle of wood','milking cow'?,'cake'
	owner_id: people_id,
	price: 0,
	condition: 0-100 //tools like axes take on damage on each use, they are either detroyed or repaired for a fee
	units: 0-100 //uses remaining. food reduce units as they are used, can be refilled for a fee
	level: 0-100 //how advanced it is, 0 axe takes longer to get wood than a 50 axe
	tradeHistory:[{
		sold_by: people_id,
		bought_by: people_id,
		traded: Date,
		price: 0
	}]

//when an item is destroyed, (1 or 2) new ones are randomly dropped somewhere