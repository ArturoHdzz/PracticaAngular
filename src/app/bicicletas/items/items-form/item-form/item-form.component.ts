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
