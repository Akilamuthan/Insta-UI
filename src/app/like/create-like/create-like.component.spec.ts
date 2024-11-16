import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLikeComponent } from './create-like.component';

describe('CreateLikeComponent', () => {
  let component: CreateLikeComponent;
  let fixture: ComponentFixture<CreateLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
