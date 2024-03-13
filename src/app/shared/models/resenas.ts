export interface ApiResponse<T>{
    message?: string;
    data: T;
  }
  export interface IResena{
    id?: string;
    user_id: string;
    modelo_id: string;
    comentario: string;
    calificacion: string;
    fecha: string;
  }