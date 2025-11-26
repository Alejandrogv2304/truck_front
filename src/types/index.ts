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

export type CamionCardProps = Pick <Camion ,'placa'| 'modelo' |'estado'> & {
    id_camion:number
    onDelete: (id: number) => void
    onEdit: (id: number) => void
}

