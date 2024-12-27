import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbSource = new BehaviorSubject<string[]>([]);
  breadcrumbs$ = this.breadcrumbSource.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      console.log(this.breadcrumbSource);
      this.breadcrumbSource.next(breadcrumbs);
     
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, breadcrumbs: string[] = []): string[] {
   
    if (route) {
      const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    
      if (route.snapshot.data && route.snapshot.data[ROUTE_DATA_BREADCRUMB]) {
        breadcrumbs.push(route.snapshot.data["breadcrumbs"]);
        breadcrumbs.push(route.snapshot.data[ROUTE_DATA_BREADCRUMB]);
      }

      if (route.firstChild) {
        return this.createBreadcrumbs(route.firstChild, breadcrumbs);
      }
    }

    return breadcrumbs;
  }
}
