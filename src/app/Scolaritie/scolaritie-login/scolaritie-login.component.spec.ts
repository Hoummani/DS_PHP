import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolaritieLoginComponent } from './scolaritie-login.component';

describe('ScolaritieLoginComponent', () => {
  let component: ScolaritieLoginComponent;
  let fixture: ComponentFixture<ScolaritieLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScolaritieLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScolaritieLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
