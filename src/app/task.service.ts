import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) {
  }

  readonly TASK_SERVICE_BASE_URL = 'http://murmuring-beyond-10794.herokuapp.com/task';
  readonly TASK_SERVICE_CREATE_URL = this.TASK_SERVICE_BASE_URL;
  readonly TASK_SERVICE_GET_BY_ID_URL = (id) => `${this.TASK_SERVICE_BASE_URL}/${id}`;

  getTaskById(id: string) {
    console.log(`Fetching task by id ${id}`);
    return this.httpClient.get<Task>(this.TASK_SERVICE_GET_BY_ID_URL(id));
  }

  createTask() {
    console.log('Creating new task');
    return this.httpClient.post(this.TASK_SERVICE_CREATE_URL, null);
  }
}

export class Task {

  public id: string;
  public status: TaskStatus;
  public timestamp: string;
}

enum TaskStatus {
  CREATED = 0,
  RUNNING = 1,
  FINISHED = 2
}

