import api from '../lib/axios'

export const messageService = {
  getMessages: async (params = {}) => {
    const response = await api.get('/messages', { params })
    return response.data
  },

  sendMessage: async (data) => {
    const response = await api.post('/messages', data)
    return response.data
  },

  markAsRead: async (id) => {
    const response = await api.put(`/messages/${id}/read`)
    return response.data
  },
}
