var express = require('express');
var router = express.Router();

/*  
 * GET home page
 */

router.get('/', function(req, res) {
  res.render('index', { title: 'Home'});
});

router.get('/home', function(req, res) {
  res.render('index', { title: 'Home'});
});

router.get('/index', function(req, res) {
  res.render('index', { title: 'Home'});
});

/*
 * GET Online page
 */

router.get('/gameOnline', function(req, res){
  res.render('gameOnline', { title: 'Online Game'});
});

/*
 * GET Party page
 */

router.get('/gameParty', function(req, res){
  res.render('gameParty', { title: 'Party Game'});
});

/*
 * GET Master page.
 */

router.get('/masterOnline', function(req, res){
  res.render('masterOnline', { title: 'Online Master'});
});

/*
 * GET Client page.
 */

router.get('/clientOnline', function(req, res){
  res.render('clientOnline', { title: 'Online Client'});
});

/*
 * GET Party Master page.
 */

router.get('/masterParty', function(req, res){
  res.render('masterParty', { title: 'Party Master'});
});

/*
 * GET Party Client page.
 */

router.get('/clientParty', function(req, res){
  res.render('clientParty', { title: 'Party Client'});
});

module.exports = router;
