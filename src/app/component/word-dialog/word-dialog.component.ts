import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

interface dataModel {
  word: string;
}
@Component({
  selector: 'app-word-dialog',
  templateUrl: './word-dialog.component.html',
  styleUrls: ['./word-dialog.component.sass'],
})
export class WordDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataModel
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
