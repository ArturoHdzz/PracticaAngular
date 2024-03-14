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
  styleUrls: ['./detallecompra-form.component.css']
})
export class DetallecompraFormComponent implements OnChanges {
  @Input() data: IDetalleCompra | null = null;
  @Output() onCloseModel = new EventEmitter();
  Form: FormGroup;
  compras: ICompra[] = [];
  modelos: IModelo[] = [];

  public compra_idError: String | null = null;
  public modelo_idError: String | null = null;
  public cantidadError: String | null = null;
  public precioError: String | null = null;
  public stockError: String | null = null; // Added for stock error handling

  private initialFormState: any;

  constructor(private fb: FormBuilder, private Service: DetallecomprasService, private toastService: ToastrService) {
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

  getCompras() {
    this.Service.getAllCompras().subscribe({
      next: (response) => {
        this.compras = response.data;
      }
    });
  }

  getModelos() {
    this.Service.getAllModelos().subscribe({
      next: (response) => {
        this.modelos = response.data;
      }
    });
  }

  ngOnChanges(): void {
    if (this.data) {
      this.Form.patchValue({
        compra_id: this.data?.compra.id,
        modelo_id: this.data?.modelo.id,
        cantidad: this.data?.cantidad,
        precio: this.data?.precio,
      });
    }
  }

  onClose() {
    this.Form.setValue(this.initialFormState);
    this.onCloseModel.emit(false);
  }

  onSubmit() {
    if (this.Form.valid) {
      let request;
      if (this.data) {
        request = this.Service.update(this.data.id as string, this.Form.value);
      } else {
        request = this.Service.create(this.Form.value);
      }

      request.subscribe({
        next: (response) => {
          this.toastService.success(response.message);
          this.compra_idError = null;
          this.modelo_idError = null;
          this.cantidadError = null;
          this.precioError = null;
          this.stockError = null; // Reset stock error
          this.onClose();
        },
        error: (err) => {
          if (err.error) {
            console.log(err.error);
            this.compra_idError = err.error.compra_id;
            this.modelo_idError = err.error.modelo_id;
            this.cantidadError = err.error.cantidad;
            this.precioError = err.error.precio;
            this.stockError = err.error.stock; // Set stock error message
          }
        }
      });
    } else {
      this.Form.markAllAsTouched();
    }
  }
}
