export interface ApiResponse<T>{
    message?: string;
    data: T;
  }
  export interface ICatalogo{
    id?: string;
    nombre: string;
    descripcion: string;
  }