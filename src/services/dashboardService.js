import api from '../lib/axios'

export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats')
    return response.data
  },

  getRecentOrders: async (limit = 5) => {
    const response = await api.get('/dashboard/recent-orders', { params: { limit } })
    return response.data
  },

  getTopProducts: async (limit = 5) => {
    const response = await api.get('/dashboard/top-products', { params: { limit } })
    return response.data
  },

  getChartData: async (type = 'orders', period = 'month') => {
    const response = await api.get('/dashboard/chart-data', { params: { type, period } })
    return response.data
  },
}
