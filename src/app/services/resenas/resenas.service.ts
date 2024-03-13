import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, IResena } from '../../shared/models/resenas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResenasService {

  todos = "http://127.0.0.1:8000/api/auth/reseña";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IResena[]>>{
    return this.http.get<ApiResponse<IResena[]>>(`${this.todos}`)
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
