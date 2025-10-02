import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/TruckAppAPI";


export default function AppLayout() {


    const {data , isError, isLoading} = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 1,
        refetchOnWindowFocus:false
    })

   if(isLoading) return 'Cargando ...'
   if(isError){
    return <Navigate to={'/auth/login'}/>
   }
    console.log( data)
    // if(data) return (
    //     // <DevTree data={data}/>
    // )
}