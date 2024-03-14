import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICompra } from '../../shared/models/Campra';
import { ComprasService } from '../../services/compras/compras.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CompraFormComponent } from './compras-form/compra-form/compra-form.component';
import { HttpClient } from '@angular/common/http';

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
  roleId: any;

  constructor(private compraService: ComprasService, private toastService: ToastrService, private http: HttpClient){}


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

  ngOnInit(): void {
    this.roleId = 3;
    this.rolUser();
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
