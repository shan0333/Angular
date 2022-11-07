import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightsideHeaderComponent } from './rightside-header.component';

describe('RightsideHeaderComponent', () => {
  let component: RightsideHeaderComponent;
  let fixture: ComponentFixture<RightsideHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightsideHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightsideHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
