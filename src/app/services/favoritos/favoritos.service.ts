import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, IFavorito } from '../../shared/models/Favorito';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  todos = "http://127.0.0.1:8000/api/auth/favorito";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IFavorito[]>>{
    return this.http.get<ApiResponse<IFavorito[]>>(`${this.todos}`)
  }

  get(id: string): Observable<ApiResponse<IFavorito>>{
    return this.http.get<ApiResponse<IFavorito>>(`${this.todos}/${id}`)
  }

  create(datos: IFavorito): Observable<ApiResponse<IFavorito>>{
    return this.http.post<ApiResponse<IFavorito>>(`${this.todos}`, datos)
  }

  update(id: string, datos: IFavorito){
    return this.http.put<ApiResponse<IFavorito>>(`${this.todos}/${id}`, datos)
  }

  delete(id: string): Observable<ApiResponse<IFavorito>>{
    return this.http.delete<ApiResponse<IFavorito>>(`${this.todos}/${id}`)
  }
}
