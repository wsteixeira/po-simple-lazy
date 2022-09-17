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
import { StateService } from '../../state/state.service';
import { CityService } from '../city.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css'],
})
export class CityListComponent implements OnInit {
  @ViewChild(PoPageDynamicTableComponent, { static: true })
  dynamicTable!: PoPageDynamicTableComponent;

  readonly actions: PoPageDynamicTableActions = {
    detail: '/registration/city/detail/:id',
    duplicate: '/registration/city/new',
    edit: '/registration/city/edit/:id',
    new: '/registration/city/new',
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
    private cityService: CityService,
    private stateService: StateService,
    private poI18nService: PoI18nService
  ) {
    this.poI18nService
      .getLiterals()
      .subscribe((literals) => (this.literals = literals));
  }

  ngOnInit(): void {
    this.apiService = `${this.cityService.getEndpoint()}?_expand=state`;
    this.pageCustomActions = [
      {
        label: this.literals.refresh,
        action: this.updateTable.bind(this),
        icon: 'po-icon-refresh',
      },
    ];
    this.title = this.literals.cityList;
    this.setBreadcrumb();
    this.setFields();
  }

  private setBreadcrumb(): void {
    this.breadcrumbItem = { label: this.literals.home, link: '/' };
    this.breadcrumb.items.push(this.breadcrumbItem);
    this.breadcrumbItem = { label: this.literals.city };
    this.breadcrumb.items.push(this.breadcrumbItem);
  }

  private setFields(): void {
    this.fields = [
      { property: 'id', key: true, visible: false },
      { property: 'city', label: this.literals.city, duplicate: true },
      {
        property: 'stateId',
        label: this.literals.state,
        visible: false,
        searchService: this.stateService.getEndpoint(),
        fieldValue: 'id',
        fieldLabel: 'stateName',
        columns: [
          { property: 'state', label: this.literals.st, width: '20%' },
          { property: 'stateName', label: this.literals.name },
          { property: 'region', label: this.literals.region, width: '20%' },
        ],
        filter: true,
        duplicate: true,
      },
      { property: 'state.state', label: this.literals.st },
      { property: 'state.stateName', label: this.literals.state },
      { property: 'state.region', label: this.literals.region },
    ];
  }

  private updateTable() {
    this.dynamicTable.updateDataTable();
  }
}
