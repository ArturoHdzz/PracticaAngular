export interface ApiResponse<T>{
    message?: string;
    data: T;
  }

  export interface ICatalogo{
    id?: string;
    nombre: string;
    descripcion: string;
  }

  export interface IItem{
    id?: string;
    nombre: string;
    descripcion: string;
    stock: string;
    precio: string;
    catalogo: ICatalogo;
  }