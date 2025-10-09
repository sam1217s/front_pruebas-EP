import { apiClient } from '../plugins/pluginAxios.js'

export { apiClient }

// GET - Obtener datos
export async function getData(url) {
  try {
    const response = await apiClient.get(url)
    return response.data
  } catch (error) {
    console.error('Error en GET:', error)
    throw error
  }
}

// POST - Crear datos
export async function postData(url, data) {
  try {
    const response = await apiClient.post(url, data)
    return response.data
  } catch (error) {
    console.error('Error en POST:', error)
    throw error
  }
}

// PUT - Actualizar datos
export async function putData(url, data) {
  try {
    const response = await apiClient.put(url, data)
    return response.data
  } catch (error) {
    console.error('Error en PUT:', error)
    throw error
  }
}

// DELETE - Eliminar datos
export async function deleteData(url) {
  try {
    const response = await apiClient.delete(url)
    return response.data
  } catch (error) {
    console.error('Error en DELETE:', error)
    throw error
  }
}

// PATCH - Actualización parcial
export async function patchData(url, data) {
  try {
    const response = await apiClient.patch(url, data)
    return response.data
  } catch (error) {
    console.error('Error en PATCH:', error)
    throw error
  }
}


