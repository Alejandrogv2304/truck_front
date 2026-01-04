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

export type ConductorCardProps ={
    nombre:string
    apellido:string
    identificacion:string
    estado:string
    id_conductor:number
    telefono:string
    fecha_vinculacion:string
    onDelete: (id: number) => void
    onEdit: (id: number) => void
}

export type Conductor ={
    nombre:string
    apellido:string
    identificacion:string
    telefono:string
    estado:string
    fecha_vinculacion:string
}

export type Viaje = {
    lugar_origen:string
    lugar_destino:string
    fecha_inicio:string
    valor:number
    num_manifiesto:string
    idCamion:number
    idConductor:number
    estado:string
}

export type ViajeCardProps ={
    id_viaje:number
    fecha_inicio:string
    lugar_origen:string
    lugar_destino:string
    estado:string
    valor:number
    num_manifiesto:string
    conductor:string
    camion:string
    onDelete: (id: number) => void
    onEdit: (id: number) => void
}

export type GastoViaje = {
    id_gasto_viaje : number
    valor: number | string  // El backend devuelve decimales como strings
    estado: string
    tipo_gasto: string
}

