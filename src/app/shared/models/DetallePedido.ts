export interface ApiResponse<T>{
    message?: string;
    data: T;
  }
  export interface IUser{
    id?: string;
    pedido_id: string;
    modelo_id: string;
    cantidad: string;
    precio: string;
  }