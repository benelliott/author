import { Component, OnInit } from '@angular/core';
import { Book } from '../../abstractions/book';
import { Chapter } from '../../abstractions/chapter';
import { Page } from '../../abstractions/page';
import { BookComponent } from '../book/book.component'; 

@Component({
    selector: 'bge-author-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    protected book: Book;

    public ngOnInit(): void {
        this.book = new Book();
    }
}