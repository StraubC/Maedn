var express = require('express');
var router = express.Router();

/*
 * GET Online Game Master
 */

router.get('/gameOnlineMaster', function(req, res){
  res.render('gameOnlineMaster', { title: 'Online Spiel Master'});
});

/*
 * GET Online Game Client
 */

router.get('/gameOnlineClient', function(req, res){
  res.render('gameOnlineClient', { title: 'Online Spiel Client'});
});

/*
 * GET Party Game Master
 */

router.get('/gamePartyMaster', function(req, res){
  res.render('gamePartyMaster', { title: 'Party Spiel Master'});
});

/*
 * GET Party Game Client
 */

router.get('/gamePartyClient', function(req, res){
  res.render('gamePartyClient', { title: 'Party Spiel Client'});
});

/*
 * POST Online Game anlegen
 */
router.post('/gameOnlineSetup', function(req, res){
  var db = req.db;
  var collection = db.get('gamecollection');
  var gameName = req.body.gameName;
  var gamePw = req.body.gamePw;

  collection.insert({
    "name" : gameName,
    "pw" : gamePw },
    function(err, doc){
      if(err){
        // return: Fehlermeldung
        console.log(gameName + gamePw);
        res.send("Fehler beim hinzufügen der Daten in die Datenbank.");
      }
      else{
        //return: Weiterleiten auf die gameOnlineMaster Seite
        res.redirect("gameOnlineMaster");
        //res.render('gameOnlineMaster', { title: 'Online Spiel Master', name: gameName});
      }
  });
});

/*
 * POST Online Game beitreten
 */

 router.post('/gameOnlineJoin', function(req, res){
  var db = req.db;
  var collection = db.get('gamecollection');
  var gameName = req.body['gameName'];
  var gamePw = req.body['gamePw'];
  var id ="";

  collection.findOne({ name: gameName}, function(err, doc){
  		if(err){
  			console.log(gameName + gamePw);
        	res.send("Ein Spiel mit dem Namen wurde nicht gefunden.");
  		}
  		else {
		    if(gamePw.toString() === doc.pw){
		      // return: Login bestätigt, Weiterleitung auf sessionClient Seite
		      res.redirect("gameOnlineClient");
		    }
		    else{
		      
		      res.send("Falsches Passwort.");
		    }
		}
  });
});

/*
 * POST Party Game anlegen
 */
router.post('/gamePartySetup', function(req, res){
  var db = req.db;
  var collection = db.get('gamecollection');
  var gameName = req.body.gameName;
  var gamePw = req.body.gamePw;
  var gameType = "party";

  collection.insert({
    "name" : gameName,
    "pw" : gamePw ,
    "type" : gameType},
    function(err, doc){
      if(err){
        // return: Fehlermeldung
        console.log(gameName + gamePw);
        res.send("Fehler beim hinzufügen der Daten in die Datenbank.");
      }
      else{
        //return: Weiterleiten auf die gameOnlineMaster Seite
        res.redirect("gameOnlineMaster");
        //res.render('gameOnlineMaster', { title: 'Online Spiel Master', name: gameName});
      }
  });
});

/*
 * POST Party Game beitreten
 */

 router.post('/gamePartyJoin', function(req, res){
  var db = req.db;
  var collection = db.get('gamecollection');
  var gameName = req.body['gameName'];
  var gamePw = req.body['gamePw'];
  var id ="";

  collection.findOne({ name: gameName}, function(err, doc){
  		if(err){
  			console.log(gameName + gamePw);
        	res.send("Ein Spiel mit dem Namen wurde nicht gefunden.");
  		}
  		else {
  			if(gamePw.toString() === doc.pw){
		      // return: Login bestätigt, Weiterleitung auf sessionClient Seite
		      //res.render("gameOnlineClient", { title: 'Online Spiel Client', name: gameName});
		      res.redirect("gamePartyClient");
		    }
		    else{
		      //return: Falsche Login Informationen, Weiterleitung zurück auf joinSession Seite
		      //res.redirect("gameOnlineJoin");
		      res.send("Falsches Passwort.");
		    }
		}
  });
});

 /*
 * POST gameState anlegen
 */
router.post('/gameState', function(req, res){
  	var db = req.db;
  	var collection = db.get('gameStateCollection');
  
  	collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * GET gameState abfragen
 */
router.get('/gameState', function(req, res) {

	/*
	 * ToDo: nur ein Objekt senden, nicht alle. findOne by id
	 */
    var db = req.db;
    var collection = db.get('gameStateCollection');
    collection.find({},{},function(e,docs){
        res.json(docs);
        //console.log(docs);
    });
});

/*
 * DELETE gameState löschen by id
 * ToDo: löscht alle Einträge
 */
router.delete('/:id', function(req, res){
  var db = req.db;
  var collection = db.get('gameStateCollection');
  var id = req.params.id.replace(/:/g,"").replace(/\s/g,"");
  collection.remove({}, function(err, doc){
    res.send("Daten gelöscht");
  });

});

/*
 * PUT gameState aktualisieren
 * 
 */

router.post('/gameStateUpdate', function(req, res){
  var db = req.db;
  var collection = db.get('gameStateCollection');
  //var id = req.params.id.replace(/:/g,"").replace(/\s/g,"");
  var uId = req.body.updateId;
  var newMove = req.body.updateMove;
  var newDice = req.body.updateDice;
  var newActive = req.body.updateActive;
  collection.findAndModify({id: uId}, {$push:{
        lastMoveToken:  newMove,
        lastDice: newDice,
        lastActivePlayer: newActive
      }
    }, {multi: false}, function(err, doc){
      if (err){
        return res.send(err);
      }
      else{
      	return res.send("Update erfolgreich");
      }
      

  });
});

module.exports = router;
