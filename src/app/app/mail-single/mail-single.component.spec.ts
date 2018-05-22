import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSingleComponent } from './mail-single.component';

describe('MailSingleComponent', () => {
  let component: MailSingleComponent;
  let fixture: ComponentFixture<MailSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
