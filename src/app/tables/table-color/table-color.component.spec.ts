import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColorComponent } from './table-color.component';

describe('TableColorComponent', () => {
  let component: TableColorComponent;
  let fixture: ComponentFixture<TableColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
