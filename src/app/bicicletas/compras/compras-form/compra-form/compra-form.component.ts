import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ICompra, IUser, IMetodoPago } from '../../../../shared/models/Campra';
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
export class CompraFormComponent implements OnChanges{
  @Input() data: ICompra | null = null;
  @Output() onCloseModel = new EventEmitter();
  CompraForm: FormGroup;
  users: IUser[] = [];
  metodosPago: IMetodoPago[] = [];

  public user_idError: String | null = null;
  public metodo_pago_idError: String | null = null;
  public totalError: String | null = null;
  public fechaError: String | null = null;

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

  ngOnInit() {
    this.getUsers();
    this.getMetodosPago();
  }

  getUsers(){
    this.compraService.getAllUser().subscribe({
      next:(response)=>{
        this.users = response.data;
      }
    });
  }

  getMetodosPago(){
    this.compraService.getAllMetodoPago().subscribe({
      next:(response)=>{
        this.metodosPago = response.data;
      }
    });
  }

  ngOnChanges(): void {
    if(this.data){
      this.CompraForm.patchValue({
        user_id: this.data?.user.id,
        metodo_pago_id: this.data?.metodo_pago.id,
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
      let request;
      if(this.data){
        request = this.compraService.updateCompra(this.data.id as string, this.CompraForm.value);
      }else{
        request = this.compraService.createCompra(this.CompraForm.value);
      }

      request.subscribe({
        next:(response)=> {
          this.toastService.success(response.message)
          this.user_idError = null;
          this.metodo_pago_idError = null;
          this.totalError = null;
          this.fechaError = null;
          this.onClose();
        },
        error: (err) => {
          if(err.error){
            console.log(err.error);
            this.user_idError = err.error.user_id;
            this.metodo_pago_idError = err.error.metodo_pago_id;
            this.totalError = err.error.total;
            this.fechaError = err.error.fecha;
          }
        }
      }); 
    }else{
      this.CompraForm.markAllAsTouched();
    }
  }
}
