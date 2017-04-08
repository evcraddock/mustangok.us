import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { IArticle } from '../models/index';
import { ErrorService } from './error.service';

@Injectable()
export class ArticleService {

    // TODO: Move to configuration file
    private serverUrl = environment.apiEndpoint;
    constructor(private http: Http, private router: Router, private errorService: ErrorService) {}

    getArticle(id: string): Observable<IArticle> {

        return this.http.get(this.serverUrl + '/articles/' + id).map((response: Response) => {
            return this.convertToArticle(response.json());
        })
        .catch(this.handleArticleError);
    }

    getArticles(params?: URLSearchParams): Observable<IArticle[]> {
        const url = this.serverUrl + '/articles';
        const request = this.http.get(url, { search: params });

        return request.map((response: Response) => {
            const articles: IArticle[] = [];
            response.json().forEach(element => {
                articles.push(this.convertToArticle(element));
            });

            return articles;
        })
        .catch((error: Response) => {
            let msg = '';
            if (error.status === 404) {
                msg = 'Not able to connect to the article server, try again later';
            } else {
                msg = error.statusText + ' - An unexpected error happened. Check the logs';
            }

            this.errorService.updateMessage(msg);
            return Promise.reject(error);
        });
    }

    private handleArticleError(error: Response) {
        let msg = '';
        if (error.status === 404) {
            msg = 'Not able to connect to the article server, try again later';
        } else {
            msg = error.statusText + ' - An unexpected error happened. Check the logs';
        }

        this.errorService.updateMessage(msg);
        return Promise.reject(error);
    };

    private convertToArticle(articleObj: any): IArticle {
        const article: IArticle = {
            id: articleObj.id,
            title: articleObj.title,
            url: articleObj.url,
            content: articleObj.content,
            publishDate: articleObj.publishDate,
            createdAt: articleObj.createdAt,
            updatedAt: articleObj.updatedAt,
            dataSource: articleObj.dataSource,
            banner: articleObj.banner,
            author: articleObj.author,
            categories: articleObj.categories,
            tags: articleObj.tags
        };

        return article;
    }
}
