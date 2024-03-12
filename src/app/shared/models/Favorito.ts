export interface ApiResponse<T>{
    message?: string;
    data: T;
  }
  export interface IUser{
    id?: string;
    user_id: string;
    modelo_id: string;
    fecha: string;
  }