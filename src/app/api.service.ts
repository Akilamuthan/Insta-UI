import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


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
export class ApiService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

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
  
  }







