import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IMetodoPago } from '../../shared/models/MetodoPago';

@Injectable({
  providedIn: 'root'
})
export class MetodopagosService {

  todos = "http://127.0.0.1:8000/api/auth/metodopago";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IMetodoPago[]>>{
    return this.http.get<ApiResponse<IMetodoPago[]>>(`${this.todos}`)
  }

  get(id: string): Observable<ApiResponse<IMetodoPago>>{
    return this.http.get<ApiResponse<IMetodoPago>>(`${this.todos}/${id}`)
  }

  create(datos: IMetodoPago): Observable<ApiResponse<IMetodoPago>>{
    return this.http.post<ApiResponse<IMetodoPago>>(`${this.todos}`, datos)
  }

  update(id: string, datos: IMetodoPago){
    return this.http.put<ApiResponse<IMetodoPago>>(`${this.todos}/${id}`, datos)
  }

  delete(id: string): Observable<ApiResponse<IMetodoPago>>{
    return this.http.delete<ApiResponse<IMetodoPago>>(`${this.todos}/${id}`)
  }
}
