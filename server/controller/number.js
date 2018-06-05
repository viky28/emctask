var config  = require("../config.json");
var number = require("../model/number");
var router={};


router.saveData = function(req, res) {

	var ip = req.body.params;
	if(!ip.firstNum || !ip.secondNum || !ip.multiple){
		res.status(200).send(JSON.stringify({status:"error", "msg":"All conditions not met"}))
		return;
	}
	number.saveData(ip, function(err,cbresult){
		if(err){
			res.status(200).send(JSON.stringify({status:"error", "msg":"Some issue with your data"}))
		} else {
			res.send(JSON.stringify({status:"success", result: cbresult}));
		}
	})
}

router.getData = function(req, res) {

	var ip = req.body;
	if(!ip){
		res.status(200).send(JSON.stringify({status:"error", "msg":"All conditions not met"}))
		return;
	}
	number.getData(ip, function(err,cbresult){
		if(err){
			res.status(200).send(JSON.stringify({status:"error", "msg":"Some issue with your data"}))
		} else {
			res.send(JSON.stringify({status:"success", result: cbresult}));
		}
	})
}

module.exports = router
