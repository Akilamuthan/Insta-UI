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

 getUser(){
  console.log('start api');
  const getUser=this.createAuthorizationHeader();
  console.log(getUser);
  return getUser;
 }

  register(data: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, data)
      .pipe(catchError(this.handleError));
  }

  login(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data)
      .pipe(catchError(this.handleError));
  }

  //post
  postData(data: FormData): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post(`${this.apiUrl}/posts/create`, data, { headers })
      .pipe(catchError(this.handleError));
  }
  // Show posts 
  getPosts(): Observable<Post> {
      const headers = this.createAuthorizationHeader();
      return this.http.get<Post>(`${this.apiUrl}/posts`,  { headers })
        .pipe(catchError(this.handleError));
    }
    
  // Update a specific post
  update(id: number, data: FormData): Observable<any> {
      const headers = this.createAuthorizationHeader();
      return this.http.post(`${this.apiUrl}/posts/update/${id}`, data, { headers }) 
        .pipe(catchError(this.handleError));
    }
  
  // Delete a specific post
  delete(id: number): Observable<any> {
      const headers = this.createAuthorizationHeader();
      return this.http.delete(`${this.apiUrl}/posts/delete/${id}`, { headers })
        .pipe(catchError(this.handleError));
    }



  //tag 

  //tag create
  tagCreate(data: any): Observable<RegisterResponse> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<RegisterResponse>(`${this.apiUrl}/tags/create`, data,{headers})
      .pipe(catchError(this.handleError));
  }

  tagupdate(data: FormData):Observable<any> {
      const headers = this.createAuthorizationHeader();
      return this.http.put(`${this.apiUrl}/tags/update/1`, data, { headers }) 
        .pipe(catchError(this.handleError));
    }



  //category
  
  //create category
  categoryCreate(data: any){
    const headers = this.createAuthorizationHeader();
    return this.http.post<RegisterResponse>(`${this.apiUrl}/tags/create`, data,{headers})
      .pipe(catchError(this.handleError));
  }
  }







