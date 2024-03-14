import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDetallePedido, IModelo, IPedido } from '../../../../shared/models/DetallePedido';
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
  pedidos: IPedido[] = [];
  modelos: IModelo[] = [];

  public pedido_idError: String | null = null;
  public modelo_idError: String | null = null;
  public cantidadError: String | null = null;
  public precioError: String | null = null;

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

  ngOnInit() {
    this.getPedidos();
    this.getModelos();
  }

  getPedidos(){
    this.Service.getAllPedidos().subscribe({
      next:(response)=>{
        this.pedidos = response.data;
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
        pedido_id: this.data?.pedido.id,
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
      let request;
      if(this.data){
        request = this.Service.update(this.data.id as string, this.Form.value);
      }else{
        request = this.Service.create(this.Form.value);
      }

      request.subscribe({
        next:(response)=> {
          this.toastService.success(response.message)
          this.pedido_idError = null;
          this.modelo_idError = null;
          this.cantidadError = null;
          this.precioError = null;
          this.onClose();
        },
        error: (err) => {
          if(err.error){
            console.log(err.error);
            this.pedido_idError = err.error.pedido_id;
            this.modelo_idError = err.error.modelo_id;
            this.cantidadError = err.error.cantidad;
            this.precioError = err.error.precio;
          }
        }
      }); 
    }else{
      this.Form.markAllAsTouched();
    }
  }
}
