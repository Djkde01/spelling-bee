import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  studentsList: Array<string> = JSON.parse(
    localStorage.getItem('students') || '[]'
  );

  studentsObservable = new Observable();
  constructor() {}
}
