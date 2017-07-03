import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ILink } from '../models/index';
import { LinksService } from '../service';

@Injectable()
export class LinksResolver implements Resolve<any> {
    constructor(private linksService: LinksService) {}

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

            return this.linksService.getLinks(params);
        })
        .catch(error => {
            // Could handle the error here?
            return Observable.of(error);
        });
    }
}
