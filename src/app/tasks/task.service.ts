import {EventEmitter, Injectable} from "@angular/core";
import {Task} from "./task";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/mergeMap";
import {environment} from "../../environments/environment";

@Injectable()
export class TaskService {

  public taskCreated: EventEmitter<Task>;
  public taskUpdated: EventEmitter<Task>;
  public taskDeleted: EventEmitter<Task>;

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
    this.taskCreated = new EventEmitter();
    this.taskUpdated = new EventEmitter();
    this.taskDeleted = new EventEmitter();
  }

  getTasks(): Observable<Task[]> {
    return this.http.get(`${environment.apiUrl}/tasks`)
      .map(response => response.json() as Task[]);
  }

  createTask(task: Task): Observable<Task> {

    task.completed = false;
    console.log(task);

    return this.http.post(`${environment.apiUrl}/tasks`, JSON.stringify(task), {headers: this.headers})
      .map(response => {
        return response.headers.get("Location")
      })
      .flatMap(location =>
        this.http.get(location).map(response => {
            let newTask = response.json();
            this.taskCreated.emit(newTask);
            return newTask;
          }
        ));
  }

  updateTask(task: Task): Observable<Task> {

    let description = task.description;
    let completed = task.completed;

    let updateDetails = {description, completed};
    return this.http.put(`${environment.apiUrl}/tasks/${task.id}`, JSON.stringify(updateDetails), {headers: this.headers})
      .flatMap(() => {
        this.taskUpdated.emit(task);
        return Observable.of(task)
      });
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete(`${environment.apiUrl}/tasks/${task.id}`)
      .flatMap(() => {
        this.taskDeleted.emit(task);
        return Observable.of(task)
      });
  }
}
