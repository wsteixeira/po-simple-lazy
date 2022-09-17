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
import { StateService } from '../state.service';

@Component({
  selector: 'app-state-detail',
  templateUrl: './state-detail.component.html',
  styleUrls: ['./state-detail.component.css'],
})
export class StateDetailComponent implements OnInit {
  readonly actions: PoPageDynamicDetailActions = {
    back: '/registration/state',
    edit: '/registration/state/edit/:id',
    remove: '/registration/state',
  };

  fields!: Array<PoPageDynamicDetailField>;
  breadcrumb: PoBreadcrumb = { items: [] };
  breadcrumbItem!: PoBreadcrumbItem;
  apiService!: string;
  literals: any;
  title!: string;

  constructor(
    private stateService: StateService,
    private poI18nService: PoI18nService
  ) {
    this.poI18nService
      .getLiterals()
      .subscribe((literals) => (this.literals = literals));
  }

  ngOnInit() {
    this.apiService = this.stateService.getEndpoint();
    this.title = this.literals.stateDetail;
    this.setBreadcrumb();
    this.setFields();
  }

  private setBreadcrumb(): void {
    this.breadcrumbItem = { label: this.literals.home, link: '/' };
    this.breadcrumb.items.push(this.breadcrumbItem);
    this.breadcrumbItem = {
      label: this.literals.state,
      link: '/registration/state',
    };
    this.breadcrumb.items.push(this.breadcrumbItem);
    this.breadcrumbItem = { label: this.literals.detail };
    this.breadcrumb.items.push(this.breadcrumbItem);
  }

  private setFields(): void {
    this.fields = [
      { property: 'id', key: true, visible: false },
      { property: 'state', label: this.literals.state },
      { property: 'stateName', label: this.literals.name },
      { property: 'region', label: this.literals.region },
    ];
  }
}
