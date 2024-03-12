import { Injectable } from '@angular/core';
import { ApiResponse, IDetalleCompra } from '../../shared/models/DetalleCompra';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetallecomprasService {

  todos = "http://127.0.0.1:8000/api/auth/detallecompra";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IDetalleCompra[]>>{
    return this.http.get<ApiResponse<IDetalleCompra[]>>(`${this.todos}`)
  }

  get(id: string): Observable<ApiResponse<IDetalleCompra>>{
    return this.http.get<ApiResponse<IDetalleCompra>>(`${this.todos}/${id}`)
  }

  create(detalleCompra: IDetalleCompra): Observable<ApiResponse<IDetalleCompra>>{
    return this.http.post<ApiResponse<IDetalleCompra>>(`${this.todos}`, detalleCompra)
  }

  update(id: string, detalleCompra: IDetalleCompra){
    return this.http.put<ApiResponse<IDetalleCompra>>(`${this.todos}/${id}`, detalleCompra)
  }

  delete(id: string): Observable<ApiResponse<IDetalleCompra>>{
    return this.http.delete<ApiResponse<IDetalleCompra>>(`${this.todos}/${id}`)
  }
}
