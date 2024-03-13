import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, IResena, IModelo, IUser } from '../../shared/models/resenas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResenasService {

  todos = "http://127.0.0.1:8000/api/auth/reseña";
  modelos = "http://127.0.0.1:8000/api/auth/modelo";
  users = "http://127.0.0.1:8000/api/auth/user";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IResena[]>>{
    return this.http.get<ApiResponse<IResena[]>>(`${this.todos}`)
  }

  getModelos(): Observable<ApiResponse<IModelo[]>>{
    return this.http.get<ApiResponse<IModelo[]>>(`${this.modelos}`)
  }

  getUsers(): Observable<ApiResponse<IUser[]>>{
    return this.http.get<ApiResponse<IUser[]>>(`${this.users}`)
  }

  get(id: string): Observable<ApiResponse<IResena>>{
    return this.http.get<ApiResponse<IResena>>(`${this.todos}/${id}`)
  }

  create(datos: IResena): Observable<ApiResponse<IResena>>{
    return this.http.post<ApiResponse<IResena>>(`${this.todos}`, datos)
  }

  update(id: string, datos: IResena){
    return this.http.put<ApiResponse<IResena>>(`${this.todos}/${id}`, datos)
  }

  delete(id: string): Observable<ApiResponse<IResena>>{
    return this.http.delete<ApiResponse<IResena>>(`${this.todos}/${id}`)
  }
}
