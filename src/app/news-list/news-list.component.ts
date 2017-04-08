import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadData();
    // this.totalpages = this.articles.length / 5;
    this.changePage();
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
    if (this.route.data) {
      this.route.data.subscribe(data => {
        this.loadArticles(data['articles']);
        this.loadLinks(data['links']);
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

  // setPage(page: number) {
  //   if (page < 1 || page > this.totalpages) {
  //       return;
  //   }
  //   this.pagedArticles = this.articles.slice((page - 1) * 5, page * 5);
  // }
}
