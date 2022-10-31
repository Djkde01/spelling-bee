import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  studentsList: Array<string> = JSON.parse(
    localStorage.getItem('students') || '[]'
  );

  studentsObservable = new BehaviorSubject(this.studentsList);

  private capitalizeString(text: string) {
    const lower = text.toLowerCase();

    return text.charAt(0).toUpperCase() + lower.slice(1);
  }

  private setValues() {
    localStorage.setItem('students', JSON.stringify(this.studentsList));
    this.studentsObservable.next(this.studentsList);
  }

  constructor() {}

  addStudent(student: string) {
    this.studentsList.push(this.capitalizeString(student));
    this.setValues();
  }

  removeStudent(student: string) {
    const index = this.studentsList.indexOf(this.capitalizeString(student));

    if (index > -1) {
      this.studentsList.splice(index, 1);
      this.setValues();
    }
  }
}
