import { Chapter } from './chapter';
import { Page } from './page';

export class Book {
    private title: string = 'Your Book Title';
    private author: string = 'Your Name';
    private chapters: Chapter[] = [];

    constructor() {
        this.addChapter();
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getTitle(): string {
        return this.title;
    }

    public setAuthor(author: string): void {
        this.author = author;
    }

    public addChapter(): void {
        let nextIndex = this.chapters.length + 1;
        let chapter = new Chapter();
        chapter.setIndex(nextIndex);
        this.chapters.push(chapter);
    }

    public serialise(): string {
        return JSON.stringify({
            title: this.title,
            author: this.author,
            chapters: this.chapters.map((c: Chapter) => ({
                pages: c.getPages().map((p: Page) => p.content)
            }))
        });
    }
}