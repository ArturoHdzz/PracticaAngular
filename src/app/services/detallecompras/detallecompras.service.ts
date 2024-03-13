import { Injectable } from '@angular/core';
import { ApiResponse, IDetalleCompra, ICompra, IModelo } from '../../shared/models/DetalleCompra';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetallecomprasService {

  todos = "http://127.0.0.1:8000/api/auth/detallecompra";
  compras = "http://127.0.0.1:8000/api/auth/compra";
  modelos = "http://127.0.0.1:8000/api/auth/modelo";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IDetalleCompra[]>>{
    return this.http.get<ApiResponse<IDetalleCompra[]>>(`${this.todos}`)
  }

  getAllCompras(): Observable<ApiResponse<ICompra[]>>{
    return this.http.get<ApiResponse<ICompra[]>>(`${this.compras}`)
  }

  getAllModelos(): Observable<ApiResponse<IModelo[]>>{
    return this.http.get<ApiResponse<IModelo[]>>(`${this.modelos}`)
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
