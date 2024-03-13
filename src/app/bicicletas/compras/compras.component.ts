import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICompra } from '../../shared/models/Campra';
import { ComprasService } from '../../services/compras/compras.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CompraFormComponent } from './compras-form/compra-form/compra-form.component';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [ModelComponent, CompraFormComponent, CommonModule],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent implements OnInit {
  isModelOpen = false;
  compras: ICompra[]=[];
  compra:ICompra | null = null;
  constructor(private compraService: ComprasService, private toastService: ToastrService){}

  ngOnInit(): void {
    this.getAllCompra();
  }

  getAllCompra(){
    this.compraService.getAllCompra().subscribe({
      next:(response)=>{
        this.compras = response.data;
      }
    })
  }

  deleteUser(id: string) {
    console.log("Deleting user with ID:", id);
    if (confirm("¿Estás seguro de eliminar esta compra?")) {
      this.compraService.deleteCompra(id).subscribe({
        next: (response) => {
          this.toastService.success(response.message);
          this.getAllCompra();
        },
        error: (error) => {
          this.toastService.error(error.message);
        },
      });
    }
  }

  loadUser(data: ICompra){
    this.compra = data;
    this.openModel();
  }

  openModel(){
    this.isModelOpen = true;
  }
  
  closeModel(){
    this.compra = null
    this.isModelOpen = false;
    this.getAllCompra();
  }
}
