import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {TaskListComponent} from "./tasks/task-list/task-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TaskRegisterComponent} from "./tasks/task-register/task-register.component";
import {TaskDetailComponent} from "./tasks/task-detail/task-detail.component";
import {TaskService} from "./tasks/task.service";
import {TaskStatusPipe} from "./tasks/task-status.pipe";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskRegisterComponent,
    TaskDetailComponent,
    TaskStatusPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
