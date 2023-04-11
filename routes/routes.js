const express = require('express');
const router = express.Router();
const itemController = require('../controllers/controller');

// Routes
router.get('/test', itemController.test);
router.get('/items', itemController.getItems);
router.get('/items/:id', itemController.getItemById);
router.post('/items', itemController.addNewItem);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;
