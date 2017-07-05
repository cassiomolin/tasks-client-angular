import {Component, OnInit} from "@angular/core";
import {TaskService} from "../task.service";
import {Task} from "../task";
import {TaskStatusPipe} from "../task-status.pipe";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskStatusPipe],
  animations: [
    trigger(
      'fade',
      [
        transition(
          ':enter', [
            style({'opacity': 0}),
            animate('500ms', style({'opacity': 1}))
          ]
        ),
        transition(
          ':leave', [
            style({'opacity': 1}),
            animate('500ms', style({'opacity': 0}))
          ]
        )
      ]
    )
  ]
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  filter = "all";

  constructor(private taskService: TaskService) {
    taskService.taskCreated.subscribe(task => this.onTaskCreated(task));
    taskService.taskDeleted.subscribe(task => this.onTaskDeleted(task));
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks
      });
  }

  deleteCompletedTasks() {
    this.taskService.deleteCompletedTasks()
      .subscribe(() => {
        this.getTasks();
      });
  }

  private onTaskCreated(task: Task): void {
    this.getTasks();
  }

  private onTaskDeleted(task: Task): void {
    this.getTasks();
  }
}
