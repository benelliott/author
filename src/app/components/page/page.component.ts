import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Page } from '../../abstractions/page';  

@Component({
    selector: 'bge-page',
    template: `
    <div #wrapper class="_wrapper page">
        <div #input class="_input" contenteditable="true" [textContent]="page.content" (input)="onInputChange($event)"></div>
        <span class="_page-number">{{page.index}}</span>
    </div>
    `,
    styles: [
        `
        :host {
            display: block;
        }

        ._wrapper {
            background-color: #fff;
        }

        ._input {
            width: 100%;
            min-height: 100%;
            padding: 5rem;
            font-size: 1.3rem;
            overflow: visible;
            white-space: pre-wrap;
            outline: none;
        }

        ._page-number {
            position: absolute;
            margin: 1rem;
            font-size: 0.8rem;
            bottom: 0;
            right: 0;
            z-index: 1;
        }
        
        `
    ]
})
export class PageComponent {
    @Input() protected page: Page;
    @Output() protected onPageEnd: EventEmitter<Page> = new EventEmitter<Page>();
    @ViewChild('wrapper') private wrapper: ElementRef;
    @ViewChild('input') private input: ElementRef;

    protected onInputChange(event: Event): void {
        this.page.content = (<HTMLDivElement>event.target).innerText;
        this.checkForOverflow();
    }

    private checkForOverflow(): void {
        let wrapperHeight = this.wrapper.nativeElement.clientHeight;
        let inputHeight = this.input.nativeElement.clientHeight;

        if (inputHeight > wrapperHeight) {
            this.onPageEnd.emit(this.page);
        }
    }

    public focusInput(): void {
        this.input.nativeElement.focus();
    }
}