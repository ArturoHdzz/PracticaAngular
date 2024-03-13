import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IItem } from '../../shared/models/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  todos = "http://127.0.0.1:8000/api/auth/item";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IItem[]>>{
    return this.http.get<ApiResponse<IItem[]>>(`${this.todos}`)
  }

  get(id: string): Observable<ApiResponse<IItem>>{
    return this.http.get<ApiResponse<IItem>>(`${this.todos}/${id}`)
  }

  create(datos: IItem): Observable<ApiResponse<IItem>>{
    return this.http.post<ApiResponse<IItem>>(`${this.todos}`, datos)
  }

  update(id: string, datos: IItem){
    return this.http.put<ApiResponse<IItem>>(`${this.todos}/${id}`, datos)
  }

  delete(id: string): Observable<ApiResponse<IItem>>{
    return this.http.delete<ApiResponse<IItem>>(`${this.todos}/${id}`)
  }
}
