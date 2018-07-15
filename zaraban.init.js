const
    tableDB = 'zaraban_init',
    express = require('express'),
    _objectId = require('mongodb').ObjectID,
    router = express.Router();
//---------------------------------------
router
    .get('/ostan', (req, res) => {
        req.app.db.collection(tableDB).find({ ostan_code: { $exists: true } }).toArray((err, data) => {
            res.json(data);
        })
    })
    .post('/ostan', (req, res) => {
        req.app.db.collection(tableDB).insert(req.body, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
                res.end();
            }
        });
    })
    .put('/ostan', (req, res) => {
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
//---------------------------------------
router
    .get('/city_of_ostan/:ostan_name', (req, res) => {
        req.app.db.collection(tableDB).find({
            $and: [{ 'ostan.ostan_name': req.params.ostan_name }, { 'city_code': { $exists: true } }]
        }).toArray((err, data) => {
            res.json(data);
        })
    })
    .post('/city', (req, res) => {
        req.app.db.collection(tableDB).insert(req.body, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
                res.end();
            }
        });
    })
    .put('/city', (req, res) => {
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
module.exports = router