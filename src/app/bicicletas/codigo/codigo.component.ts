import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-codigo',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule, NgIf],
  templateUrl: './codigo.component.html',
  styleUrl: './codigo.component.css'
})
export class CodigoComponent {
  codigoObj: Codigo;
  public Error: String | null = null;
  isRequestInProgress = false;


  constructor(private http: HttpClient, private router: Router){
    this.codigoObj = new Codigo();
  }

  onCodigo(){
    this.isRequestInProgress = true;

    this.http.post('http://127.0.0.1:8000/api/auth/verify', this.codigoObj).subscribe(
      (res:any)=>{
      if(res.result){
        alert("Codigo valido")
        localStorage.setItem('TOKEN', res.token)
        this.router. navigateByUrl('/layout/home')
        this.Error = null;
      }else{
        alert("Codigo no valido")
      }
    },
    (error)=>{
      this.Error = "El codigo es invalido, porfavor, reviselo bien."
      alert(this.Error)
    }
    ).add(() => {
      this.isRequestInProgress = false;
    });
  }
}

export class Codigo{
  verification_code: string;
  constructor(){
    this.verification_code='';
  }
}
