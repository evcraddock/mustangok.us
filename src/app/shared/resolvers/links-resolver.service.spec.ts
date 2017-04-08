import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Http, Response, URLSearchParams, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { LinksResolver } from './links-resolver.service';
import { LinksService, ErrorService } from '../service/index';

describe('LinksResolver', () => {
    let mockHttp;
    let mockRouter;
    let service: LinksResolver;
    let mockArticleService: LinksService;
    let mockErrorService: ErrorService;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['get']);
        mockRouter = jasmine.createSpyObj('route', ['stuff']);
        mockErrorService = new ErrorService();
        mockArticleService = new LinksService(mockHttp, mockRouter, mockErrorService);
        service = new LinksResolver(mockArticleService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });
});
