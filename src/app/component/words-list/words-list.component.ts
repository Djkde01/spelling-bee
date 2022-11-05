import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WordsService } from 'src/app/service/words.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { WordDialogComponent } from '../word-dialog/word-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.sass'],
})
export class WordsListComponent implements OnInit {
  wordsList = new MatTableDataSource<string>(['']);

  columnsToDisplay = ['Word', 'Action'];

  constructor(
    private wordsService: WordsService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  removeWord(word: string) {
    this.wordsService.removeWord(word);
    this.openNotification(word, 'removed');
  }

  openNotification(word: string, action: string) {
    let snackBarRef = this._snackBar.open(`Word "${word}" ${action}`, 'Undo', {
      duration: 3000,
    });
    snackBarRef.onAction().subscribe(() => {
      action === 'removed'
        ? this.wordsService.addWord(word)
        : this.wordsService.removeWord(word);
    });
  }

  openNewWordDialog(): void {
    let newWord: string = '';

    const dialogRef = this.dialog.open(WordDialogComponent, {
      width: '250px',
      data: { entry: newWord },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.wordsService.addWord(result);
      this.openNotification(result, 'added');
    });
  }

  openDefaultWordsDialog(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
    });
  }

  ngOnInit(): void {
    this.wordsService.wordsSubject.subscribe({
      next: (v) => {
        console.log('subject value', v);
        this.wordsList.data = v;
      },
    });
  }
}
