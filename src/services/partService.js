import api from '../lib/axios'

export const partService = {
  getParts: async (params = {}) => {
    const response = await api.get('/parts', { params })
    return response.data
  },

  getPart: async (id) => {
    const response = await api.get(`/parts/${id}`)
    return response.data
  },

  createPart: async (data) => {
    const response = await api.post('/parts', data)
    return response.data
  },

  updatePart: async (id, data) => {
    const response = await api.put(`/parts/${id}`, data)
    return response.data
  },

  deletePart: async (id) => {
    const response = await api.delete(`/parts/${id}`)
    return response.data
  },
}
