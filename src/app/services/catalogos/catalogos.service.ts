import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, ICatalogo } from '../../shared/models/Catalogo';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient, private zone: NgZone) { }

  getAllCatalogo(): Observable<ApiResponse<ICatalogo[]>>{
    return this.http.get<ApiResponse<ICatalogo[]>>(`${environment.UrlCatalogo}`)
  }

  getCatalogo(id: string): Observable<ApiResponse<ICatalogo>>{
    return this.http.get<ApiResponse<ICatalogo>>(`${environment.UrlCatalogo}/${id}`)
  }

  createCatalogo(catalogo: ICatalogo): Observable<ApiResponse<ICatalogo>>{
    return this.http.post<ApiResponse<ICatalogo>>(`${environment.UrlCatalogo}`, catalogo)
  }

  updateCatalogo(id: string, catalogo: ICatalogo){
    return this.http.put<ApiResponse<ICatalogo>>(`${environment.UrlCatalogo}/${id}`, catalogo)
  }

  deleteCatalogo(id: string): Observable<ApiResponse<ICatalogo>>{
    return this.http.delete<ApiResponse<ICatalogo>>(`${environment.UrlCatalogo}/${id}`)
  }

  getServerSentEvent(url: string): Observable<ICatalogo[]> {
    return new Observable(observer => {
      const eventSource = new EventSource(url);

      eventSource.onmessage = event => {
        this.zone.run(() => {
          observer.next(JSON.parse(event.data));
        });
      };

      eventSource.onerror = error => {
        this.zone.run(() => {
          observer.error(error);
        });
      };

      return () => {
        eventSource.close();
      };
    });
  }
}
