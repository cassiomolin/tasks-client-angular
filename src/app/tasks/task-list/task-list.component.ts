import {Component, OnInit} from "@angular/core";
import {TaskService} from "../task.service";
import {Task} from "../task";
import {TaskStatusPipe} from "../task-status.pipe";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskStatusPipe]
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
