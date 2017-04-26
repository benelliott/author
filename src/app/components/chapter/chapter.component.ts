import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { Chapter } from '../../abstractions/chapter';
import { PageComponent } from '../page/page.component';
import { Page } from '../../abstractions/page';

@Component({
    selector: 'bge-chapter',
    template: `
    <div class="_page _chapter-start page"><span class="_chapter-number">{{chapter.index}}</span></div>
    <bge-page class="_page" *ngFor="let page of chapter.pages" [page]="page" (onPageEnd)="onPageEnd($event)"></bge-page>
    `,
    styles: [`
    :host {
        display: block;
    }

    ._page {
        margin-top: 1rem;
    }

    ._chapter-start {
        background-color: #fff;
        text-align: right;
        padding: 2rem;
    }

    ._chapter-number {
        font-size: 12rem;
    }
    `]
})
export class ChapterComponent {
    @Input() protected chapter: Chapter;
    @ViewChildren(PageComponent) private pages: QueryList<PageComponent>;

    protected onPageEnd(page: Page): void {
        if (page.index === this.chapter.getNumberOfPages()) {
            this.chapter.addPage();
            window.setTimeout(() => this.focusPage(page.index + 1));
        }
    }

    private focusPage(pageIndex: number): void {
        let elementIndex = pageIndex - 1;
        this.pages.toArray()[elementIndex].focusInput();
    }
}
