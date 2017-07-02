import {Component, Input, OnInit} from "@angular/core";
import {Task} from "../task";
import {TaskService} from "../task.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import {CustomValidators} from "../custom-validators";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  @Input()
  task: Task;

  taskForm: FormGroup;
  completedFormControl: FormControl;
  descriptionFormControl: FormControl;

  constructor(private taskService: TaskService, private formBuilder: FormBuilder) {
    this.completedFormControl = formBuilder.control(false);
    this.descriptionFormControl = formBuilder.control('', CustomValidators.required);
    this.taskForm = formBuilder.group({
      completed: this.completedFormControl,
      description: this.descriptionFormControl
    });
  }

  ngOnInit() {
    this.taskForm.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(value => {
        if (this.taskForm.dirty && this.taskForm.valid) {
          this.updateTask(this.task);
        }
      });
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe();
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe();
  }
}
