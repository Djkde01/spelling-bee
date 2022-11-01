import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WordsService } from 'src/app/service/words.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar: MatSnackBar
  ) {}

  removeWord(word: string) {
    this.wordsService.removeWord(word);
    this.openNotification(word);
  }

  openNotification(word: string) {
    let snackBarRef = this._snackBar.open(`Word "${word}" removed`, 'Undo', {
      duration: 3000,
    });
    snackBarRef.onAction().subscribe(() => {
      this.wordsService.addWord(word);
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
