import { Component, OnInit } from '@angular/core';
import {
  PoBreadcrumb,
  PoBreadcrumbItem,
  PoI18nService,
} from '@po-ui/ng-components';
import { AuthService } from '../guard/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  breadcrumb: PoBreadcrumb = { items: [] };
  breadcrumbItem!: PoBreadcrumbItem;
  userName: any;
  literals: any;

  constructor(
    private authService: AuthService,
    private poI18nService: PoI18nService
  ) {
    poI18nService
      .getLiterals()
      .subscribe((literals) => (this.literals = literals));
  }

  ngOnInit(): void {
    this.authService.getLoggedUser.subscribe(
      (response: any) => (this.userName = response.name)
    );
    this.setBreadcrumb();
  }

  openExternalLink(url: any) {
    window.open(url, '_blank');
  }

  private setBreadcrumb(): void {
    this.breadcrumbItem = { label: this.literals?.home, link: undefined };
    this.breadcrumb.items.push(this.breadcrumbItem);
  }
}
