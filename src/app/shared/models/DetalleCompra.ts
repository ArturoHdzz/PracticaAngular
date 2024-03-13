export interface ApiResponse<T>{
    message?: string;
    data: T;
  }

  export interface IModelo{
    id?: string;
    nombre: string;
  }

  export interface ICompra{
    id?: string;
    total: string;
    fecha: string;
  }

  export interface IDetalleCompra{
    id?: string;
    compra: ICompra;
    modelo: IModelo;
    cantidad: string;
    precio: string;
  }