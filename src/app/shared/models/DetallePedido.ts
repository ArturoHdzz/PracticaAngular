export interface ApiResponse<T>{
    message?: string;
    data: T;
  }

  export interface IPedido{
    id?: string;
    fecha: string;
    total: string;
    user_id: string;
  }

  export interface IModelo{
    id?: string;
    nombre: string;
  }

  export interface IDetallePedido{
    id?: string;
    pedido: IPedido;
    modelo: IModelo;
    cantidad: string;
    precio: string;
  }