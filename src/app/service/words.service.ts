import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  private defaultWords: Array<string> = [
    'Mouse',
    'Rabbit',
    'Engineer',
    'Actress',
    'Bank',
    'Bakery',
    'Tall',
    'Short',
    'Apple',
    'Pear',
    'Milk',
    'Cheese',
    'Shirt',
    'Skirt',
    'Head',
    'Hair',
    'Classroom',
    'Pen',
    'Bathroom',
    'Bedroom',
    'January',
    'February',
    'Red',
    'Pink',
    'Mother',
    'Father',
    'Unscramble',
    'Write',
  ];

  wordsList: Array<string> = JSON.parse(
    localStorage.getItem('wordsList') || JSON.stringify(this.defaultWords)
  );

  wordsSubject = new BehaviorSubject(this.wordsList);

  constructor() {}

  private capitalizeString(text: string) {
    const lower = text.toLowerCase();

    return text.charAt(0).toUpperCase() + lower.slice(1);
  }

  private setValues() {
    localStorage.setItem('wordsList', JSON.stringify(this.wordsList));
    this.wordsSubject.next(this.wordsList);
  }

  addWord(word: string) {
    this.wordsList.push(this.capitalizeString(word));
    this.setValues();
  }

  removeWord(word: string) {
    const index = this.wordsList.indexOf(this.capitalizeString(word));

    if (index > -1) {
      this.wordsList.splice(index, 1);
      this.setValues();
    }
  }

  resetWordsToDefault() {
    this.wordsList = this.defaultWords;
    this.setValues();
  }
}
