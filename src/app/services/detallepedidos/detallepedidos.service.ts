import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IDetallePedido, IModelo, IPedido } from '../../shared/models/DetallePedido';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DetallepedidosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IDetallePedido[]>>{
    return this.http.get<ApiResponse<IDetallePedido[]>>(`${environment.UrlDetallepedido}`)
  }

  getAllPedidos(): Observable<ApiResponse<IPedido[]>>{
    return this.http.get<ApiResponse<IPedido[]>>(`${environment.UrlPedido}`)
  }

  getAllModelos(): Observable<ApiResponse<IModelo[]>>{
    return this.http.get<ApiResponse<IModelo[]>>(`${environment.UrlModelo}`)
  }

  get(id: string): Observable<ApiResponse<IDetallePedido>>{
    return this.http.get<ApiResponse<IDetallePedido>>(`${environment.UrlDetallepedido}/${id}`)
  }

  create(datos: IDetallePedido): Observable<ApiResponse<IDetallePedido>>{
    return this.http.post<ApiResponse<IDetallePedido>>(`${environment.UrlDetallepedido}`, datos)
  }

  update(id: string, datos: IDetallePedido){
    return this.http.put<ApiResponse<IDetallePedido>>(`${environment.UrlDetallepedido}/${id}`, datos)
  }

  delete(id: string): Observable<ApiResponse<IDetallePedido>>{
    return this.http.delete<ApiResponse<IDetallePedido>>(`${environment.UrlDetallepedido}/${id}`)
  }
}
