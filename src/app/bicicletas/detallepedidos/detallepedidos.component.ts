import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { DetallepedidoFormComponent } from './detallepedidos-form/detallepedido-form/detallepedido-form.component';
import { CommonModule } from '@angular/common';
import { IDetallePedido } from '../../shared/models/DetallePedido';
import { DetallepedidosService } from '../../services/detallepedidos/detallepedidos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detallepedidos',
  standalone: true,
  imports: [ModelComponent, DetallepedidoFormComponent, CommonModule],
  templateUrl: './detallepedidos.component.html',
  styleUrl: './detallepedidos.component.css'
})
export class DetallepedidosComponent implements OnInit{
  isModelOpen = false;
  datos: IDetallePedido[]=[];
  dato!:IDetallePedido;
  constructor(private Service: DetallepedidosService, private toastService: ToastrService){}

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

  loadUser(data: IDetallePedido){
    this.dato = data;
    this.openModel();
  }

  openModel(){
    this.isModelOpen = true;
  }
  
  closeModel(){
    this.isModelOpen = false;
    this.getAll();
  }
}
