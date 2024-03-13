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

  export interface IPedido{
    id?: string;
    total: string;
    fecha: string;
    direccion: string;
    user: IUser;
    metodo_pago: IMetodoPago;
  }