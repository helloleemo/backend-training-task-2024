const express = require('express')

const router = express.Router()
const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('CreditPackage')//這樣錯誤訊息可以顯示CreditPackage

router.get('/', async (req, res, next) => {

    res.status(200).json({
        status: 'success',
        message: '獲得資料!'
      })
})

router.post('/', async (req, res, next) => {

   
})

router.delete('/:creditPackageId', async (req, res, next) => {
})

module.exports = router
