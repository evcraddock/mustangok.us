import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IArticle } from '../models/index';
import { ArticleService } from '../service/';

@Injectable()
export class ArticlesResolver implements Resolve<any> {
    constructor(private articleService: ArticleService) {}

    resolve(route: ActivatedRouteSnapshot) {
        const params = new URLSearchParams();
        if (route.params['category']) {
            params.set('categories', route.params['category']);
        }

        if (route.params['tag']) {
            params.set('tags', route.params['tag']);
        }

        return this.articleService.getArticles(params)
        .catch(error => {
            // Could handle the error here?
            return Observable.of(error);
        });
    }
}
