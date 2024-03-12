import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDetallePedido } from '../../../../shared/models/DetallePedido';
import { DetallepedidosService } from '../../../../services/detallepedidos/detallepedidos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detallepedido-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './detallepedido-form.component.html',
  styleUrl: './detallepedido-form.component.css'
})
export class DetallepedidoFormComponent implements OnChanges{
  @Input() data: IDetallePedido | null = null;
  @Output() onCloseModel = new EventEmitter();
  Form: FormGroup;

  private initialFormState: any;

  constructor(private fb: FormBuilder, private Service: DetallepedidosService, private toastService: ToastrService){
    this.Form = this.fb.group({
      pedido_id: new FormControl('', [Validators.required]),
      modelo_id: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
    });
    this.initialFormState = this.Form.value;
  }

  ngOnChanges(): void {
    if(this.data){
      this.Form.patchValue({
        pedido_id: this.data?.pedido_id,
        modelo_id: this.data?.modelo_id,
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
