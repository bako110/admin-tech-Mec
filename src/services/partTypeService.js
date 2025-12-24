import api from '../lib/axios'

export const partTypeService = {
  getPartTypes: async (params = {}) => {
    const response = await api.get('/part-types', { params })
    return response.data
  },

  getPartType: async (id) => {
    const response = await api.get(`/part-types/${id}`)
    return response.data
  },

  createPartType: async (data) => {
    const response = await api.post('/part-types', data)
    return response.data
  },

  updatePartType: async (id, data) => {
    const response = await api.put(`/part-types/${id}`, data)
    return response.data
  },

  deletePartType: async (id) => {
    const response = await api.delete(`/part-types/${id}`)
    return response.data
  },

  reorderPartType: async (id, ordre) => {
    const response = await api.put(`/part-types/${id}/reorder`, { ordre })
    return response.data
  },
}
