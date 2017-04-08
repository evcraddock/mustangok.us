import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Http, Response, URLSearchParams, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';
import { LinksService, ErrorService } from './index';
import { ILink } from '../models/index';

describe('LinksService', () => {
    let mockHttp;
    let mockRouter;
    let service: LinksService;
    let mockErrorService: ErrorService;

    const testLinks: ILink[] = [
        {
            id: 'fakeid',
            banner: '',
            title: 'testing title',
            linktitle: 'link title',
            url: 'url-isnt-useful',
            author: 'Me Myself',
            categories: [ 'cat1', 'cat2', 'cat3' ],
            tags: [ 'tag1', 'tag2', 'tag3' ]
        },
        {
            id: 'fakeid2',
            banner: '',
            title: 'testing title 2',
            linktitle: 'link title 2',
            url: 'url-isnt-useful-still',
            author: 'Me Myself',
            categories: [ 'cat1', 'cat2' ],
            tags: [ 'tag1', 'tag3' ]
        }
    ];

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['get']);
    mockRouter = jasmine.createSpyObj('route', ['stuff']);
    mockErrorService = new ErrorService();
    service = new LinksService(mockHttp, mockRouter, mockErrorService);
  });

  describe('getLinks', () => {

        it('should call the rest service get links endpoint', () => {
            mockHttp.get.and.returnValue(Observable.of(false));
            service.getLinks();

            const expectedendpoint = environment.apiEndpoint + '/links';
            const expectedParams = Object({ search: undefined });

            expect(mockHttp.get).toHaveBeenCalledWith(expectedendpoint, expectedParams);
        });

        it ('should return an array of links', () => {
            const mockResponse: Response = new Response(new ResponseOptions({
                body: testLinks,
                status: 200
            }));

            mockHttp.get.and.returnValue(Observable.of(mockResponse));
            const params: URLSearchParams = new URLSearchParams();

            service.getLinks(params).subscribe(links => {
                expect(links.length).toBe(2);
            });
        });
    });
});
