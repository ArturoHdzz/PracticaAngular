export interface ApiResponse<T>{
    message?: string;
    data: T;
  }

  export interface IModelo{
    id?: string;
    nombre: string;
  }

  export interface IUser {
    id?: string;
    name: string;
  }

  export interface IResena{
    id?: string;
    comentario: string;
    calificacion: string;
    fecha: string;
    user: IUser;
    modelo: IModelo;
  }