import { Component, OnInit } from '@angular/core';
import { Book } from '../../abstractions/book';
import { Chapter } from '../../abstractions/chapter';
import { Page } from '../../abstractions/page';
import { BookComponent } from '../book/book.component'; 

@Component({
    selector: 'bge-author-app',
    template: `
        <div class="_content">
            <bge-book [book]="book"></bge-book>
        </div>
    `,
    styles: [`
    :host {
        display: block;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background-color: #E5E5E5;
    }

    ._content {
        width: 650px;
        margin: 0 auto;
        padding: 1rem 0;
        background-color: transparent;
    }
    
    `]
})
export class AppComponent implements OnInit {
    protected book: Book;

    public ngOnInit(): void {
        this.book = new Book();
    }
}