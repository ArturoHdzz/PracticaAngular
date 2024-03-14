import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMetodoPago } from '../../../../shared/models/MetodoPago';
import { MetodopagosService } from '../../../../services/metodopagos/metodopagos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-metodopago-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './metodopago-form.component.html',
  styleUrl: './metodopago-form.component.css'
})
export class MetodopagoFormComponent implements OnChanges{
  @Input() data: IMetodoPago | null = null;
  @Output() onCloseModel = new EventEmitter();
  Form: FormGroup;

  public nombreError: String | null = null;
  public descripcionError: String | null = null;
  public tipoError: String | null = null;

  private initialFormState: any;

  constructor(private fb: FormBuilder, private Service: MetodopagosService, private toastService: ToastrService){
    this.Form = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
    });
    this.initialFormState = this.Form.value;
  }

  ngOnChanges(): void {
    if(this.data){
      this.Form.patchValue({
        nombre: this.data?.nombre,
        descripcion: this.data?.descripcion,
        tipo: this.data?.tipo,
      });
    }
  }

  onClose(){
    this.Form.setValue(this.initialFormState);
    this.onCloseModel.emit(false);
  }

  onSubmit(){
    if(this.Form.valid){
      let request;
      if(this.data){
        request = this.Service.update(this.data.id as string, this.Form.value);
      }else{
        request = this.Service.create(this.Form.value);
      }

      request.subscribe({
        next:(response)=> {
          this.toastService.success(response.message)
          this.nombreError = null;
          this.descripcionError = null;
          this.tipoError = null;
          this.onClose();
        },
        error: (err) => {
          if(err.error){
            console.log(err.error);
            this.nombreError = err.error.nombre;
            this.descripcionError = err.error.descripcion;
            this.tipoError = err.error.tipo;
          }
        }
      }); 
    }else{
      this.Form.markAllAsTouched();
    }
  }
}
