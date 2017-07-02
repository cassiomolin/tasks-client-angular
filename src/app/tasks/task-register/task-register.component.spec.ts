import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {TaskRegisterComponent} from "./task-register.component";

describe('TaskRegisterComponent', () => {
  let component: TaskRegisterComponent;
  let fixture: ComponentFixture<TaskRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskRegisterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
