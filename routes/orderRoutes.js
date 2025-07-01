const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const extractTenant = require('../middleware/tenantMiddleware');

router.use(extractTenant);

router.post('/', orderController.create);
router.get('/', orderController.listAll);
router.get('/:id', orderController.getOne);
router.put('/:id', orderController.update);
router.delete('/:id', orderController.remove);
router.get('/status/:status', orderController.listByStatus);
router.post('/status/:id', orderController.setStatus);

module.exports = router;