import api from '../lib/axios'

export const orderService = {
  getOrders: async (params = {}) => {
    const response = await api.get('/orders', { params })
    return response.data
  },

  getOrder: async (id) => {
    const response = await api.get(`/orders/${id}`)
    return response.data
  },

  createOrder: async (data) => {
    const response = await api.post('/orders', data)
    return response.data
  },

  updateOrder: async (id, data) => {
    const response = await api.put(`/orders/${id}`, data)
    return response.data
  },

  updateOrderStatus: async (id, statutId, commentaire) => {
    const response = await api.put(`/orders/${id}/status`, { statutId, commentaire })
    return response.data
  },

  deleteOrder: async (id) => {
    const response = await api.delete(`/orders/${id}`)
    return response.data
  },
}
