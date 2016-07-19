import { Page } from './page';

export class Chapter {
    private pages: Page[] = [];
    private index: number;

    constructor() {
        this.addPage(); // Start with one page
    }

    public addPage(): void {
        let nextIndex = this.pages.length + 1;
        let page = new Page();
        page.index = nextIndex;
        this.pages.push(page);
    }

    public setIndex(index: number): void {
        this.index = index;
    }

    public getIndex(): number {
        return this.index;
    }

    public getNumberOfPages(): number {
        return this.pages.length;
    }

    public getPages(): Page[] {
        return this.pages;
    }
}