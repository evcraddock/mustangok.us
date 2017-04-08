import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArticle, ILink } from '../shared/models/index';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.less']
})
export class NewsDetailComponent implements OnInit {
  article: IArticle = <IArticle>{};
  links: ILink[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (this.route.data) {
      this.route.data.forEach(data => {
        if (data['article'] instanceof Array && data['article'].length > 0) {
          this.article = data['article'][0];
        }

        if (data['links'] instanceof Array && data['links'].length > 0) {
          this.links = data['links'];
        }
      });
    }
  }
}
