import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  let token = localStorage.getItem('TOKEN');
  let header = req.headers;
  if (token) {
    header = header.set('Authorization', 'Bearer ' + token);
  }
  header = header.set('Content-Type', 'application/json');
  req = req.clone({ headers: header });
  console.log(req.headers);
  return next(req);
  
};
