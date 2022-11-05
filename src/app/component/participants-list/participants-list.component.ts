import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { StudentsService } from 'src/app/service/students.service';
import { WordDialogComponent } from '../word-dialog/word-dialog.component';

@Component({
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.sass'],
})
export class ParticipantsListComponent implements OnInit {
  participants = new MatTableDataSource<string>(['']);

  columnsToDisplay = ['Participant Name', 'Action'];

  constructor(
    private participantService: StudentsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  removeParticipant(name: string) {
    this.participantService.removeStudent(name);
    this.openNotification(name, 'removed');
  }

  openNotification(name: string, action: string) {
    let snackBarRef = this._snackBar.open(
      `Participant "${name}" ${action}`,
      'Undo',
      {
        duration: 3000,
      }
    );
    snackBarRef.onAction().subscribe(() => {
      action === 'removed'
        ? this.participantService.addStudent(name)
        : this.participantService.removeStudent(name);
    });
  }

  openNewStudentDialog(): void {
    let newStudent: string = '';

    const dialogRef = this.dialog.open(WordDialogComponent, {
      width: '250px',
      data: { entry: newStudent },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.participantService.addStudent(result);
      this.openNotification(result, 'added');
    });
  }

  ngOnInit(): void {
    this.participantService.studentsObservable.subscribe({
      next: (v) => {
        this.participants.data = v;
      },
    });
  }
}
