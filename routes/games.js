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
		      //res.render("gameOnlineClient", { title: 'Online Spiel Client', name: gameName});
		      res.redirect("gameOnlineClient");
		    }
		    else{
		      // ToDo: Fehlermeldung falsches Passwort
		      //return: Falsche Login Informationen, Weiterleitung zurück auf joinSession Seite
		      //res.redirect("gameOnlineJoin");
		      res.send("Falsches Passwort.");
		    }
		}
  });
});

module.exports = router;
