import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderhisComponent } from './orderhis.component';

describe('OrderhisComponent', () => {
  let component: OrderhisComponent;
  let fixture: ComponentFixture<OrderhisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderhisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderhisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
