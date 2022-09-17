import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PoPageDynamicDetailModule } from '@po-ui/ng-templates';

import { StateDetailComponent } from './state-detail.component';

describe('StateDetailComponent', () => {
  let component: StateDetailComponent;
  let fixture: ComponentFixture<StateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PoPageDynamicDetailModule
      ],
      declarations: [ StateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
