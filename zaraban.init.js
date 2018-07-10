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
//---------------------------------------
router
    .get('/city', (req, res) => {
        req.app.db.collection(tableDB).find({ ostan_code: { $exists: false } }).toArray((err, data) => {
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
module.exports = router