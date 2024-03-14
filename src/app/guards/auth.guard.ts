import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router)
  
  const localData = localStorage.getItem('TOKEN');
  if(localData != ''){
    return true;
  }else{
    router.navigateByUrl('/login')
    return false;
  }

};
