import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IModelo } from '../../shared/models/Modelo';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

  todos = "http://127.0.0.1:8000/api/auth/modelo";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IModelo[]>>{
    return this.http.get<ApiResponse<IModelo[]>>(`${this.todos}`)
  }

  get(id: string): Observable<ApiResponse<IModelo>>{
    return this.http.get<ApiResponse<IModelo>>(`${this.todos}/${id}`)
  }

  create(datos: IModelo): Observable<ApiResponse<IModelo>>{
    return this.http.post<ApiResponse<IModelo>>(`${this.todos}`, datos)
  }

  update(id: string, datos: IModelo){
    return this.http.put<ApiResponse<IModelo>>(`${this.todos}/${id}`, datos)
  }

  delete(id: string): Observable<ApiResponse<IModelo>>{
    return this.http.delete<ApiResponse<IModelo>>(`${this.todos}/${id}`)
  }
}
