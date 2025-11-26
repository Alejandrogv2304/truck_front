import { isAxiosError } from "axios"
import api from "../config/axios"
import type {  Admin, Camion } from "../types";


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


