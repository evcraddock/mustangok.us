import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Http, Response, URLSearchParams, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import {ArticleResolver } from './article-resolver.service';
import { ArticleService, ErrorService } from '../service/index';

describe('ArticleResolver', () => {
    let service: ArticleResolver;
    let mockArticleService: ArticleService;

    beforeEach(() => {
        mockArticleService = jasmine.createSpyObj('mockHttp', ['getArticles']);
        service = new ArticleResolver(mockArticleService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });
});
