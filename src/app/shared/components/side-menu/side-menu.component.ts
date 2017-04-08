import { Component, OnInit, Input } from '@angular/core';
import { ILink } from '../../models/index';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.less']
})
export class SideMenuComponent {
  @Input() links: ILink[] = [];

  public hasLinks() {
    return this.links.length > 0;
  }
}
