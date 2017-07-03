import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { ILink } from '../models/index';
import { ErrorService } from './error.service';

@Injectable()
export class LinksService {

    private serverUrl = environment.apiEndpoint;
    constructor(private http: Http, private router: Router, private errorService: ErrorService) {}

    getLinkByUrl(url: string): Observable<ILink> {
        const params = new URLSearchParams();
        params.set('url', url);

        const request = this.http.get(this.serverUrl + '/links', { search: params });
        return request.map((response: Response) => {
            const links: ILink[] = [];
            response.json().forEach(element => {
                links.push(this.convertToLink(element));
            });

            return links[0];
        });

       // return null;
    }

    getLinks(params?: URLSearchParams): Observable<ILink[]> {
       // const request = this.http.get(this.serverUrl + '/links', { search: params });
       const request = this.http.get(this.serverUrl + '/links', { search: params });

        return request.map((response: Response) => {
            const links: ILink[] = [];
            response.json().forEach(element => {
                links.push(this.convertToLink(element));
            });

            return links;
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

    private convertToLink(linkObj: any): ILink {
        const link: ILink = {
            id: linkObj.id,
            title: linkObj.title,
            linktitle: linkObj.linkTitle,
            url: linkObj.url,
            banner: linkObj.banner,
            author: linkObj.author,
            categories: linkObj.categories,
            tags: linkObj.tags
        };

        return link;
    }
}
