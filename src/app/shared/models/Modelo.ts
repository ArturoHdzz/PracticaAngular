export interface ApiResponse<T>{
    message?: string;
    data: T;
  }
  export interface IUser{
    id?: string;
    nombre: string;
    descripcion: string;
    item_id: string;
  }