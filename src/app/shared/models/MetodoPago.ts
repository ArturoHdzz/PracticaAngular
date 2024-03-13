export interface ApiResponse<T>{
    message?: string;
    data: T;
  }
  export interface IMetodoPago{
    id?: string;
    nombre: string;
    descripcion: string;
    tipo: string;
  }