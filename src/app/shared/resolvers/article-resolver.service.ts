import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IArticle } from '../models/index';
import { ArticleService } from '../service/';

@Injectable()
export class ArticleResolver implements Resolve<any> {
    constructor(private articleService: ArticleService) {}

    resolve(route: ActivatedRouteSnapshot) {
        if (route.params['id']) {
            const articleId = route.params['id'];
            return this.articleService.getArticle(articleId)
            .catch(error => {
                return Observable.of(error);
            });
        }

        const params = new URLSearchParams();
        if (route.params['permalink']) {
            params.set('url', route.params['permalink']);
        }

        return this.articleService.getArticles(params)
        .catch(error => {
            return Observable.of(error);
        });
    }
}
