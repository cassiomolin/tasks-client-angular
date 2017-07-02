import {Pipe, PipeTransform} from "@angular/core";
import {Task} from "./task";

@Pipe({
  name: 'taskStatus',
  pure: false
})
export class TaskStatusPipe implements PipeTransform {

  transform(tasks: Task[], filter: string): Task[] {
    if ("all" === filter) {
      return tasks;
    } else {
      return tasks.filter(item => {
        let status = filter === "done";
        return item.completed === status;
      });
    }
  }
}
