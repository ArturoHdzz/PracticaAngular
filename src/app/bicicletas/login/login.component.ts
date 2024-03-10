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
    this.http.post('', this.loginObj).subscribe((res:any)=>{
      if(res.result){
        alert("Inicio de sesion Exitosamente")
        localStorage.setItem('token', res.data.token)
        this.router. navigateByUrl('/codigo')
      }else{
        alert(res.message)
      }
    })
  }
}
export class Login{
  EmailId: string;
  Password: string;
  constructor(){
    this.EmailId='';
    this.Password='';
  }
}