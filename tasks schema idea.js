tasks
	{
		type: //travel, buy/sell? (auto taken care of under trade), plant flower/crops, chop wood, mine coal, get water, fishing.
		priority: 0-100 //lowest is first
		decsription:
		location: //if task is to travel - destination
		created: 
		completed: 
		duration: //how long it should take, travel should take a while, drinking water can be done quickly

	}

//task can be generated by analysing what is highest demanding item for trade, tasks are created to try to make a supply for that demand
//if the highest demand is coal, these tasks are created:
	//get enough money to buy the required tool
	//buy a tool for mining coal
	//travel to a coal mine
	//obtain coal
	//find someone to sell coal to