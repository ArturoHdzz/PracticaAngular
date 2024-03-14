import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ICatalogo } from '../../../../shared/models/Catalogo';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogosService } from '../../../../services/catalogos/catalogos.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './catalogo-form.component.html',
  styleUrl: './catalogo-form.component.css'
})
export class CatalogoFormComponent implements OnChanges{
  @Input() data: ICatalogo | null = null;
  @Output() onCloseModel = new EventEmitter();
  catalogoForm: FormGroup;

  public nombreError: String | null = null;
  public descripcionError: String | null = null;

  private initialFormState: any;

  constructor(private fb: FormBuilder, private catalogoService: CatalogosService, private toastService: ToastrService){
    this.catalogoForm = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
    });
    this.initialFormState = this.catalogoForm.value;
  }

  ngOnChanges(): void {
    if(this.data){
      this.catalogoForm.patchValue({
        nombre: this.data?.nombre,
        descripcion: this.data?.descripcion,
      });
    }
  }

  onClose(){
    this.catalogoForm.setValue(this.initialFormState);
    this.onCloseModel.emit(false);
  }

  onSubmit(){
    if(this.catalogoForm.valid){
      let request;
      if(this.data){
        request = this.catalogoService.updateCatalogo(this.data.id as string, this.catalogoForm.value);
      }else{
        request = this.catalogoService.createCatalogo(this.catalogoForm.value);
      }

      request.subscribe({
        next:(response)=> {
          this.toastService.success(response.message)
          this.nombreError = null;
          this.descripcionError = null;
          this.onClose();
        },
        error: (err) => {
          if(err.error){
            console.log(err.error);
            this.nombreError = err.error.nombre;
            this.descripcionError = err.error.descripcion;
          }
        }
      }); 
    }else{
      this.catalogoForm.markAllAsTouched();
    }
  }
}
