import { ElementRef } from '@angular/core';

import { ValueFormatDirective } from './value-format.directive';

describe('ValueFormatDirective', () => {
    it('should create an instance', () => {
        const directive = new ValueFormatDirective(new ElementRef('<input>'));
        expect(directive).toBeTruthy();
    });
});
