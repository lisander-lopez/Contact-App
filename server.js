var express = require('express');
var mongo = require('mongojs');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('127.0.0.1:27017/contactApp', ['contactApp']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/contactList', function(req, res) {
	db.contactApp.find(function(err, data) {
		res.json(data);
		console.log('Error Getting Contact List --- ' + err);
	});

});

app.post('/api/addContact', function(req, res) {
	db.contactApp.insert(req.body, function(err, data) {
		res.json(data);
		if (err) {
			console.log('Error adding Contact --- ' + err);
		};
	});
	

});

app.delete('/contactList/:id', function(req, res) {
	var id = req.params.id;
	console.log('Removing ID: ' + id);

	db.contactApp.remove({_id: mongojs.ObjectId(id)}, function(err, data) {
		res.json(data);
		console.log(data.ok);
	});
});

app.listen(3000);
console.log('Server running in port 3000');