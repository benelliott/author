import { Chapter } from './chapter';
import { Page } from './page';

export class Book {
    public static updateFromPayload(book: Book, payloadString: string): void {
        let payload = JSON.parse(payloadString);
        book.title = payload.title;
        book.author = payload.author;
        payload.chapters.forEach(c => {
            let chapter = new Chapter();
            c.pages.forEach((p: Page, j: number) => {
                let page = new Page();
                page.content = p.content;
                page.index = j + 1;
                chapter.pages.push(page);
            });
            book.chapters.push(chapter);
        });
    }

    public title: string = 'Your Book Title';
    public author: string = 'Your Name';
    public chapters: Chapter[] = [];

    constructor() {
        this.addChapter();
    }

    public addChapter(): void {
        let nextIndex = this.chapters.length + 1;
        let chapter = new Chapter();
        chapter.index = nextIndex;
        this.chapters.push(chapter);
    }

    public serialise(): string {
        return JSON.stringify({
            title: this.title,
            author: this.author,
            chapters: this.chapters.map((c: Chapter) => ({
                pages: c.pages.map((p: Page) => p.content)
            }))
        });
    }
}