import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JqueryKnobComponent } from './jquery-knob.component';

describe('JqueryKnobComponent', () => {
  let component: JqueryKnobComponent;
  let fixture: ComponentFixture<JqueryKnobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JqueryKnobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JqueryKnobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
