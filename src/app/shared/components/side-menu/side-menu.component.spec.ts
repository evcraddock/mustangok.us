import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuComponent } from './side-menu.component';
import { ILink } from '../../models/index';

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

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    component.links = testLinks;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have links', () => {
    expect(component.hasLinks()).toBe(true);
  });
});
