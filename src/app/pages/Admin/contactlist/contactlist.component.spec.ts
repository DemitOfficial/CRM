/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContactlistComponent } from './contactlist.component';

describe('ContactlistComponent', () => {
  let component: ContactlistComponent;
  let fixture: ComponentFixture<ContactlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
