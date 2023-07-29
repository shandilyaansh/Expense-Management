const express = require('express')
const { addTransection, getAllTransection, editTransection, deleteTransection } = require('../controllers/transectionController')

// routert object
const router = express.Router()

// routes
// add trabsection POST
router.post('/add-transection', addTransection)

// Edit trabsection POST
router.post('/edit-transection', editTransection)

// Delete trabsection POST
router.post('/delete-transection', deleteTransection)

// get all Transection
router.post('/get-transection', getAllTransection)



module.exports = router