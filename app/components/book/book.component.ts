import { Component, Input } from '@angular/core';
import { Book } from '../../abstractions/book';
import { ChapterComponent } from '../chapter/chapter.component';

@Component({
    selector: 'bge-book',
    template: `
    <div class="_cover page" (click)="changeCoverColour($event)" [style.background-color]="coverColour">
        <textarea class="_title" type="text" [(ngModel)]="book.title" (click)="$event.stopPropagation()"></textarea>
        <textarea class="_author" type="text" [(ngModel)]="book.author" (click)="$event.stopPropagation()"></textarea>
    </div>
    <div class="_chapters">
        <bge-chapter *ngFor="let chapter of book.chapters" [chapter]="chapter"></bge-chapter>
    </div>
    <button class="_button _add" title="Add chapter" (click)="addChapter($event)">
        <i class="material-icons">add</i>
    </button>
    <button class="_button _download" title="Download" (click)="download($event)">
        <i class="material-icons">file_download</i>
    </button>
    `,
    styles: [`
        ._button {
            z-index: 1;
            transition: 0.4s ease all;
            margin: 2rem;
            cursor: pointer;
            border-radius: 50%;
            width: 56px;
            height: 56px;
            padding: 0;
            border: none;
            background-color: #eee;
            color: #888;
            box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
        }

        ._button:hover {
            background-color: #fff;
            color: #222;
        }

        ._add {
            position: absolute;
            bottom: 5rem;
            right: 0;
        }

        ._download {
            position: absolute;
            bottom: 0;
            right: 0;
        }

        ._title, ._author {
            font-family: 'Alfa Slab One', cursive;
            width: calc(100% - 4rem);
            margin: 2rem;
            background-color: transparent;
            border: 2px dashed transparent;
            border-radius: 4px;
            padding: 0.5rem;
            outline: none;
            transition: 0.5s ease border;
            resize: none;
            position: absolute;
            text-align: center;
        }

        ._title:hover, ._author:hover {
            border: 2px dashed #DDD;
        }

        ._title {
            font-size: 4rem;
            top: 0;
        }

        ._author {
            font-size: 2rem;
            bottom: 0;
        }
    `],
    directives: [ChapterComponent]
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
        (<any>a).download = this.book.getTitle() + '.book';
        a.click();
    }

    protected changeCoverColour(): void {
        let currentIndex = this.coverColourChoices.indexOf(this.coverColour);
        this.coverColour = this.coverColourChoices[(currentIndex + 1) % this.coverColourChoices.length];
    }
}
