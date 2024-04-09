import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IModelo, IItem } from '../../shared/models/Modelo';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IModelo[]>>{
    return this.http.get<ApiResponse<IModelo[]>>(`${environment.UrlModelo}`)
  }

 getItems(): Observable<ApiResponse<IItem[]>>{
    return this.http.get<ApiResponse<IItem[]>>(`${environment.UrlItem}`)
  }

  get(id: string): Observable<ApiResponse<IModelo>>{
    return this.http.get<ApiResponse<IModelo>>(`${environment.UrlModelo}/${id}`)
  }

  create(datos: IModelo): Observable<ApiResponse<IModelo>>{
    return this.http.post<ApiResponse<IModelo>>(`${environment.UrlModelo}`, datos)
  }

  update(id: string, datos: IModelo){
    return this.http.put<ApiResponse<IModelo>>(`${environment.UrlModelo}/${id}`, datos)
  }

  delete(id: string): Observable<ApiResponse<IModelo>>{
    return this.http.delete<ApiResponse<IModelo>>(`${environment.UrlModelo}/${id}`)
  }
}
