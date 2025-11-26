export type Admin ={
    nombre:string
    apellido:string
    correo:string
    _id: number
}

export type RegisterForm = Pick <Admin ,'nombre'| 'apellido' |'correo'> & {
    password:string
}

export type LoginForm =Pick <Admin , 'correo' > & {
    password:string
}

export type Camion ={
    placa:string
    modelo:string
    estado:string
}

