import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Http, Response, URLSearchParams, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ArticlesResolver } from './articles-resolver.service';
import { ArticleService, ErrorService } from '../service/index';

describe('ArticlesResolver', () => {
    let mockHttp;
    let mockRouter;
    let service: ArticlesResolver;
    let mockArticleService: ArticleService;
    let mockErrorService: ErrorService;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['get']);
        mockRouter = jasmine.createSpyObj('route', ['stuff']);
        mockErrorService = new ErrorService();
        mockArticleService = new ArticleService(mockHttp, mockRouter, mockErrorService);
        service = new ArticlesResolver(mockArticleService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });
});
