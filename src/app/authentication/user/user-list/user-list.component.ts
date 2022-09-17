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
  PoPageDynamicTableCustomTableAction,
  PoPageDynamicTableFilters,
} from '@po-ui/ng-templates';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @ViewChild(PoPageDynamicTableComponent, { static: true })
  dynamicTable!: PoPageDynamicTableComponent;

  readonly actions: PoPageDynamicTableActions = {
    detail: '/authentication/user/detail/:id',
    duplicate: '/authentication/user/new',
    edit: '/authentication/user/edit/:id',
    new: '/authentication/user/new',
    remove: true,
    removeAll: true,
  };

  fields!: Array<PoPageDynamicTableFilters>;
  breadcrumb: PoBreadcrumb = { items: [] };
  breadcrumbItem!: PoBreadcrumbItem;
  pageCustomActions!: Array<PoPageDynamicTableCustomAction>;
  tableCustomActions!: Array<PoPageDynamicTableCustomTableAction>;
  apiService!: string;
  literals: any;
  title!: string;

  constructor(
    private userService: UserService,
    private poI18nService: PoI18nService
  ) {
    this.poI18nService
      .getLiterals()
      .subscribe((literals) => (this.literals = literals));
  }

  ngOnInit(): void {
    this.apiService = this.userService.getEndpoint();
    this.pageCustomActions = [
      {
        label: this.literals.refresh,
        action: this.updateTable.bind(this),
        icon: 'po-icon-refresh',
      },
    ];
    this.title = this.literals.userList;
    this.setBreadcrumb();
    this.setFields();
  }

  private setBreadcrumb(): void {
    this.breadcrumbItem = { label: this.literals.home, link: '/' };
    this.breadcrumb.items.push(this.breadcrumbItem);
    this.breadcrumbItem = { label: this.literals.user };
    this.breadcrumb.items.push(this.breadcrumbItem);
  }

  private setFields(): void {
    this.fields = [
      { property: 'id', key: true, visible: false },
      {
        property: 'firstName',
        label: this.literals.firstName,
        duplicate: true,
      },
      { property: 'lastName', label: this.literals.lastName, duplicate: true },
      { property: 'email', label: this.literals.email, duplicate: true },
      {
        property: 'isActive',
        label: this.literals.active,
        type:
          this.poI18nService.getShortLanguage() == 'pt' ? 'boolean' : undefined, // ajusta bug
        duplicate: true,
      },
    ];
  }

  private updateTable() {
    this.dynamicTable.updateDataTable();
  }
}
