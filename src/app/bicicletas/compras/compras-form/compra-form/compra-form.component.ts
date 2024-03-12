import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICompra } from '../../../../shared/models/Campra';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComprasService } from '../../../../services/compras/compras.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compra-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './compra-form.component.html',
  styleUrl: './compra-form.component.css'
})
export class CompraFormComponent {
  @Input() data: ICompra | null = null;
  @Output() onCloseModel = new EventEmitter();
  CompraForm: FormGroup;

  private initialFormState: any;

  constructor(private fb: FormBuilder, private compraService: ComprasService, private toastService: ToastrService){
    this.CompraForm = this.fb.group({
      user_id: new FormControl('', [Validators.required]),
      metodo_pago_id: new FormControl('', [Validators.required]),
      total: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
    });
    this.initialFormState = this.CompraForm.value;
  }

  ngOnChanges(): void {
    if(this.data){
      this.CompraForm.patchValue({
        user_id: this.data?.user_id,
        metodo_pago_id: this.data?.metodo_pago_id,
        total: this.data?.total,
        fecha: this.data?.fecha,
      });
    }
  }

  onClose(){
    this.CompraForm.setValue(this.initialFormState);
    this.onCloseModel.emit(false);
  }

  onSubmit(){
    if(this.CompraForm.valid){
      if(this.data){
        this.compraService.updateCompra(this.data.id as string, this.CompraForm.value).subscribe({
          next:(response)=>{
            this.toastService.success(response.message)
            this.onClose();
          }
        }); 
      }else{
        this.compraService.createCompra(this.CompraForm.value).subscribe({
          next:(response)=>{
            this.toastService.success(response.message)
            this.onClose();
          }
        }); 
      }
    }else{
      this.CompraForm.markAllAsTouched();
    }
  }
}
