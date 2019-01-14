import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolaritieHomeComponent } from './scolaritie-home.component';

describe('ScolaritieHomeComponent', () => {
  let component: ScolaritieHomeComponent;
  let fixture: ComponentFixture<ScolaritieHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScolaritieHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScolaritieHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
