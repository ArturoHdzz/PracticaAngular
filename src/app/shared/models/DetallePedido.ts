export interface ApiResponse<T>{
    message?: string;
    data: T;
  }
  export interface IDetallePedido{
    id?: string;
    pedido_id: string;
    modelo_id: string;
    cantidad: string;
    precio: string;
  }