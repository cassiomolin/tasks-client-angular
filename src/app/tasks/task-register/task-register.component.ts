import {Component, OnInit, ViewChild} from "@angular/core";
import {TaskService} from "../task.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CustomValidators} from "../custom-validators";

@Component({
  selector: 'app-task-register',
  templateUrl: './task-register.component.html',
  styleUrls: ['./task-register.component.css']
})
export class TaskRegisterComponent implements OnInit {

  @ViewChild('description')
  descriptionElement: any;

  taskForm: FormGroup;
  descriptionFormControl: FormControl;

  constructor(private taskService: TaskService, private formBuilder: FormBuilder) {
    this.descriptionFormControl = formBuilder.control('', CustomValidators.required);
    this.taskForm = formBuilder.group({
      description: this.descriptionFormControl
    });
  }

  ngOnInit() {

  }

  createTask(): void {
    let description = this.descriptionFormControl.value;
    this.taskService.createTask(description).subscribe(task => {
      this.taskForm.reset();
      this.descriptionElement.nativeElement.focus();
    });
  }
}
