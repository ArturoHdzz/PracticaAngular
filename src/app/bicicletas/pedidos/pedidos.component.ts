import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CommonModule } from '@angular/common';
import { PedidoFormComponent } from './pedidos-form/pedido-form/pedido-form.component';
import { IPedido } from '../../shared/models/Pedido';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [ModelComponent, PedidoFormComponent, CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit{
  isModelOpen = false;
  datos: IPedido[]=[];
  dato:IPedido | null = null;
  roleId: any;

  constructor(private Service: PedidosService, private toastService: ToastrService, private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    this.roleId = 3;
    this.rolUser();
    this.getAll();
  }
  
  rolUser(){
    
    this.http.get('http://127.0.0.1:8000/api/auth/roluser', ).subscribe(
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

  loadUser(data: IPedido){
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
