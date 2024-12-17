import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportServiceService } from '../report-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

export interface report {
  reason: string;
  status: string;
  reportable_id: number;
  reportable_type: any;
}



@Component({
  selector: 'app-show-report',
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.css']
})
export class ShowReportComponent implements OnInit, OnDestroy {
  form: FormGroup;
  reports: any;
  report:any;
  post:boolean= false;
  comment:boolean= false;
  private unsubscribe$: Subject<void> = new Subject();  
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private reportService: ReportServiceService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    
    this.reportService.showReport().pipe(
      takeUntil(this.unsubscribe$)  
    ).subscribe({
      next: (response) => {
        console.log('Comment Reports:', response);
        this.reports = response;  
      },
      error: (err) => {
        console.error('Error fetching reports:', err);
        this.errorMessage = 'Failed to load reports. Please try again later.';
      }
    });


  }

  changeStatus(reportId: number): void {
    if (this.form.invalid) {
      this.errorMessage = 'Please select a valid status.';
      return;
    }

    const status = this.form.value.status;
    this.reportService.changeReportStatus(reportId, status).subscribe({
      next: (response) => {
        console.log('Status changed successfully:', response);
        this.router.navigate(['/show/report']);  
      },
      error: (error) => {
        console.error('Error changing status:', error);
        this.errorMessage = 'Failed to change the status. Please try again later.';
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();  
  }

  commentReport() {
    this.reportService.showReport().pipe(
      takeUntil(this.unsubscribe$)  
    ).subscribe({
      next: (reports: any) => {
        console.log('Comment Reports:', reports);
        this.reports = reports.filter((report: any) => report.reportable_type === 'App\\Models\\Comment');
        
        console.log('Filtered Reports:', this.reports);
        this.comment=true;
        this.post=false;
      },
      error: (err) => {
        console.error('Error fetching reports:', err);
        this.errorMessage = 'Failed to load reports. Please try again later.';
      }
    });
  }
  
  postReport(){

    this.reportService.showReport().pipe(
      takeUntil(this.unsubscribe$)  
    ).subscribe({
      next: (reports: any) => {
        console.log('Comment Reports:', reports);
        this.reports = reports.filter((report: any) => report.reportable_type ===  'App\\Models\\Post');
        
        console.log('Filtered Reports:', this.reports);
        this.post=true;
        this.comment=false;
      },
      error: (err) => {
        console.error('Error fetching reports:', err);
        this.errorMessage = 'Failed to load reports. Please try again later.';
      }
    });

  }
}
