import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IDetallePedido } from '../../shared/models/DetallePedido';

@Injectable({
  providedIn: 'root'
})
export class DetallepedidosService {

  todos = "http://127.0.0.1:8000/api/auth/detallepedido";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IDetallePedido[]>>{
    return this.http.get<ApiResponse<IDetallePedido[]>>(`${this.todos}`)
  }

  get(id: string): Observable<ApiResponse<IDetallePedido>>{
    return this.http.get<ApiResponse<IDetallePedido>>(`${this.todos}/${id}`)
  }

  create(datos: IDetallePedido): Observable<ApiResponse<IDetallePedido>>{
    return this.http.post<ApiResponse<IDetallePedido>>(`${this.todos}`, datos)
  }

  update(id: string, datos: IDetallePedido){
    return this.http.put<ApiResponse<IDetallePedido>>(`${this.todos}/${id}`, datos)
  }

  delete(id: string): Observable<ApiResponse<IDetallePedido>>{
    return this.http.delete<ApiResponse<IDetallePedido>>(`${this.todos}/${id}`)
  }
}
