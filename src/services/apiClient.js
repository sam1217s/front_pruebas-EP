import {apiClient} from '../plugins/pluginAxios.js';

// Función GET
export async function getData(url) {
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error('Error en la petición GET:', error);
        throw error;
    }
};

// Función POST
export async function postData(url, data) {
    try {
        console.log('this is data from postData: ', data);
        console.log('this is url: ', url);
        const response = await apiClient.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error en la petición POST:', error);
        throw error;
    }
}

// Función PUT
export async function putData(url, data) {
    try {
        const response = await apiClient.put(url, data);
        console.log('this is data from putData: ', data);
        console.log('this is URL from putData: ', url);
        
        return response.data;
    } catch (error) {
        console.error('Error en la petición PUT:', error);
        throw error;
    }
}