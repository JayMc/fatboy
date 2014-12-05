people: {
	name: {
		first:
		middle:
		last:
	},
	family: {
		children: [{
			people_id:
			type: daughter/son
		}],
		mother: people_id,
		father_id: people_id
	},
	partner: {
		people_id:
		type: girlfriend/boyfriend/husband/wife
		since: Date
	},
	money: x coins
	DOB:, Date
	DOD:, Date
	health: ?,
	mood: ?
	personality: { based on parents personality and random range +- 3
		kindness: 0-10,
		greed:,
		honesty:,
		etc (can be used to influence behavior and weight randomness)
		endurance:? can travel further
		intelligence:? can get a better trade price
		habits: stealing, murderer, rapist,
		likes: people with xyz name, certain items
		dislikes: people with xyz name, certain items, areas with x number of people
	},
	locations: [{
			type: 'current',
			loc: [5, 10] //mongo 2D legacy
		},{
			type: 'home',
			loc: [0, 8]
		},{
			type: 'work', ?
			loc: [8, 4]
		},
	]
	trade: {
		buying:[{ //what they want to buy
			item_id:
		}],
		selling:[{ //what they want to sell

		}]
	},
	lastUpdate: (when node last made changes, so that it doesn't get processed again for another x mins)

}



