import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IItem, ICatalogo } from '../../../../shared/models/Item';
import { ItemsService } from '../../../../services/items/items.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent implements OnChanges{
  @Input() data: IItem | null = null;
  @Output() onCloseModel = new EventEmitter();
  Form: FormGroup;
  catalogos: ICatalogo[] = [];

  public nombreError: String | null = null;
  public descripcionError: String | null = null;
  public stockError: String | null = null;
  public precioError: String | null = null;
  public catalogo_idError: String | null = null;

  private initialFormState: any;

  constructor(private fb: FormBuilder, private Service: ItemsService, private toastService: ToastrService){
    this.Form = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      catalogo_id: new FormControl('', [Validators.required]),
    });
    this.initialFormState = this.Form.value;
  }

  ngOnInit() {
    this.getCatalogos();
  }

  getCatalogos(){
    this.Service.getAllCatalogos().subscribe({
      next:(response)=>{
        this.catalogos = response.data;
      }
    });
  }

  ngOnChanges(): void {
    if(this.data){
      this.Form.patchValue({
        nombre: this.data?.nombre,
        descripcion: this.data?.descripcion,
        stock: this.data?.stock,
        precio: this.data?.precio,
        catalogo_id: this.data?.catalogo.id,
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
          this.stockError = null;
          this.precioError = null;
          this.catalogo_idError = null;
          this.onClose();
        },
        error: (err) => {
          if(err.error){
            console.log(err.error);
            this.nombreError = err.error.nombre;
            this.descripcionError = err.error.descripcion;
            this.stockError = err.error.stock;
            this.precioError = err.error.precio;
            this.catalogo_idError = err.error.catalogo_id;
          }
        }
      }); 
    }else{
      this.Form.markAllAsTouched();
    }
  }
}
