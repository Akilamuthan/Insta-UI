import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ReportServiceService } from '../report-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-report',
  templateUrl: './post-report.component.html',
  styleUrls: ['./post-report.component.css']
})
export class PostReportComponent implements OnInit {

  form: FormGroup;
  admin:any;
  user:any;
  id:number=0;
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private ReportService:ReportServiceService,   private route: ActivatedRoute  ) {
    this.form = this.fb.group({
      reason: ['', [Validators.required]],  
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = +params.get('id')!; 
    });
  }

  report(){
    if (this.form.invalid) {
      this.errorMessage = 'Please enter a valid name.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;  
    const formData = this.form.value;
    console.log('Form Data:', formData);

    this.subscription.add(
      this.ReportService.postreport(this.id,formData).subscribe({
        next: (response) => {
          console.log('report successfully:', response);
          this.router.navigate(['/posts/show']); 
        },
        error: (err) => {
          console.error('Error creating tag:', err);
          this.errorMessage = 'Failed to create the tag. Please try again later.';
          this.router.navigate(['/login']);
        },
        complete: () => {
          this.isLoading = false; 
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }

}
