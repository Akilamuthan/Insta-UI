import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparatePostComponent } from './separate-post.component';

describe('SeparatePostComponent', () => {
  let component: SeparatePostComponent;
  let fixture: ComponentFixture<SeparatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeparatePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
