import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportServiceService } from '../report-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-show-report',
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.css']
})
export class ShowReportComponent implements OnInit, OnDestroy {
  form: FormGroup;
  reports: any;
  private unsubscribe$: Subject<void> = new Subject();  // Used for unsubscription when component is destroyed
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
}
