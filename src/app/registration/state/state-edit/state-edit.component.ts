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
import { StateService } from '../state.service';

@Component({
  selector: 'app-state-edit',
  templateUrl: './state-edit.component.html',
  styleUrls: ['./state-edit.component.css'],
})
export class StateEditComponent implements OnInit {
  readonly actions: PoPageDynamicEditActions = {
    cancel: '/registration/state',
    save: '/registration/state',
    saveNew: '/registration/state/new',
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
    this.apiService = this.stateService.getEndpoint();

    // Carrega o registro pelo ID
    this.activatedRoute.params.subscribe((pars) => {
      this.currentId = pars['id'];

      // Se nao tiver o ID definido sera um CREATE
      if (this.currentId === undefined) {
        this.isUpdate = false;
        this.title = this.literals.addState;
      } else {
        this.isUpdate = true;
        this.title = this.literals.editState;
      }
      this.setBreadcrumb();
    });
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
    this.breadcrumbItem = { label: this.title.split(' ')[0] };
    this.breadcrumb.items.push(this.breadcrumbItem);
  }

  private setFields(): void {
    this.fields = [
      { property: 'id', key: true, visible: false },
      { property: 'state', label: this.literals.state, required: true },
      { property: 'stateName', label: this.literals.name, duplicate: true },
      {
        property: 'region',
        label: this.literals.region,
        options: this.stateService.getRegions(),
        required: true,
      },
    ];
  }
}
