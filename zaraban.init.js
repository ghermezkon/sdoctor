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
    .put('/matab', (req, res) => {
        let _id = req.body._id;
        delete req.body._id;
        req.app.db.collection(tableDB).update(
            { _id: _objectId(_id) },
            {
                $set: {
                    'matab_base.matab_doctor': req.body.matab_base.matab_doctor,
                    'matab_base.matab_city': req.body.matab_base.matab_city,
                    'matab_base.matab_tel': req.body.matab_base.matab_tel,
                    'matab_base.matab_fax': req.body.matab_base.matab_fax,
                    'matab_base.matab_address': req.body.matab_base.matab_address
                }
            }, { upsert: true }, (err, result) => {
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
    .get('/doctor', (req, res) => {
        req.app.db.collection(tableDB).find({ doctor_code: { $exists: true } }).toArray((err, data) => {
            res.json(data);
        })
    })
    .get('/city', (req, res) => {
        req.app.db.collection(tableDB).find({ city_code: { $exists: true } }).toArray((err, data) => {
            res.json(data);
        })
    })
    .get('/matab', (req, res) => {
        req.app.db.collection(tableDB).find({ matab_base: { $exists: true } }).toArray((err, data) => {
            res.json(data);
        })
    })
    .get('/matab_base', (req, res) => {
        req.app.db.collection(tableDB).find({ matab_base: { $exists: true } }, {
            fields: { 'matab_base': 1, '_id': 1 }
        }).toArray((err, data) => {
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
    .get('/search_doctor/:doctor_name', (req, res) => {
        req.app.db.collection(tableDB).find({
            $and: [{ 'doctor_name': { $regex: req.params.doctor_name } }, { 'doctor_code': { $exists: true } }]
        }).toArray((err, data) => {
            res.json(data);
        })
    })
module.exports = router