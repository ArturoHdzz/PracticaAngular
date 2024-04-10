import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private tokenService: TokenService, private router: Router){

  }

  ngOnInit(): void {
    this.isActive()
  }

  isActive(){
    this.tokenService.verifyIfIsActive().subscribe({
      next:(response)=>{
      },
      error: (error) => {
        if (error.status === 403) {
          this.router.navigate(['/login']);
        }
      }
      });
  }


}
