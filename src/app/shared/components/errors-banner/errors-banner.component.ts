import { Component , OnInit} from '@angular/core';

import { ErrorService } from '../../service/';

@Component({
    selector: 'error-banner',
    templateUrl: 'errors-banner.component.html'
})
export class ErrorsBannerComponent implements OnInit {

    public errorMessage = '';
    public hasErrorMessage() {
        return this.errorMessage.length > 0;
    }

    constructor(private errorService: ErrorService) {}

    ngOnInit(): void {
        this.errorService.update$.subscribe(message => {
            this.errorMessage = message;
        });
    }
}
