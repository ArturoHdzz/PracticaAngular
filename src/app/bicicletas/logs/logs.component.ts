import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CommonModule } from '@angular/common';
import { Ilogs } from '../../shared/models/log';
import { LogsService } from '../../services/logs/logs.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [ModelComponent, CommonModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit, OnDestroy{
  datos: Ilogs[]=[];
  timeInterval: Subscription;

  constructor(private Service: LogsService, private toastService: ToastrService, private http: HttpClient){
    this.timeInterval = new Subscription();
  }

  ngOnInit(): void {
    this.startPolling();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  startPolling() {
    this.timeInterval = interval(5000)
      .pipe(
        switchMap(() => this.Service.getAll())
      )
      .subscribe({
        next: (response) => {
          this.datos = response.data;
        },
        error: (error) => {
          console.error('Error al obtener registros:', error);
          this.stopPolling();
        }
      });
  }

  stopPolling() {
    if (this.timeInterval) {
      this.timeInterval.unsubscribe();
    }
  }

  getAll() {
    this.Service.getAll().subscribe({
      next: (response) => {
        this.datos = response.data;
      },
      error: (error) => {
        console.error('Error al obtener registros:', error);
      }
    });
  }
}
