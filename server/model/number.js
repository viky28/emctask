var config  = require("../config.json");
var Sequence = require('sequence').Sequence;
var _ = require('underscore');
var database = require("./database");
var ObjectId = require('mongodb').ObjectID;

exports.saveData = function(p,cb){
	var db;
	var seq = Sequence.create();
	seq
	.then(function(next){
		database.getdb(function(err,dbref){
			if(err){
				console.log("ERROR", "unable to connect to DB");
				process.exit(1);
			} else {
				db=dbref;
				next();
			}
		})
	})
	.then(function(next){
		p.saveTime = new Date();
		db.number.save(p, function(er,re){
			if(er || !re){
				cb("ERROR",null)
			} else {
				cb(er,re)
			}
		})
	})

}
exports.getData = function(p,cb){
	var db;
	var seq = Sequence.create();
	seq
	.then(function(next){
		database.getdb(function(err,dbref){
			if(err){
				console.log("ERROR", "unable to connect to DB");
				process.exit(1);
			} else {
				db=dbref;
				next();
			}
		})
	})
	.then(function(next){
		db.number.find({}).sort({_id:-1}).limit(1).toArray(function(er,re){
			if(er || !re){
				cb("ERROR",null)
			} else {
				cb(er,re)
			}
		})
	})

}

