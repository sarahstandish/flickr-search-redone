const express = require('express');

const searchCallCtrl = require('../controllers/api-ctrl')

const router = express.Router()

router.post('/searchCalls', searchCallCtrl.newCall)
router.get('/searchCalls', searchCallCtrl.getCalls)

module.exports = router;