import exp from "constants";

export interface ApiResponse<T>{
    message?: string;
    data: T;
  }

  export interface IItem{
    id?: string;
    nombre: string;
  }

  export interface IModelo{
    id?: string;
    nombre: string;
    descripcion: string;
    item: IItem;
  }