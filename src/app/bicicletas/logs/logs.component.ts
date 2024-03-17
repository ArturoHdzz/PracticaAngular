import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CommonModule } from '@angular/common';
import { Ilogs } from '../../shared/models/log';
import { LogsService } from '../../services/logs/logs.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [ModelComponent, CommonModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit{
  datos: Ilogs[]=[];

  constructor(private Service: LogsService, private toastService: ToastrService, private http: HttpClient){}

  ngOnInit(): void {
    this.getAll();
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
