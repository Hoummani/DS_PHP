import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterFonctionnaireComponent } from './ajouter-fonctionnaire.component';

describe('AjouterFonctionnaireComponent', () => {
  let component: AjouterFonctionnaireComponent;
  let fixture: ComponentFixture<AjouterFonctionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterFonctionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterFonctionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
