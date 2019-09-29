import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[valueFormat]'
})
export class ValueFormatDirective {
    private specialKeys: Array<string> = [
        'Backspace',
        'Tab',
        'End',
        'Home',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'Ctrl',
        'F11',
        'F12',
        'Shift',
        'Insert'
    ];

    @Input('valueFormat') regFormat: string;

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (this.specialKeys.indexOf(event.key) !== -1 || event.ctrlKey) {
            return;
        }

        if (this.isInvalid(event.key)) {
            event.preventDefault();
        }
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
        const paste = event.clipboardData.getData('text');

        if (this.isInvalid(paste)) {
            event.preventDefault();
        }
    }

    constructor(private el: ElementRef) {}

    private isInvalid(newValue: string): boolean {
        if (this.regFormat) {
            let next = '';
            const startPosition = this.el.nativeElement.selectionStart;
            const endPosition = this.el.nativeElement.selectionEnd;
            const current: string = this.el.nativeElement.value.replace(' ', '');

            if (current.length) {
                next = [current.slice(0, startPosition), newValue, current.slice(endPosition)].join('');
            } else {
                next = current.concat(newValue);
            }

            const val = String(next).match(new RegExp(this.regFormat)) ? String(next).match(new RegExp(this.regFormat))[0] : undefined;
            return next !== val;
        }

        return false;
    }
}
