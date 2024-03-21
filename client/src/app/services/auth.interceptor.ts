import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


//The intercept method is automatically called for every HTTP request made via Angular's HttpClient.

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = localStorage.getItem('token')
    if (authToken)
    {
      const authRequest = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + authToken)});
      // the method forwards the (modified or original) request to the next handler in the chain.
      return next.handle(authRequest);
    }
    else
      return next.handle(request);
  }
}
