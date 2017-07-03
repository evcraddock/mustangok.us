import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ILink } from '../../models/index';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.less']
})
export class SideMenuComponent implements OnInit {
  @Input() linkPath = '';
  @Input() links: ILink[] = [];

  public banner = '/assets/mustang_logo.png';
  public title = 'Latest News';

  ngOnInit(): void {
    this.load();
  }

  public hasLinks() {
    return this.links.length > 0;
  }

  private load() {
    if (this.hasLinks()) {
      const categoryLink = this.links.find(l =>
        l.url === this.linkPath
      );

      if (categoryLink && categoryLink.title !== '') {
        this.title = categoryLink.title;
      }

      if (categoryLink && categoryLink.banner !== '') {
        this.banner = categoryLink.banner;
      }
    }
  }
}
