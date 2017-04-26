import { Component, Input } from '@angular/core';
import { Book } from '../../abstractions/book';
import { ChapterComponent } from '../chapter/chapter.component';

@Component({
    selector: 'bge-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})
export class BookComponent {
    @Input() protected book: Book;
    protected coverColourChoices: string[] = ['#56a0a0', '#a05656', '#62a056', '#847bb9'];
    protected coverColour: string = this.coverColourChoices[0];

    protected addChapter(): void {
        this.book.addChapter();
    }

    protected download(): void {
        let json = this.book.serialise();
        let a = document.createElement('a');
        let blob = new Blob([json], {'type':'application/json'});
        a.href = window.URL.createObjectURL(blob);
        (<any>a).download = this.book.title + '.book';
        a.click();
    }

    protected changeCoverColour(): void {
        let currentIndex = this.coverColourChoices.indexOf(this.coverColour);
        this.coverColour = this.coverColourChoices[(currentIndex + 1) % this.coverColourChoices.length];
    }
}
