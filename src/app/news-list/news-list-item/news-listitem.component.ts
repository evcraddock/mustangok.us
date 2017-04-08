import { Component, Input } from '@angular/core';
import { IArticle } from '../../shared/models/index';

@Component({
    selector: 'news-listitem',
    templateUrl: './news-listitem.component.html'
})
export class NewsListItemComponent {
    @Input() article: IArticle;
}
