import { Pipe, PipeTransform, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, Data } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { IArticle } from '../shared/models/index';
import { NewsDetailComponent } from './news-detail.component';
import { MarkdownToHtmlPipe } from '../shared/pipes/markdown-to-html/markdown-to-html.pipe';

export class MockActivatedRoute {
    snapshot: ActivatedRouteSnapshot;
    data: Observable<Data>;
    toString(): string {
        return '';
    };
}

@Pipe({name: 'MarkdownToHtml'})
export class MockPipeMarked implements PipeTransform {
    transform(markdown: string, options?: MarkedOptions): string {
        return '';
    }
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
    }
];

describe('NewsDetailComponent', () => {
  let component: NewsDetailComponent;
  let fixture: ComponentFixture<NewsDetailComponent>;
  const mockroute: MockActivatedRoute = new MockActivatedRoute();

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        NewsDetailComponent,
        MockPipeMarked
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockroute }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockroute.snapshot = new ActivatedRouteSnapshot();
    mockroute.snapshot.params = Observable.of({'url': 'fakeid'});

    const data: Data = {};
    data['article'] = testArticles;

    mockroute.data = Observable.of(data);

    fixture = TestBed.createComponent(NewsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load an article', () => {
    component.loadData();
    expect(component.article.title).toBe('Some title');
  });
});
