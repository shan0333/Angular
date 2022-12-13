import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GunscannerComponent } from './gunscanner.component';

describe('GunscannerComponent', () => {
  let component: GunscannerComponent;
  let fixture: ComponentFixture<GunscannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GunscannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GunscannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
