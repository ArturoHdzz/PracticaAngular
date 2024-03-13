import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { IDetalleCompra, ICompra, IModelo } from '../../../../shared/models/DetalleCompra';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DetallecomprasService } from '../../../../services/detallecompras/detallecompras.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detallecompra-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './detallecompra-form.component.html',
  styleUrl: './detallecompra-form.component.css'
})
export class DetallecompraFormComponent implements OnChanges{
  @Input() data: IDetalleCompra | null = null;
  @Output() onCloseModel = new EventEmitter();
  Form: FormGroup;
  compras: ICompra[] = [];
  modelos: IModelo[] = [];

  private initialFormState: any;

  constructor(private fb: FormBuilder, private Service: DetallecomprasService, private toastService: ToastrService){
    this.Form = this.fb.group({
      compra_id: new FormControl('', [Validators.required]),
      modelo_id: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
    });
    this.initialFormState = this.Form.value;
  }

  ngOnInit() {
    this.getCompras();
    this.getModelos();
  }

  getCompras(){
    this.Service.getAllCompras().subscribe({
      next:(response)=>{
        this.compras = response.data;
      }
    });
  }

  getModelos(){
    this.Service.getAllModelos().subscribe({
      next:(response)=>{
        this.modelos = response.data;
      }
    });
  }
  ngOnChanges(): void {
    if(this.data){
      this.Form.patchValue({
        compra_id: this.data?.compra.id,
        modelo_id: this.data?.modelo.id,
        cantidad: this.data?.cantidad,
        precio: this.data?.precio,
      });
    }
  }

  onClose(){
    this.Form.setValue(this.initialFormState);
    this.onCloseModel.emit(false);
  }

  onSubmit(){
    if(this.Form.valid){
      if(this.data){
        this.Service.update(this.data.id as string, this.Form.value).subscribe({
          next:(response)=>{
            this.toastService.success(response.message)
            this.onClose();
          }
        }); 
      }else{
        this.Service.create(this.Form.value).subscribe({
          next:(response)=>{
            this.toastService.success(response.message)
            this.onClose();
          }
        }); 
      }
    }else{
      this.Form.markAllAsTouched();
    }
  }
}
