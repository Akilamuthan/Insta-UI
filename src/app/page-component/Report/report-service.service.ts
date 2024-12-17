import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {


  private apiUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient, private router: Router) {
   
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


  commentreport(id:number,data:string){
    const headers = this.createAuthorizationHeader();
      return this.http.post(`${this.apiUrl}/comments/${id}/report`, data,{headers})
        .pipe(catchError(this.handleError));
  }
  postreport(id:number,data:string){
    const headers = this.createAuthorizationHeader();
      return this.http.post(`${this.apiUrl}/posts/${id}/report`, data,{headers})
        .pipe(catchError(this.handleError));
  }


  showCommentreport() {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.apiUrl}/comments/report`, { headers })
      .pipe(
        catchError(this.handleError) 
      );
  }
  showPostReport() {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.apiUrl}/posts/report`, { headers })
      .pipe(
        catchError(this.handleError) 
      );
  }

  showReport() {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.apiUrl}/reports/show
    `, { headers })
      .pipe(
        catchError(this.handleError) 
      );
  }


  

  changeReportStatus(reportId: number, status: string) {
    const headers = this.createAuthorizationHeader();
    

    return this.http.put(`${this.apiUrl}/Reports/${reportId}/status`, { status },{ headers }).pipe(
      catchError(this.handleError) 
    );
  }
  
}
