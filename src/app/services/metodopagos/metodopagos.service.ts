import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IMetodoPago } from '../../shared/models/MetodoPago';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MetodopagosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IMetodoPago[]>>{
    return this.http.get<ApiResponse<IMetodoPago[]>>(`${environment.UrlMetodopago}`)
  }

  get(id: string): Observable<ApiResponse<IMetodoPago>>{
    return this.http.get<ApiResponse<IMetodoPago>>(`${environment.UrlMetodopago}/${id}`)
  }

  create(datos: IMetodoPago): Observable<ApiResponse<IMetodoPago>>{
    return this.http.post<ApiResponse<IMetodoPago>>(`${environment.UrlMetodopago}`, datos)
  }

  update(id: string, datos: IMetodoPago){
    return this.http.put<ApiResponse<IMetodoPago>>(`${environment.UrlMetodopago}/${id}`, datos)
  }

  delete(id: string): Observable<ApiResponse<IMetodoPago>>{
    return this.http.delete<ApiResponse<IMetodoPago>>(`${environment.UrlMetodopago}/${id}`)
  }
}
