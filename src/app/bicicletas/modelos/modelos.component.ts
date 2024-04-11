import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CommonModule } from '@angular/common';
import { ModeloFormComponent } from './modelos-form/modelo-form/modelo-form.component';
import { IModelo } from '../../shared/models/Modelo';
import { ModelosService } from '../../services/modelos/modelos.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { Subscription, interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-modelos',
  standalone: true,
  imports: [ModelComponent, ModeloFormComponent, CommonModule],
  templateUrl: './modelos.component.html',
  styleUrl: './modelos.component.css'
})
export class ModelosComponent implements OnInit, OnDestroy {
  isModelOpen = false;
  datos: IModelo[]=[];
  dato:IModelo | null = null;
  roleId: any;
  timeInterval: Subscription;

  constructor(private Service: ModelosService, private toastService: ToastrService, private http: HttpClient, private router: Router){
    this.timeInterval = new Subscription();
  }

  ngOnInit(): void {
    this.roleId = 3;
    this.rolUser();
    this.getAll();
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
          console.error('Error al obtener modelos:', error);
          this.stopPolling();
        }
      });
  }

  stopPolling() {
    if (this.timeInterval) {
      this.timeInterval.unsubscribe();
    }
  }

  rolUser(){
    
    this.http.get(environment.UrlRolUser, ).subscribe(
      (res: any) => {
        this.roleId = res.role_id;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  getAll(){
    this.Service.getAll().subscribe({
      next:(response)=>{
        this.datos = response.data;
      },
      error: (error) => {
        if (error.status === 403) {
          this.router.navigate(['/login']);
        }
      }
      });
  }



  deleteUser(id: string) {
    console.log("Deleting user with ID:", id);
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      this.Service.delete(id).subscribe({
        next: (response) => {
          this.toastService.success(response.message);
          this.getAll();
        },
        error: (error) => {
          this.toastService.error(error.message);
        },
      });
    }
  }

  loadUser(data: IModelo){
    this.dato = data;
    this.openModel();
  }

  openModel(){
    this.isModelOpen = true;
  }
  
  closeModel(){
    this.dato = null
    this.isModelOpen = false;
    this.getAll();
  }
}
