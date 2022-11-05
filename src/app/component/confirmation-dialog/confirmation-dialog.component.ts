import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { WordsService } from 'src/app/service/words.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.sass'],
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private wordsService: WordsService
  ) {}

  restoreDefaultWords(): void {
    this.wordsService.resetWordsToDefault();
  }

  ngOnInit(): void {}
}
