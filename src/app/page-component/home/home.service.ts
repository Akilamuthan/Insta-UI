import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

interface User {
  id: number;
  email: string;
}

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  message: string;
  user: User;
}


interface Post {
  id: number;
  title: string;
  content: string;
  description: string;
  file_type: string;
  file_path: string;
  user_id: string;
  category_id: string;
  post_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error?.message || 'Something bad happened; please try again later.';
    return throwError(errorMessage);
  }

  getUser(): Observable<any> {
    const headers = this.createAuthorizationHeader();  
    return this.http.get(`${this.apiUrl}/user`, { headers });  
  }
    
  
  getPosts(): Observable<Post[]> { 

    const headers = this.createAuthorizationHeader();
    return this.http.get<Post[]>(`${this.apiUrl}/posts`, { headers }) 
      .pipe(catchError(this.handleError.bind(this))); 
  }


  unauthPost(): Observable<Post[]> {  
    return this.http.get<Post[]>(`${this.apiUrl}/posts/newUser`) 
      .pipe(catchError(this.handleError.bind(this))); 
  }



  register(data: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, data)
      .pipe(catchError(this.handleError));
  }

  login(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data)
      .pipe(catchError(this.handleError));
  }

  logout(): Observable<any> {
    const headers = this.createAuthorizationHeader();
  
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
      }),
      catchError((err) => {
        console.error('Logout failed', err);
        if (err.status === 401 || err.status === 403) {
          localStorage.removeItem('access_token');
          this.router.navigate(['/login']);
        }
        return throwError(err);
      })
    );
  }
  

  getCategory(category:any){
    const headers = this.createAuthorizationHeader();

    return this.http.get<Post[]>(`${this.apiUrl}/categories/${category}`,{headers}) 
    .pipe(catchError(this.handleError.bind(this))); 
}


categoryShow(): Observable<any> {
  console.log('start');
  const headers = this.createAuthorizationHeader();
  return this.http.get<any>(`${this.apiUrl}/categories`, { headers })
    .pipe(
      catchError(this.handleError) 
    );
}


userUpdate(id: any, data: any) {
  const headers = this.createAuthorizationHeader();

  return this.http.put<Post[]>(`${this.apiUrl}/users/update/${id}`, data, { headers })
    .pipe(catchError(this.handleError.bind(this)));
}

userDelete(id: any, ) {

  const headers = this.createAuthorizationHeader();

  return this.http.delete(`${this.apiUrl}/users/${id}/delete`, {headers} )
    .pipe(catchError(this.handleError.bind(this)));
}

userAll( ) {

  const headers = this.createAuthorizationHeader();

  return this.http.get(`${this.apiUrl}/users/list`, {headers} )
    .pipe(catchError(this.handleError.bind(this)));
}

}