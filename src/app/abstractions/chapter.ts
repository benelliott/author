import { Page } from './page';

export class Chapter {
    public pages: Page[] = [];
    public index: number;

    constructor() {
        this.addPage(); // Start with one page
    }

    public addPage(): void {
        let nextIndex = this.pages.length + 1;
        let page = new Page();
        page.index = nextIndex;
        this.pages.push(page);
    }

    public getNumberOfPages(): number {
        return this.pages.length;
    }
}