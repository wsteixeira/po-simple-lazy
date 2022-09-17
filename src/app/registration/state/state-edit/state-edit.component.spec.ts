import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PoPageDynamicEditModule } from '@po-ui/ng-templates';

import { StateEditComponent } from './state-edit.component';

describe('StateEditComponent', () => {
  let component: StateEditComponent;
  let fixture: ComponentFixture<StateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PoPageDynamicEditModule
      ],
      declarations: [ StateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
