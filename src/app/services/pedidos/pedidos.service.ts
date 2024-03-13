import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, IPedido, IUser, IMetodoPago } from '../../shared/models/Pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  todos = "http://127.0.0.1:8000/api/auth/pedido";
  users = "http://127.0.0.1:8000/api/auth/user";
  metodos = "http://127.0.0.1:8000/api/auth/metodopago";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IPedido[]>>{
    return this.http.get<ApiResponse<IPedido[]>>(`${this.todos}`)
  }

  getAllUsers(): Observable<ApiResponse<IUser[]>>{
    return this.http.get<ApiResponse<IUser[]>>(`${this.users}`)
  }

  getAllMetodos(): Observable<ApiResponse<IMetodoPago[]>>{
    return this.http.get<ApiResponse<IMetodoPago[]>>(`${this.metodos}`)
  }
  
  get(id: string): Observable<ApiResponse<IPedido>>{
    return this.http.get<ApiResponse<IPedido>>(`${this.todos}/${id}`)
  }

  create(datos: IPedido): Observable<ApiResponse<IPedido>>{
    return this.http.post<ApiResponse<IPedido>>(`${this.todos}`, datos)
  }

  update(id: string, datos: IPedido){
    return this.http.put<ApiResponse<IPedido>>(`${this.todos}/${id}`, datos)
  }

  delete(id: string): Observable<ApiResponse<IPedido>>{
    return this.http.delete<ApiResponse<IPedido>>(`${this.todos}/${id}`)
  }
}
