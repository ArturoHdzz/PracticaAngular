import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IModelo, IItem } from '../../../../shared/models/Modelo';
import { ModelosService } from '../../../../services/modelos/modelos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modelo-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modelo-form.component.html',
  styleUrl: './modelo-form.component.css'
})
export class ModeloFormComponent implements OnChanges {
  @Input() data: IModelo | null = null;
  @Output() onCloseModel = new EventEmitter();
  Form: FormGroup;
  items: IItem[] = [];

  private initialFormState: any;

  constructor(private fb: FormBuilder, private Service: ModelosService, private toastService: ToastrService){
    this.Form = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      item_id: new FormControl('', [Validators.required]),
    });
    this.initialFormState = this.Form.value;
  }

  ngOnInit() {
    this.getItems();
  }

  getItems(){
    this.Service.getItems().subscribe({
      next:(response)=>{
        this.items = response.data;
      }
    });
  }

  ngOnChanges(): void {
    if(this.data){
      this.Form.patchValue({
        nombre: this.data?.nombre,
        descripcion: this.data?.descripcion,
        item_id: this.data?.item.id,
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
