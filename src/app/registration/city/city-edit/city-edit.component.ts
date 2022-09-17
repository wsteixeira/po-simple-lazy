import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  PoBreadcrumb,
  PoBreadcrumbItem,
  PoI18nService,
} from '@po-ui/ng-components';

import {
  PoPageDynamicEditActions,
  PoPageDynamicEditField,
} from '@po-ui/ng-templates';
import { StateService } from '../../state/state.service';
import { CityService } from '../city.service';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.css'],
})
export class CityEditComponent implements OnInit {
  readonly actions: PoPageDynamicEditActions = {
    cancel: '/registration/city',
    save: '/registration/city',
    saveNew: '/registration/city/new',
  };

  fields!: Array<PoPageDynamicEditField>;
  breadcrumb: PoBreadcrumb = { items: [] };
  breadcrumbItem!: PoBreadcrumbItem;
  apiService!: string;
  title!: string;
  currentId: any;
  isUpdate = false;
  literals: any;

  constructor(
    private cityService: CityService,
    private stateService: StateService,
    private activatedRoute: ActivatedRoute,
    private poI18nService: PoI18nService
  ) {
    this.poI18nService
      .getLiterals()
      .subscribe((literals) => (this.literals = literals));
  }

  ngOnInit() {
    this.isUpdate = false;
    this.apiService = this.cityService.getEndpoint();

    // Carrega o registro pelo ID
    this.activatedRoute.params.subscribe((pars) => {
      this.currentId = pars['id'];

      // Se nao tiver o ID definido sera um CREATE
      if (this.currentId === undefined) {
        this.isUpdate = false;
        this.title = this.literals.addCity;
      } else {
        this.isUpdate = true;
        this.title = this.literals.editCity;
      }
      this.setBreadcrumb();
    });
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
    this.breadcrumbItem = { label: this.title.split(' ')[0] };
    this.breadcrumb.items.push(this.breadcrumbItem);
  }

  private setFields(): void {
    this.fields = [
      { property: 'id', key: true, visible: false },
      { property: 'city', label: this.literals.city, required: true },
      {
        property: 'stateId',
        label: this.literals.state,
        searchService: this.stateService.getEndpoint(),
        fieldValue: 'id',
        fieldLabel: 'stateName',
        columns: [
          { property: 'state', label: this.literals.st, width: '20%' },
          { property: 'stateName', label: this.literals.name },
          { property: 'region', label: this.literals.region, width: '20%' },
        ],
        required: true,
      },
    ];
  }
}
