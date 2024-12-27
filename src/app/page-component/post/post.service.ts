import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router';


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
export class PostService {

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
    
  update(id: number, data: FormData): Observable<any> {
      const headers = this.createAuthorizationHeader();
      return this.http.post(`${this.apiUrl}/posts/update/${id}`, data, { headers }) 
        .pipe(catchError(this.handleError));
    }
  
 
  delete(id: number): Observable<any> {
      const headers = this.createAuthorizationHeader();
      return this.http.delete(`${this.apiUrl}/posts/delete/${id}`, { headers })
        .pipe(catchError(this.handleError));
    }

  postData(data: FormData): Observable<any> {
        console.log("start");
        const headers = this.createAuthorizationHeader();
      
        if (headers.has('Authorization')) {
          return this.http.post(`${this.apiUrl}/posts/create`, data, { headers })
            .pipe(
              catchError(error => {
                return this.handleError(error);
              })
            );
        } else {
          this.router.navigate(['/login']);
          return throwError('Unauthorized: No token found. Redirecting to login page.');
        }
      }
      

      
      unauthPost(): Observable<Post[]> {  
        return this.http.get<Post[]>(`${this.apiUrl}/posts/newUser`) 
          .pipe(catchError(this.handleError.bind(this))); 
      }

      

    getPosts(): Observable<Post[]> { 

        const headers = this.createAuthorizationHeader();
        return this.http.get<Post[]>(`${this.apiUrl}/posts`, { headers }) 
          .pipe(catchError(this.handleError.bind(this))); 
      }
    
      Post(id:number): Observable<Post[]> { 
         const headers = this.createAuthorizationHeader();
         return this.http.get<Post[]>(`${this.apiUrl}/posts/${id}`, { headers })  
           .pipe(catchError(this.handleError.bind(this))); 
       }
     

      likePost(id:number){
        const headers = this.createAuthorizationHeader();
        return this.http.get<Post[]>(`${this.apiUrl}/posts/${id}/like`, { headers }) 
          .pipe(catchError(this.handleError.bind(this))); 
      }
      

      dislikePost(id:number){
        const headers = this.createAuthorizationHeader();
        return this.http.get<Post[]>(`${this.apiUrl}/posts/${id}/dislike`, { headers }) 
          .pipe(catchError(this.handleError.bind(this))); 
      }

      getPost(): Observable<Post[]> {  
        return this.http.get<Post[]>(`${this.apiUrl}/posts/newUser`) 
          .pipe(catchError(this.handleError.bind(this))); 
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

    tagShow(): Observable<any> {
      console.log('start');
      const headers = this.createAuthorizationHeader();
      return this.http.get<any>(`${this.apiUrl}/tags`, { headers })
        .pipe(
          catchError(this.handleError) 
        );
    }

    commentShow(id: number): Observable<any> {
      const headers = this.createAuthorizationHeader();
      return this.http.get(`${this.apiUrl}/posts/${id}/comments`, { headers }) 
        .pipe(catchError(this.handleError));
    }
    //


    create(id: number, data: any): Observable<any> {
      console.log("Comment Data:", data, "Post ID:", id);
  
      const headers = this.createAuthorizationHeader();
  
      return this.http.post(`${this.apiUrl}/posts/${id}/comment`, data, { headers })
        .pipe(catchError(this.handleError)); 
    }
    deleteComment(postId: any, commentId: any): Observable<void> {
    console.log("post",postId,"comment",commentId);
      const headers = this.createAuthorizationHeader(); 
      return this.http.delete<void>(`${this.apiUrl}/posts/${postId}/comment/${commentId}`, { headers })
        .pipe(catchError(this.handleError));
    }

    postReport(id: number): Observable<any> {
      const headers = this.createAuthorizationHeader();  
      return this.http.post(
        `${this.apiUrl}/posts/${id}/report`, 
        {},  
        { headers }  
      ).pipe(catchError(this.handleError)); 
    }
  
    // Report a comment
    commentReport(id: number): Observable<any> {
      const headers = this.createAuthorizationHeader();  
      return this.http.post(
        `${this.apiUrl}/comments/${id}/report`,  
        {},  
        { headers } 
      ).pipe(catchError(this.handleError)); 
    }


    like(id:number){
      const headers = this.createAuthorizationHeader();

      return this.http.get(`${this.apiUrl}/posts/${id}/like`,{headers}) 
      .pipe(catchError(this.handleError.bind(this))); 
    }
    dislikeCount(id:number){
      const headers = this.createAuthorizationHeader();

      return this.http.get(`${this.apiUrl}/posts/${id}/dislike`,{headers}) 
      .pipe(catchError(this.handleError.bind(this))); 
    }


    onsearch(){
      const headers = this.createAuthorizationHeader();  
      return this.http.post(
        `${this.apiUrl}/comments/report`,  
        {},  
        { headers } 
      ).pipe(catchError(this.handleError)); 
    }



    view(id:number){
      const headers = this.createAuthorizationHeader();  
      return this.http.post(
        `${this.apiUrl}/posts/${id}/view`,  
        {},  
        { headers } 
      ).pipe(catchError(this.handleError)); 
    }

    viewCount(id:number){
      console.log('start');
      const headers = this.createAuthorizationHeader();  
      return this.http.get(`${this.apiUrl}/posts/${id}/views`,{ headers } 
      ).pipe(catchError(this.handleError)); 
    }

    postUser(id:number) {
      const headers = this.createAuthorizationHeader();  
      return this.http.get(`${this.apiUrl}/user/${id}`, { headers });  
    }

    follow(id: number) {
      const headers = this.createAuthorizationHeader();
      const options = { headers }; 
      
      return this.http.post(`${this.apiUrl}/follow/${id}`, {}, options);  
    }
    
    unfollow(id: number) {
      const headers = this.createAuthorizationHeader();
      const options = { headers };  
    
      return this.http.delete(`${this.apiUrl}/unfollow/${id}`, options);  
    }
    

    following() {
      const headers = this.createAuthorizationHeader();
     
      return this.http.get(`${this.apiUrl}/following`, {headers});  
    }



    followers() {
      const headers = this.createAuthorizationHeader(); 
    
      return this.http.get(`${this.apiUrl}/followers`, { headers });  
    }

    pericularpost(data:any){
      const headers = this.createAuthorizationHeader(); 

      return this.http.get(`${this.apiUrl}/posts/perticularPost/${data}`, { headers });  
    }
    }

