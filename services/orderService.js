const Order = require('../models/orderModel');

async function createOrder(tenantId, orderData) {
    orderData.tenantId = tenantId;
    return await Order.create(orderData);
}

async function getAllOrders(tenantId) {
    return await Order.find({ tenantId });
}

async function getOrderById(tenantId, orderId) {
    return await Order.findOne({ _id: orderId, tenantId });
}

async function updateOrder(tenantId, orderId, updateData) {
    return await Order.findOneAndUpdate(
        { _id: orderId, tenantId },
        updateData,
        { new: true }
    );
}

async function deleteOrder(tenantId, orderId) {
    return await Order.findOneAndDelete({ _id: orderId, tenantId });
}

async function getOrdersByStatus(tenantId, status) {
    console.log(status);
    if (status === 'Cerrado') {
        return await Order.find({ tenantId, status })
                         .sort({ startTime: -1 })  // Ordenar por fecha descendente
                         .limit(5);                // Limitar a 5 resultados
    } else if (status === 'En Curso') {
        return await Order.find({ tenantId, status })
                         .sort({ startTime: -1 });  // Solo ordenar por fecha
    }
    throw new Error('Estado no válido. Use "En Curso" o "Cerrado"');
}

async function setOrderStatus(tenantId, orderId, status) {
    return await Order.findOneAndUpdate(
        { _id: orderId, tenantId },
        { $set: { status: status } },  
        { new: true } 
    );
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByStatus,
    setOrderStatus
};