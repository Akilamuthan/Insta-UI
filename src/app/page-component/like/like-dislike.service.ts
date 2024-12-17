import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LikeDislikeService {

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
    
  
  createLike(id: number): Observable<any> {
    console.log('start');
    const headers = this.createAuthorizationHeader();  
    const options = { headers }; 
    console.log('Headers:', headers);

    return this.http.post(`${this.apiUrl}/posts/${id}/like`, {}, options)
      .pipe(
        catchError((error) => {
          console.error('Error creating like:', error);
          return this.handleError(error);
        })
      );
  }
  


  createDislike(id: number): Observable<any> {
    const headers = this.createAuthorizationHeader();  
    const options = { headers }; 
    return this.http.post(`${this.apiUrl}/posts/${id}/dislike`, {}, options)  
      .pipe(
        catchError(this.handleError)  
      );
  }

  deleteDislike(id: number,dislike:number ): Observable<any> {
    const headers = this.createAuthorizationHeader();  
    const options = { headers }; 
    return this.http.delete(`${this.apiUrl}/posts/${id}/dislike/${dislike}`, options)  
      .pipe(
        catchError(this.handleError)  
      );
  }
  
  deleteLike(id: number,like:number): Observable<any> {
    const headers = this.createAuthorizationHeader();  
    const options = { headers }; 
    return this.http.delete(`${this.apiUrl}/posts/${id}/like/${like}`, options)  
      .pipe(
        catchError(this.handleError)  
      );
  }
  


}
