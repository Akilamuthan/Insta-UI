import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NameService {
  private names: string[] = [];
  private namesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.names);

  constructor() {}

 
  addName(newName: string): void {
    if (newName) {
      this.names.push(newName);
      this.namesSubject.next(this.names);  
    }
  }

  
  getNamesObservable(): Observable<string[]> {
    return this.namesSubject.asObservable();  
  }

  
  getNames(): string[] {
    return this.names;
  }
}
