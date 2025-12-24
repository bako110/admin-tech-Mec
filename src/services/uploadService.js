import api from '../lib/axios'

export const uploadService = {
  uploadImage: async (file, folder = 'general') => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('folder', folder)

    const response = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  uploadImages: async (files, folder = 'general') => {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('images', file)
    })
    formData.append('folder', folder)

    const response = await api.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  deleteImage: async (url) => {
    const response = await api.delete('/upload/image', { data: { url } })
    return response.data
  },
}
