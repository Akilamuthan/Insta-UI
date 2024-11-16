import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {
   
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  getUser(): Observable<any> {
    const headers = this.createAuthorizationHeader();  
    return this.http.get(`${this.apiUrl}/user`, { headers });  
  }
    
  
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error?.message || 'Something bad happened; please try again later.';
    return throwError(errorMessage);
  }

  categoryCreate(data: any){
    const headers = this.createAuthorizationHeader();
    return this.http.post(`${this.apiUrl}/categories/create`, data,{headers})
      .pipe(catchError(this.handleError));
  }

  categoryupdate(id:number,data: FormData):Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put(`${this.apiUrl}/categories/update/${id}`, data, { headers }) 
      .pipe(catchError(this.handleError));
  }

  deleteCategory(id: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete(`${this.apiUrl}/categories/delete/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }


  

  categoryShow(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrl}/categories`, { headers })
      .pipe(
        catchError(this.handleError) 
      );
  }

}
