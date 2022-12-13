import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicklableComponent } from './picklable.component';

describe('PicklableComponent', () => {
  let component: PicklableComponent;
  let fixture: ComponentFixture<PicklableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicklableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicklableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
