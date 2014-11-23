# Idea
The idea of fatboy is to create something that will generate a lot of data for Mongo testing/learning (queries, replicate set, sharding etc..)

## quick brain dump
```javascript
population : {
	name: {
		first: '',
		last: ''
	},
	DOB:,
	credentials: [{
		type: passport/socialsecurity,
		data:''
	}],
	travelHistory:[{
		departDate:,
		arrivalDate:
		departLocation:,
		arrivalLocation:,
		visa:'',
		laugage:''
	}],
	contactDetails:[{
		type: 'email/phone ..',
		data: ''
	}]
	address: [{
		street: '',
		suburb: '',
		geo: {long:'',lat:''}
	}],
	occupation: [
	],
	work: [{
		title: '',
		salary: 50000,
		startDate:,
		endDate:,

		address: [{
			street: '',
			suburb: '',
			geo: {long:'',lat:''}
		}],
	}],
	assets:[{
		type:,
		location:,
		name:,
	}],
	
	children: [{
		populationID:
	}]
	vehicles: [
	],
	interests: [
	],
	pets:[{
		type:,
		name:
	}],
	apperance: {
		hairColour:'',
		eyeColour:'',
		height: '',
		weight:'',
		race:'',
		languages:[{
			language:
			fluency:
		}]
	},
	images: [
		{
		title: '',
		url:'',
		geo: {long:'',lat:''}
		}
	],
	criminalHistory: [{
		offenseDate:,
		location:'',
		AuthorityID: ,
		details:'',
	}]

}
```