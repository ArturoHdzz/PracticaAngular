import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: Login;

  constructor(private http: HttpClient, private router: Router){
    this.loginObj = new Login();
  }

  onLogin(){
    debugger;
    this.http.post('http://127.0.0.1:8000/api/auth/login', this.loginObj).subscribe((res:any)=>{
      if(res.result){
        alert("Inicio de sesion Exitosamente")
        this.router. navigateByUrl('/codigo')
      }else{
        alert("Acceso no autorizado o campos invalidos")
      }
    })
  }
}
export class Login{
  email: string;
  password: string;
  constructor(){
    this.email='';
    this.password='';
  }
}