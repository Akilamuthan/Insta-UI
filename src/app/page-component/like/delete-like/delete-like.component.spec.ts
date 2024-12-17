import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLikeComponent } from './delete-like.component';

describe('DeleteLikeComponent', () => {
  let component: DeleteLikeComponent;
  let fixture: ComponentFixture<DeleteLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
