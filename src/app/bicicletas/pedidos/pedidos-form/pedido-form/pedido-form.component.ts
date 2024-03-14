import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPedido , IUser, IMetodoPago} from '../../../../shared/models/Pedido';
import { PedidosService } from '../../../../services/pedidos/pedidos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pedido-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pedido-form.component.html',
  styleUrl: './pedido-form.component.css'
})
export class PedidoFormComponent implements OnChanges{
  @Input() data: IPedido | null = null;
  @Output() onCloseModel = new EventEmitter();
  Form: FormGroup;
  users: IUser[] = [];
  metodosPago: IMetodoPago[] = [];

  public userError: String | null = null;
  public metodoPagoError: String | null = null;
  public totalError: String | null = null;
  public fechaError: String | null = null;
  public direccionError: String | null = null;

  private initialFormState: any;

  constructor(private fb: FormBuilder, private Service: PedidosService, private toastService: ToastrService){
    this.Form = this.fb.group({
      user_id: new FormControl('', [Validators.required]),
      metodo_pago_id: new FormControl('', [Validators.required]),
      total: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
    });
    this.initialFormState = this.Form.value;
  }

  ngOnInit() {
    this.getUsers();
    this.getMetodosPago();
  }

  getUsers(){
    this.Service.getAllUsers().subscribe({
      next:(response)=>{
        this.users = response.data;
      }
    });
  }

  getMetodosPago(){
    this.Service.getAllMetodos().subscribe({
      next:(response)=>{
        this.metodosPago = response.data;
      }
    });
  }

  ngOnChanges(): void {
    if(this.data){
      this.Form.patchValue({
        user_id: this.data?.user.id,
        metodo_pago_id: this.data?.metodo_pago.id,
        total: this.data?.total,
        fecha: this.data?.fecha,
        direccion: this.data?.direccion,
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
          this.userError = null;
          this.metodoPagoError = null;
          this.totalError = null;
          this.fechaError = null;
          this.direccionError = null;
          this.onClose();
        },
        error: (err) => {
          if(err.error){
            console.log(err.error);
            this.userError = err.error.user_id;
            this.metodoPagoError = err.error.metodo_pago_id;
            this.totalError = err.error.total;
            this.fechaError = err.error.fecha;
            this.direccionError = err.error.direccion;
          }
        }
      }); 
    }else{
      this.Form.markAllAsTouched();
    }
  }
}
