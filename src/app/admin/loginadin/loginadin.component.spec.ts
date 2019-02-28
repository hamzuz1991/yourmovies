import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginadinComponent } from './loginadin.component';

describe('LoginadinComponent', () => {
  let component: LoginadinComponent;
  let fixture: ComponentFixture<LoginadinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginadinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginadinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
