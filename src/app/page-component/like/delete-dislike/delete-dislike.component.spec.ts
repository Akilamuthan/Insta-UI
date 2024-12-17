import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDislikeComponent } from './delete-dislike.component';

describe('DeleteDislikeComponent', () => {
  let component: DeleteDislikeComponent;
  let fixture: ComponentFixture<DeleteDislikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDislikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDislikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
