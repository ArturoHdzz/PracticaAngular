import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Ilogs } from '../../shared/models/log';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  todos = "http://127.0.0.1:8000/api/auth/logs";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<Ilogs[]>>{
    return this.http.get<ApiResponse<Ilogs[]>>(`${this.todos}`)
  }
}
