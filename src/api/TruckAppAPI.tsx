import { isAxiosError } from "axios"
import api from "../config/axios"
import type {  Admin } from "../types";


export async function getUser(){
    
     try{
      const {data} = await api<Admin>('/api/v1/auth/me');
      return data
       
    }catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
    }
}


