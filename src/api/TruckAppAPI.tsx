import { isAxiosError } from "axios"
import api from "../config/axios"
import type {  Admin, Camion, Conductor, GastoCamion, GastoViajeForm, Viaje } from "../types";


export async function getAdmin(){
    
     try{
      const {data} = await api<Admin>('/api/v1/auth/me');
      return data
       
    }catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
    }
}

export async function createCamion(formData: Camion){
    try{
      const {data} = await api.post('/api/v1/camion', formData);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
      throw error
    }
}

export async function getAllCamiones(){
    try{
      const {data} = await api.get('/api/v1/camion');
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
      throw error
    }
}

export async function deleteCamion(id: number){
    try{
      const {data} = await api.patch(`/api/v1/camion/${id}/change-state`);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        const errorMessage = error.response.data.message;
        
        if(Array.isArray(errorMessage)){
          throw new Error(errorMessage[0])
        }
        
        if(typeof errorMessage === 'string'){
          throw new Error(errorMessage)
        }
        
        throw new Error(error.response.data.error || 'Error al eliminar el camión')
      }
      throw error
    }
}

export async function getCamionById(id: number){
    try{
      const {data} = await api.get(`/api/v1/camion/${id}`);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
      throw error
    }
}

export async function getAllCamionPlacaAndId(){
    try{
      const {data} = await api.get('/api/v1/camion/select');
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
      throw error
    }
}

export async function updateCamion({id, formData}: {id: number, formData: Camion}){
    try{
      const {data} = await api.patch(`/api/v1/camion/${id}`, formData);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        const errorMessage = error.response.data.message;
        
        if(Array.isArray(errorMessage)){
          throw new Error(errorMessage[0])
        }
        
        if(typeof errorMessage === 'string'){
          throw new Error(errorMessage)
        }
        
        throw new Error(error.response.data.error || 'Error al actualizar el camión')
      }
      throw error
    }
}

export async function getAllConductores(){
    try{
      const {data} = await api.get('/api/v1/conductor');
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
      throw error
    }
}

export async function createConductor(formData: Conductor){
    try{
      const {data} = await api.post('/api/v1/conductor', formData);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
      throw error
    }
}


export async function getConductorById(id: number){
    try{
      const {data} = await api.get(`/api/v1/conductor/${id}`);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
      throw error
    }
}


export async function updateConductor({id, formData}: {id: number, formData: Conductor}){
    try{
      const {data} = await api.patch(`/api/v1/conductor/${id}`, formData);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        const errorMessage = error.response.data.message;
        
        if(Array.isArray(errorMessage)){
          throw new Error(errorMessage[0])
        }
        
        if(typeof errorMessage === 'string'){
          throw new Error(errorMessage)
        }
        
        throw new Error(error.response.data.error || 'Error al actualizar el condcutor')
      }
      throw error
    }
}



export async function deleteConductor(id: number){
    try{
      const {data} = await api.patch(`/api/v1/conductor/${id}/change-state`);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        const errorMessage = error.response.data.message;
        
        if(Array.isArray(errorMessage)){
          throw new Error(errorMessage[0])
        }
        
        if(typeof errorMessage === 'string'){
          throw new Error(errorMessage)
        }
        
        throw new Error(error.response.data.error || 'Error al eliminar el conductor')
      }
      throw error
    }
}


export async function getAllConductoresNameAndId(){
    try{
      const {data} = await api.get('/api/v1/conductor/select');
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
      throw error
    }
}



//Funciones relacionadas con los viajes
export async function getViajeById(id: number){
    try{
      const {data} = await api.get(`/api/v1/viaje/detalle/${id}`);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
      throw error
    }
}




export async function createViaje(formData: Viaje){
    try{
      const {data} = await api.post('/api/v1/viaje', formData);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        const errorMessage = error.response.data.message;
        
        if(Array.isArray(errorMessage)){
          throw new Error(errorMessage[0])
        }
        
        if(typeof errorMessage === 'string'){
          throw new Error(errorMessage)
        }
        
        throw new Error(error.response.data.error || 'Error al crear el viaje')
      }
      throw error
    }
}


export async function getAllViajes(page: number = 1, limit: number = 20, idCamion:number){
    try{
      const {data} = await api.get(`/api/v1/viaje/${idCamion}`, {
        params: { page, limit }
      });
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
      throw error
    }
}


export async function updateViaje({id, formData}: {id: number, formData: Viaje}){
    try{
      const {data} = await api.patch(`/api/v1/viaje/${id}`, formData);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        const errorMessage = error.response.data.message;
        
        if(Array.isArray(errorMessage)){
          throw new Error(errorMessage[0])
        }
        
        if(typeof errorMessage === 'string'){
          throw new Error(errorMessage)
        }
        
        throw new Error(error.response.data.error || 'Error al actualizar el viaje')
      }
      throw error
    }
}


export async function deleteViaje(id: number){
    try{
      const {data} = await api.patch(`/api/v1/viaje/${id}/change-state`);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        const errorMessage = error.response.data.message;
        
        if(Array.isArray(errorMessage)){
          throw new Error(errorMessage[0])
        }
        
        if(typeof errorMessage === 'string'){
          throw new Error(errorMessage)
        }
        
        throw new Error(error.response.data.error || 'Error al eliminar el viaje')
      }
      throw error
    }
  }


  {/* Gastos del viaje especifico*/}


  export async function getAllGastosViaje(id: number){
    try{
      const {data} = await api.get(`/api/v1/gastos-viaje/${id}`);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
      throw error
    }
}

export async function deleteGastoViaje(id: number){
    try{
      const {data} = await api.delete(`/api/v1/gastos-viaje/${id}`);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        const errorMessage = error.response.data.message;
        
        if(Array.isArray(errorMessage)){
          throw new Error(errorMessage[0])
        }
        
        if(typeof errorMessage === 'string'){
          throw new Error(errorMessage)
        }
        
        throw new Error(error.response.data.error || 'Error al eliminar el gasto')
      }
      throw error
    }
}


export async function createGastoViaje(idViaje: number, formData: GastoViajeForm){
    try{
      const {data} = await api.post(`/api/v1/gastos-viaje/${idViaje}`, formData);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        const errorMessage = error.response.data.message;
        
        if(Array.isArray(errorMessage)){
          throw new Error(errorMessage[0])
        }
        
        if(typeof errorMessage === 'string'){
          throw new Error(errorMessage)
        }
        
        throw new Error(error.response.data.error || 'Error al crear el gasto del viaje')
      }
      throw error
    }
}

{/* Gastos del camión especifico*/}

export async function getAllGastosCamion(page: number = 1, limit: number = 15, placa?: string){
    try{
      const params: { page: number; limit: number; placa?: string } = { page, limit };
      
      // Solo agregar placa si tiene valor
      if (placa && placa.trim() !== '') {
        params.placa = placa;
      }
      
      const {data} = await api.get('/api/v1/gastos-camion', { params });
      return data;
    }catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
      throw error;
    }
}


export async function deleteGastoCamion(id: number){
    try{
      const {data} = await api.delete(`/api/v1/gastos-camion/${id}`);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        const errorMessage = error.response.data.message;
        
        if(Array.isArray(errorMessage)){
          throw new Error(errorMessage[0])
        }
        
        if(typeof errorMessage === 'string'){
          throw new Error(errorMessage)
        }
        
        throw new Error(error.response.data.error || 'Error al eliminar el gasto')
      }
      throw error
    }
}


export async function createGastoCamion(formData: GastoCamion){
    try{
      const {data} = await api.post(`/api/v1/gastos-camion`, formData);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        const errorMessage = error.response.data.message;
        
        if(Array.isArray(errorMessage)){
          throw new Error(errorMessage[0])
        }
        
        if(typeof errorMessage === 'string'){
          throw new Error(errorMessage)
        }
        
        throw new Error(error.response.data.error || 'Error al crear el gasto del camión')
      }
      throw error
    }
}


{/* Datos para las estadisticas del dashboard */}

export async function getEstadisticasGenerales(){
    try{
      const {data} = await api.get(`/api/v1/viaje/estadisticas`);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        const errorMessage = error.response.data.message;
        
        if(Array.isArray(errorMessage)){
          throw new Error(errorMessage[0])
        }
        
        if(typeof errorMessage === 'string'){
          throw new Error(errorMessage)
        }
        
        throw new Error(error.response.data.error || 'Error al obtener las estadisticas')
      }
      throw error
    }
}


export async function getEstadisticasGraficas(){
    try{
      const {data} = await api.get(`/api/v1/viaje/estadisticas/graficas`);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        const errorMessage = error.response.data.message;
        
        if(Array.isArray(errorMessage)){
          throw new Error(errorMessage[0])
        }
        
        if(typeof errorMessage === 'string'){
          throw new Error(errorMessage)
        }
        
        throw new Error(error.response.data.error || 'Error al obtener las estadisticas de la gráfica')
      }
      throw error
    }
}


export async function getEstadisticasInforme(idCamion:number, mes:number, anio:number){
    try{
      const {data} = await api.get(`/api/v1/viaje/estadisticas/informe/${idCamion}/${mes}/${anio}`);
      return data
    }catch(error){
      if(isAxiosError(error) && error.response){
        const errorMessage = error.response.data.message;
        
        if(Array.isArray(errorMessage)){
          throw new Error(errorMessage[0])
        }
        
        if(typeof errorMessage === 'string'){
          throw new Error(errorMessage)
        }
        
        throw new Error(error.response.data.error || 'Error al obtener las estadisticas de la gráfica')
      }
      throw error
    }
}