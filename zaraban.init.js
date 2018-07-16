const
    tableDB = 'zaraban_init',
    express = require('express'),
    _objectId = require('mongodb').ObjectID,
    router = express.Router();
//---------------------------------------
router
    .post('/', (req, res) => {
        req.app.db.collection(tableDB).insert(req.body, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
                res.end();
            }
        });
    })
    .put('/', (req, res) => {
        let _id = req.body._id;
        delete req.body._id;
        req.app.db.collection(tableDB).update({ _id: _objectId(_id) }, req.body, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
                res.end();
            }
        });
    })
    //----------------------------------------------------------------------------
    .get('/ostan', (req, res) => {
        req.app.db.collection(tableDB).find({ ostan_code: { $exists: true } }).toArray((err, data) => {
            res.json(data);
        })
    })
    //----------------------------------------------------------------------------
    .get('/city_of_ostan/:ostan_name', (req, res) => {
        req.app.db.collection(tableDB).find({
            $and: [{ 'ostan.ostan_name': req.params.ostan_name }, { 'city_code': { $exists: true } }]
        }).toArray((err, data) => {
            res.json(data);
        })
    })
    //----------------------------------------------------------------------------
    .get('/typedoctor', (req, res) => {
        req.app.db.collection(tableDB).find({ td_code: { $exists: true } }).toArray((err, data) => {
            res.json(data);
        })
    })
    //----------------------------------------------------------------------------
    .get('/tw_of_td/:td_name', (req, res) => {
        req.app.db.collection(tableDB).find({
            $and: [{ 'td.td_name': req.params.td_name }, { 'tw_code': { $exists: true } }]
        }).toArray((err, data) => {
            res.json(data);
        })
    })    
    //----------------------------------------------------------------------------
    .get('/captiondoctor', (req, res) => {
        req.app.db.collection(tableDB).find({ cd_code: { $exists: true } }).toArray((err, data) => {
            res.json(data);
        })
    })
    .get('/doctor_of_td/:td_name', (req, res) => {
        req.app.db.collection(tableDB).find({
            $and: [{ 'td.td_name': req.params.td_name }, { 'doctor_code': { $exists: true } }]
        }).toArray((err, data) => {
            res.json(data);
        })
    })   
module.exports = router