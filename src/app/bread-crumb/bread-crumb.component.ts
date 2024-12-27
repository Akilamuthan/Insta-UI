// bread-crumb.component.ts
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {

  breadcrumbs:any;
  breadcrumb:any;
  private breadcrumbSource = new BehaviorSubject<string[]>([]);
  breadcrumbs$ = this.breadcrumbSource.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private breadcrumbService: BreadcrumbService,private location:Location) {

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
        this.breadcrumb=breadcrumbs.push(route.snapshot.data["breadcrumbs"]);
        this.breadcrumbs=breadcrumbs.push(route.snapshot.data[ROUTE_DATA_BREADCRUMB]);
      }

      if (route.firstChild) {
        return this.createBreadcrumbs(route.firstChild, breadcrumbs);
      }
    }

    return breadcrumbs;
  }
  

  ngOnInit(): void {
    this.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
      console.log("breadcrumb", this.breadcrumbs);
    });
  }

post(){
  this.location.back();
}
}
