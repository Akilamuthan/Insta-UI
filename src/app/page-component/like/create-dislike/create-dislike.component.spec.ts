import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDislikeComponent } from './create-dislike.component';

describe('CreateDislikeComponent', () => {
  let component: CreateDislikeComponent;
  let fixture: ComponentFixture<CreateDislikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDislikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDislikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
