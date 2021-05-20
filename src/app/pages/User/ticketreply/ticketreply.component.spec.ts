/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TicketreplyComponent } from './ticketreply.component';

describe('TicketreplyComponent', () => {
  let component: TicketreplyComponent;
  let fixture: ComponentFixture<TicketreplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketreplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketreplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
