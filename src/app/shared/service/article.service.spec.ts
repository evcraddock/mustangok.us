import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Http, Response, URLSearchParams, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';
import { ArticleService, ErrorService } from './index';
import { IArticle } from '../models/index';

describe('ArticleService', () => {
    let mockHttp;
    let mockRouter;
    let service: ArticleService;
    let mockErrorService: ErrorService;

    const testArticles: IArticle[] = [
        {
            id: 'testid',
            banner: 'someimage.png',
            author: 'Me Myself',
            title: 'Some title',
            content: '# Markdown content',
            url: 'permalink-url',
            categories: [ 'cat1' ],
            tags: ['tag1', 'tag2', 'tag3'],
            dataSource: 'somekindof.md',
            publishDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'testid2',
            banner: 'someimage2.png',
            author: 'Me Myself',
            title: 'Some title 2',
            content: '# Markdown content',
            url: 'permalink-url2',
            categories: [ 'cat2' ],
            tags: ['tag1', 'tag3'],
            dataSource: 'somekindof2.md',
            publishDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['get']);
    mockRouter = jasmine.createSpyObj('route', ['stuff']);
    mockErrorService = new ErrorService();
    service = new ArticleService(mockHttp, mockRouter, mockErrorService);
  });

  describe('getArticles', () => {

        it('should call the rest service get links endpoint', () => {
            mockHttp.get.and.returnValue(Observable.of(false));
            service.getArticles();

            const expectedendpoint = environment.apiEndpoint + '/articles';
            const expectedParams = Object({ search: undefined });

            expect(mockHttp.get).toHaveBeenCalledWith(expectedendpoint, expectedParams);
        });

        it ('should return an array of articles', () => {
            const mockResponse: Response = new Response(new ResponseOptions({
                body: testArticles,
                status: 200
            }));

            mockHttp.get.and.returnValue(Observable.of(mockResponse));
            const params: URLSearchParams = new URLSearchParams();

            service.getArticles(params).subscribe(articles => {
                expect(articles.length).toBe(2);
            });
        });

        it ('should return an article', () => {
            const mockResponse: Response = new Response(new ResponseOptions({
                body: testArticles[0],
                status: 200
            }));

            mockHttp.get.and.returnValue(Observable.of(mockResponse));
            const params: URLSearchParams = new URLSearchParams();

            service.getArticle('testid').subscribe(article => {
                expect(article.url).toBe('permalink-url');
            });
        });
    });
});
