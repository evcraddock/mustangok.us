import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MarkdownToHtmlPipe } from './shared/pipes/markdown-to-html/markdown-to-html.pipe';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsListItemComponent } from './news-list/news-list-item/news-listitem.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { appRoutes } from '../routes';
import { NewsDetailComponent } from './news-detail/news-detail.component';

import { ArticleService, ErrorService, LinksService } from './shared/service/index';
import { ArticleResolver, ArticlesResolver, LinksResolver } from './shared/resolvers';
import { SideMenuComponent } from './shared/components/side-menu/side-menu.component';
import { ErrorsBannerComponent } from './shared/components/errors-banner/errors-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    NewsListItemComponent,
    NavComponent,
    NewsDetailComponent,
    MarkdownToHtmlPipe,
    SideMenuComponent,
    ErrorsBannerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot()
  ],
  exports: [
    MarkdownToHtmlPipe
  ],
  providers: [
    ArticleService,
    ErrorService,
    LinksService,
    ArticlesResolver,
    LinksResolver,
    ArticleResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
