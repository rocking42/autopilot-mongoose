/* eslint-disable no-unused-vars, no-undef*/
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Book = require('../app/models/user');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('User', () => {
	// Before each test we empty the database
	beforeEach((done) => {
		Book.remove({}, (err) => {
			done();
		});
	});

	describe('/GET user', () => {
		it('should GET all the users', (done) => {
			chai.request(server)
			.get('/api/users')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(0);
				done();
			});
		});
	});

	describe('/POST user', () => {
		it('should not POST a user when missing a field', (done) => {
			const user = {
				firstName: 'Joey',
				email: 'joe@hotmail.com',
			};
			chai.request(server)
				.post('/api/users')
				.send(user)
				.end((err, res) => {
					console.log(res.text);
					res.should.have.status(200);
					res.text.should.be.eql('error with form data');
					done();
				});
		});

		it('should not POST a user with incorrect form', (done) => {
			const user = {
				firstName: 'James',
				lastName: 'Oakey',
				emal: 'wrongEmail@hotmail.com',
			};
			chai.request(server)
				.post('/api/users')
				.send(user)
				.end((err, res) => {
					console.log(res.text);
					res.should.have.status(200);
					res.text.should.be.eql('error with form data');
					done();
				});
		});

		it('should POST a user when correct data is given', (done) => {
			const user = {
				firstName: 'Correct',
				lastName: 'User',
				email: 'correctuser@hotmail.com',
			};
			chai.request(server)
			.post('/api/users')
			.send(user)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message').eql('User created');
				res.body.user.should.have.property('firstName');
				res.body.user.should.have.property('lastName');
				res.body.user.should.have.property('email');
				done();
			});
		});
	});
});
