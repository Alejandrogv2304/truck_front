import { isAxiosError } from "axios"
import api from "../config/axios"
import type {  Admin, Camion, Conductor } from "../types";


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
