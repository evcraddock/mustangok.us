import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ILink } from '../models/index';
import { LinksService } from '../service';

@Injectable()
export class LinksResolver implements Resolve<any> {
    constructor(private linkService: LinksService) {}

    resolve(route: ActivatedRouteSnapshot) {

        const params = new URLSearchParams();
        if (route.params['category']) {
            params.set('categories', route.params['category']);
        }

        if (route.params['tag']) {
            params.set('tags', route.params['tag']);
        }

        return this.linkService.getLinks(params)
        .catch(error => {
            // Could handle the error here?
            return Observable.of(error);
        });
    }
}
