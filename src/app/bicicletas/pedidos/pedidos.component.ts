import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CommonModule } from '@angular/common';
import { PedidoFormComponent } from './pedidos-form/pedido-form/pedido-form.component';
import { IPedido } from '../../shared/models/Pedido';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private Service: PedidosService, private toastService: ToastrService){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.Service.getAll().subscribe({
      next:(response)=>{
        this.datos = response.data;
      }
    })
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
