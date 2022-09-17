import { Component, OnInit } from '@angular/core';
import {
  PoBreadcrumb,
  PoBreadcrumbItem,
  PoI18nService,
} from '@po-ui/ng-components';

import {
  PoPageDynamicDetailActions,
  PoPageDynamicDetailField,
} from '@po-ui/ng-templates';
import { CityService } from '../city.service';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css'],
})
export class CityDetailComponent implements OnInit {
  readonly actions: PoPageDynamicDetailActions = {
    back: '/registration/city',
    edit: '/registration/city/edit/:id',
    remove: '/registration/city',
  };

  fields!: Array<PoPageDynamicDetailField>;
  breadcrumb: PoBreadcrumb = { items: [] };
  breadcrumbItem!: PoBreadcrumbItem;
  apiService!: string;
  literals: any;
  title!: string;

  constructor(
    private cityService: CityService,
    private poI18nService: PoI18nService
  ) {
    this.poI18nService
      .getLiterals()
      .subscribe((literals) => (this.literals = literals));
  }

  ngOnInit() {
    //this.apiService = `${this.cityService.getEndpoint()}?_expand=state`;
    this.apiService = this.cityService.getEndpoint();
    this.title = this.literals.cityDetail;
    this.setBreadcrumb();
    this.setFields();
  }

  private setBreadcrumb(): void {
    this.breadcrumbItem = { label: this.literals.home, link: '/' };
    this.breadcrumb.items.push(this.breadcrumbItem);
    this.breadcrumbItem = {
      label: this.literals.city,
      link: '/registration/city',
    };
    this.breadcrumb.items.push(this.breadcrumbItem);
    this.breadcrumbItem = { label: this.literals.detail };
    this.breadcrumb.items.push(this.breadcrumbItem);
  }

  private setFields(): void {
    this.fields = [
      { property: 'id', key: true, visible: false },
      { property: 'city', label: this.literals.city },
      { property: 'stateId', label: this.literals.state },
    ];
  }
}
