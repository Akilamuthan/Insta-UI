import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

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

  create(id: number, data: any): Observable<any> {
    console.log("Comment Data:", data, "Post ID:", id);

    const headers = this.createAuthorizationHeader();

    return this.http.post(`${this.apiUrl}/posts/${id}/comment`, data, { headers })
      .pipe(catchError(this.handleError)); 
  }

  updateComment(id: number, commentId: number, content: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put(`${this.apiUrl}/posts/${id}/comment/${commentId}`, { content }, { headers })
      .pipe(catchError(this.handleError));
  }
  
  delete(){

  }
  show(){
    
  }
}
