import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { IArticle, ILink } from '../shared/models/index';

@Component({
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.less']
})
export class NewsListComponent implements OnInit {
  public articles: IArticle[] = [];
  public pagedArticles: IArticle[];
  public links: ILink[] = [];
  public messages: string[] = [];
  public pagesize = 5;
  public page = 1;
  private linkPath = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadData();
    // const snapshot = this.route.snapshot;
    // this.linkPath = snapshot.url[0].path;
    this.linkPath = window.location.pathname;
  }

  hasMessages() {
    return this.messages.length > 0;
  }

  hasArticles() {
    return this.articles.length > 0;
  }

  hasLinks() {
    return this.links.length > 0;
  }

  loadData() {
    // this.route.params.subscribe(param => {
    //   this.category = param['category'];
    // });

    if (this.route.data) {
      this.route.data.subscribe(data => {
        this.loadArticles(data['articles']);
        this.loadLinks(data['links']);
        this.changePage();
      });
    }
  }

  loadLinks(linkData: ILink[]) {
    if (linkData instanceof Array && linkData.length > 0) {
      this.links = linkData;
    }
  }

  loadArticles(articleData: IArticle[]) {
    let msg = 'Could not find any articles';
    if (articleData instanceof Array && articleData.length > 0) {
      this.articles = articleData;
      msg = '';
    }

    if (msg.length > 0) {
      this.messages.push(msg);
    }
  }

  changePage() {
    const startIndex = this.page === 1 ? 0 : (this.page - 1) * this.pagesize;
    const endIndex = startIndex + this.pagesize;

    this.pagedArticles = this.articles.slice(startIndex, endIndex);
  }
}
