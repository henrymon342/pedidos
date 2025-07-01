const orderService = require('../services/orderService');

async function create(req, res) {
    const tenantId = req.tenantId;
    const order = await orderService.createOrder(tenantId, req.body);
    res.status(201).json({
        success: true,
        data: {
            id: order._id,
            client: order.client,
            total: order.total,
            status: order.status,
            startTime: order.startTime
        }
    });
}

async function listByStatus(req, res) {
    const tenantId = req.tenantId;
    const status = req.params.status;
    const orders = await orderService.getOrdersByStatus(tenantId, status);
    res.status(200).json({ success: true, data: orders });
}

async function listAll(req, res) {
    const tenantId = req.tenantId;
    let orders = await orderService.getAllOrders(tenantId);
    orders = orders.map(order => {
        const { __v, ...rest } = order.toObject ? order.toObject() : order;
        return rest;
    });
    res.status(200).json({ success: true, data: orders });
}

async function getOne(req, res) {
    const tenantId = req.tenantId;
    const id = req.params.id;
    const order = await orderService.getOrderById(req.tenantId, id);
    if (!order) return res.status(404).json({ success: false, message: 'Orden no encontrada' });
    res.status(200).json({ success: true, data: order });
}

async function update(req, res) {
    const tenantId = req.tenantId;
    const id = req.params.id;
    const updated = await orderService.updateOrder(req.tenantId, id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Orden no encontrada para actualizar' });
    res.status(200).json({ success: true, data: updated });
}

async function remove(req, res) {
    const tenantId = req.tenantId;
    const id = req.params.id;
    const deleted = await orderService.deleteOrder(req.tenantId, id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Orden no encontrada para eliminar' });
    res.status(200).json({ success: true, data: deleted });
}

async function setStatus(req, res) {
    const tenantId = req.tenantId;
    const id = req.params.id;
    const {status} = req.body;
    const order = await orderService.setOrderStatus(tenantId, id, status);
    res.status(200).json({
        success: true,
        data: {
            id: order._id,
            client: order.client,
            total: order.total,
            status: order.status,
            startTime: order.startTime
        }
    });
}

module.exports = {
    create,
    listByStatus,
    listAll,
    getOne,
    update,
    remove,
    setStatus
};