export interface ApiResponse<T>{
    message?: string;
    data: T;
  }
  export interface IItem{
    id?: string;
    nombre: string;
    descripcion: string;
    stock: string;
    precio: string;
    catalogo_id: string;
  }