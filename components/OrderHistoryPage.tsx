
import React from 'react';
import type { Order } from '../types';

interface OrderHistoryPageProps {
    orders: Order[];
}

const statusStyles = {
    Placed: 'bg-blue-100 text-blue-800',
    Shipped: 'bg-yellow-100 text-yellow-800',
    Delivered: 'bg-green-100 text-green-800',
};

export const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({ orders }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h2>
            {orders.length === 0 ? (
                <p className="text-gray-600">You haven't placed any orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(order => (
                        <div key={order.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start bg-gray-50 p-3 rounded-t-lg border-b">
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-600">ORDER PLACED</p>
                                    <p>{new Date(order.date).toLocaleDateString()}</p>
                                </div>
                                <div className="text-sm">
                                     <p className="font-semibold text-gray-600">TOTAL</p>
                                    <p>₹{order.total.toLocaleString('en-IN')}</p>
                                </div>
                                 <div className="text-sm">
                                     <p className="font-semibold text-gray-600">ORDER #</p>
                                    <p>{order.id}</p>
                                </div>
                            </div>
                            <div className="p-3">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Status: 
                                        <span className={`ml-2 text-sm font-medium px-2.5 py-0.5 rounded ${statusStyles[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </h3>
                                    <div>
                                        <button className="text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1 mr-2">Track Package</button>
                                        <button className="text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1">Reorder Items</button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                {order.items.map(item => (
                                    <div key={item.id} className="flex items-center">
                                        <img src={item.imageUrl} alt={item.name} className="w-16 h-20 object-cover rounded-md"/>
                                        <div className="ml-4">
                                            <p className="font-semibold text-gray-800">{item.name}</p>
                                            <p className="text-sm text-gray-600">{item.brand}</p>
                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
