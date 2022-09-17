import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PoBreadcrumb,
  PoBreadcrumbItem,
  PoI18nService,
} from '@po-ui/ng-components';
import {
  PoPageDynamicTableActions,
  PoPageDynamicTableComponent,
  PoPageDynamicTableCustomAction,
  PoPageDynamicTableFilters,
} from '@po-ui/ng-templates';
import { StateService } from '../state.service';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.css'],
})
export class StateListComponent implements OnInit {
  @ViewChild(PoPageDynamicTableComponent, { static: true })
  dynamicTable!: PoPageDynamicTableComponent;

  readonly actions: PoPageDynamicTableActions = {
    detail: '/registration/state/detail/:id',
    duplicate: '/registration/state/new',
    edit: '/registration/state/edit/:id',
    new: '/registration/state/new',
    remove: true,
    removeAll: true,
  };

  fields!: Array<PoPageDynamicTableFilters>;
  breadcrumb: PoBreadcrumb = { items: [] };
  breadcrumbItem!: PoBreadcrumbItem;
  pageCustomActions!: Array<PoPageDynamicTableCustomAction>;
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

  ngOnInit(): void {
    this.apiService = this.stateService.getEndpoint();
    this.pageCustomActions = [
      {
        label: this.literals.refresh,
        action: this.updateTable.bind(this),
        icon: 'po-icon-refresh',
      },
    ];
    this.title = this.literals.stateList;
    this.setBreadcrumb();
    this.setFields();
  }

  private setBreadcrumb(): void {
    this.breadcrumbItem = { label: this.literals.home, link: '/' };
    this.breadcrumb.items.push(this.breadcrumbItem);
    this.breadcrumbItem = { label: this.literals.state };
    this.breadcrumb.items.push(this.breadcrumbItem);
  }

  private setFields(): void {
    this.fields = [
      { property: 'id', key: true, visible: false },
      { property: 'state', label: this.literals.state, duplicate: true },
      { property: 'stateName', label: this.literals.name, duplicate: true },
      {
        property: 'region',
        label: this.literals.region,
        options: this.stateService.getRegions(),
        filter: true,
        duplicate: true,
      },
    ];
  }

  private updateTable() {
    this.dynamicTable.updateDataTable();
  }
}
