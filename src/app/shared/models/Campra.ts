export interface ApiResponse<T>{
    message?: string;
    data: T;
  }
  export interface ICompra{
    id?: string;
    user_id: string;
    metodo_pago_id: string;
    total: string;
    fecha: string;
  }