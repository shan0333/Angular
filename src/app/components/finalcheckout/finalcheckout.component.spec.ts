import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalcheckoutComponent } from './finalcheckout.component';

describe('FinalcheckoutComponent', () => {
  let component: FinalcheckoutComponent;
  let fixture: ComponentFixture<FinalcheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalcheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalcheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
