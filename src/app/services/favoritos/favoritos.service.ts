import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, IFavorito, IModelo, IUser } from '../../shared/models/Favorito';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  todos = "http://127.0.0.1:8000/api/auth/favorito";
  modelos = "http://127.0.0.1:8000/api/auth/modelo";
  users = "http://127.0.0.1:8000/api/auth/user";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IFavorito[]>>{
    return this.http.get<ApiResponse<IFavorito[]>>(`${this.todos}`)
  }

  getModelos(): Observable<ApiResponse<IModelo[]>>{
    return this.http.get<ApiResponse<IModelo[]>>(`${this.modelos}`)
  }

  getUsers(): Observable<ApiResponse<IUser[]>>{
    return this.http.get<ApiResponse<IUser[]>>(`${this.users}`)
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
