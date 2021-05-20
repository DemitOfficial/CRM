/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PrintquotationadminComponent } from './printquotationadmin.component';

describe('PrintquotationadminComponent', () => {
  let component: PrintquotationadminComponent;
  let fixture: ComponentFixture<PrintquotationadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintquotationadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintquotationadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
