import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { Chapter } from '../../abstractions/chapter';
import { PageComponent } from '../page/page.component';
import { Page } from '../../abstractions/page';

@Component({
    selector: 'bge-chapter',
    templateUrl: './chapter.component.html',
    styleUrls: ['./chapter.component.scss']
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
