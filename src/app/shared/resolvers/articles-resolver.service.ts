import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { IArticle, ILink } from '../models/index';
import { ArticleService, LinksService } from '../service/';

@Injectable()
export class ArticlesResolver implements Resolve<any> {
    constructor(private articleService: ArticleService, private linksService: LinksService) {}

    resolve(route: ActivatedRouteSnapshot) {
        const links = this.linksService.getLinkByUrl(window.location.pathname);

        return links.flatMap(l => {
            const params = new URLSearchParams();

            if (l && l.categories) {
                for (const cat of l.categories) {
                    params.append('categories', cat);
                }
            }

            if (l && l.tags) {
                for (const tag of l.tags) {
                    params.append('tags', tag);
                }
            }

            return this.articleService.getArticles(params);
        })
        .catch(error => {
            // Could handle the error here?
            return Observable.of(error);
        });
    }
}
