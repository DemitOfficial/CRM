/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuotedComponent } from './Quoted.component';

describe('QuotedComponent', () => {
  let component: QuotedComponent;
  let fixture: ComponentFixture<QuotedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
