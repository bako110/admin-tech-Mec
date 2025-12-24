import api from '../lib/axios'

export const adminService = {
  getAdmins: async (params = {}) => {
    const response = await api.get('/admins', { params })
    return response.data
  },

  getAdmin: async (id) => {
    const response = await api.get(`/admins/${id}`)
    return response.data
  },

  createAdmin: async (data) => {
    const response = await api.post('/admins', data)
    return response.data
  },

  updateAdmin: async (id, data) => {
    const response = await api.put(`/admins/${id}`, data)
    return response.data
  },

  deleteAdmin: async (id) => {
    const response = await api.delete(`/admins/${id}`)
    return response.data
  },

  toggleAdminStatus: async (id) => {
    const response = await api.put(`/admins/${id}/toggle-status`)
    return response.data
  },
}
