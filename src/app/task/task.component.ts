import {Component, OnInit} from '@angular/core';
import {Task, TaskService} from '../task.service';
import {catchError, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  createdTaskIds: string[] = [];
  createTaskInProgress = false;
  loadedTask: Task = null;
  loadTaskInProgress = false;
  errorMessage: string = null;

  constructor(private taskService: TaskService) {
  }

  loadTaskById(id: string) {
    this.errorMessage = null;
    this.loadedTask = null;

    if (id.trim().length === 0) {
      this.errorMessage = 'Please enter the task id!';
      return;
    }

    this.loadTaskInProgress = true;
    this.taskService.getTaskById(id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorMessage = `Error ${error.status}: ${error.error.error}`;
          return throwError(error);
        }),
        finalize(() => this.loadTaskInProgress = false)
      )
      .subscribe(
        (task: Task) => {
          console.log(`onSubscribe: task = ${this.loadedTask}`);
          this.loadedTask = task;
          this.loadedTask.id = id;
        });
  }

  createTask() {
    this.createTaskInProgress = true;
    this.taskService.createTask().subscribe((id) => {
      this.createdTaskIds.push(id as string);
      this.createTaskInProgress = false;
    });
  }

  ngOnInit() {
  }

}


