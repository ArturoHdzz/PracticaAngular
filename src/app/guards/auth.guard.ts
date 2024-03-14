import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = async (route, state) => {
  
  const router = inject(Router);
  const tokenService = inject(TokenService);

  const storedToken = localStorage.getItem('TOKEN');
  const currentToken = storedToken; 
  
  if (!storedToken || currentToken !== storedToken) {
    router.navigateByUrl('/login');
    return false;
  }

  if (storedToken) {
    try {
      const response = await tokenService.verifyToken(storedToken).toPromise();
      if (response.msg === 'Auth') {
        return true;
      } else {
        router.navigateByUrl('/login');
        return false;
      }
    } catch (error) {
      console.error(error);
      router.navigateByUrl('/login');
      return false;
    }
  } else {
    router.navigateByUrl('/login');
    return false;
  }

};
