export interface ApiResponse<T>{
    message?: string;
    data: T;
  }

export interface Ilogs{
    id?: string;
    comentario: string;
    calificacion: string;
    fecha: string;
  }