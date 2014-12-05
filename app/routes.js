var People = require('./models/people')

var urlPrefix = '/api'

module.exports = function(app){
	app.get(urlPrefix+'/people', function(req, res){
		People
			.find()
			.exec(function(err, people){
				if(err)
						return res.json(err)

				return res.json(people)
			})
	})

	app.post(urlPrefix+'/people', function(req, res){
		console.log(req.body)

		var newPerson = new People({
			name: {
				first: req.body.name.first
			}
		})

		newPerson.save(function(err, people){
			if(err)
					return res.json(err)

			return res.json(people)
		})
		
	})
}