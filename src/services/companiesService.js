import apiClient from './apiClient.js'

export const companiesService = {
  // Obtener lista de empresas
  getCompanies: async () => {
    try {
      console.log('Llamando a getCompanies...')
      const response = await apiClient.get('/api/companies/listCompanies')
      console.log('Respuesta del servidor:', response)
      
      if (response.data?.companies) {
        return response.data.companies
      } else if (response.data?.msg && Array.isArray(response.data.msg)) {
        return response.data.msg
      } else if (Array.isArray(response.data)) {
        return response.data
      }
      
      console.warn('Formato de respuesta inesperado:', response.data)
      return []
    } catch (error) {
      console.error('Error en getCompanies:', error)
      throw error
    }
  },

  // Guardar nueva empresa
  saveCompany: async (companyData) => {
    try {
      console.log('Enviando datos a la API:', companyData)
      const response = await apiClient.post('/api/companies/saveCompanies', companyData)
      console.log('Respuesta de la API:', response)
      return response.data
    } catch (error) {
      console.error('Error al guardar la empresa:', error.response || error)
      throw error
    }
  },

  // Actualizar empresa existente
  updateCompany: (id, companyData) => {
    return apiClient.put(`/api/companies/updateCompanies/${id}`, companyData)
  },

  // Activar empresa
  activateCompany: async (id) => {
    const response = await apiClient.put(`/api/companies/activeCompanies/${id}`)
    console.log('Respuesta del servicio activar:', response)
    return response
  },

  // Desactivar empresa
  deactivateCompany: async (id) => {
    const response = await apiClient.put(`/api/companies/inactiveCompanies/${id}`)
    console.log('Respuesta del servicio desactivar:', response)
    return response
  },

  // Eliminar empresa (si se necesita)
  deleteCompany: (id) => {
    return apiClient.put(`/api/companies/activeCompanies/${id}`)
  }
}

export default companiesService

