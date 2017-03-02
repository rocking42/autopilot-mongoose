const express = require('express');
const router = express.Router();
const User = require('../models/user');
// Error handling function
const formError = require('../handlers/formError');

router.get('/', (req, res) => {
	res.json({ message: 'welcome to the app' });
});

router.route('/users')
.post((req, res) => {
	const newUser = new User();
	if (formError(req.body)) {
		res.send('error with form data');
	} else {
		newUser.firstName = req.body.firstName;
		newUser.lastName = req.body.lastName;
		newUser.email = req.body.email;

		newUser.save((err, user) => {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'User created', user });
		});
	}
})
.get((req, res) => {
	User.find((err, users) => {
		if (err) {
			res.send(err);
		}
		res.json(users);
	});
});

module.exports = router;
