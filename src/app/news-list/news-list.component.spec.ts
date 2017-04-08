import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, Data } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { NewsListComponent } from './news-list.component';
import { IArticle, ILink } from '../shared/models/index';

export class MockActivatedRoute {
    snapshot: ActivatedRouteSnapshot;
    data: Observable<Data>;
    toString(): string {
        return '';
    };
}

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

describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;

  const mockroute: MockActivatedRoute = new MockActivatedRoute();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsListComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockroute }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  describe('should have data', () => {
      beforeEach(() => {
        const data: Data = {};
        data['articles'] = testArticles;
        data['links'] = testLinks;

        mockroute.data = Observable.of(data);

        mockroute.snapshot = new ActivatedRouteSnapshot();
        mockroute.snapshot.params = Observable.of({'url': 'fakeurl'});

        fixture = TestBed.createComponent(NewsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });

      it('should have articles', () => {
        component.loadData();
        expect(component.hasArticles()).toBe(true);
      });

      it('should have links', () => {
        component.loadData();
        expect(component.hasLinks()).toBe(true);
      });
    });

  describe('should not have data', () => {
    beforeEach(() => {
      const data: Data = {};
      data['articles'] = [];
      data['links'] = [];

      mockroute.data = Observable.of(data);

      mockroute.snapshot = new ActivatedRouteSnapshot();
      mockroute.snapshot.params = Observable.of({'url': 'fakeurl'});

      fixture = TestBed.createComponent(NewsListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have no articles', () => {
      component.loadData();
      expect(component.hasArticles()).toBe(false);
    });

    it('should have no links', () => {
      component.loadData();
      expect(component.hasLinks()).toBe(false);
    });

    it('should have an error message', () => {
      component.messages = [];
      component.loadData();
      expect(component.hasMessages()).toBe(true);
      expect(component.messages[0]).toBe('Could not find any articles');
    });
  });
});
