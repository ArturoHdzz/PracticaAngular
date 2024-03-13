import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IModelo, IItem } from '../../shared/models/Modelo';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

  todos = "http://127.0.0.1:8000/api/auth/modelo";
  items = "http://127.0.0.1:8000/api/auth/item";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IModelo[]>>{
    return this.http.get<ApiResponse<IModelo[]>>(`${this.todos}`)
  }

 getItems(): Observable<ApiResponse<IItem[]>>{
    return this.http.get<ApiResponse<IItem[]>>(`${this.items}`)
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
