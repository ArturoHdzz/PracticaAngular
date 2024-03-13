export interface ApiResponse<T>{
    message?: string;
    data: T;
  }
  export interface IDetalleCompra{
    id?: string;
    compra_id: string;
    modelo_id: string;
    cantidad: string;
    precio: string;
  }