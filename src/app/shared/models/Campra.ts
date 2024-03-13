export interface ApiResponse<T>{
    message?: string;
    data: T;
  }

  export interface IUser {
    id?: string;
    name: string;
  }

  export interface IMetodoPago{
    id?: string;
    nombre: string;
  }

  export interface ICompra{
    id?: string;
    user_id: string;
    metodo_pago_id: string;
    total: string;
    fecha: string;
    user: IUser;
    metodo_pago: IMetodoPago;
  }