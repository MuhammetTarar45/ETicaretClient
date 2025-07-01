import { Component, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerNameType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyMessageType, AlertifyService } from '../../../../services/admin/alertify.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { List_Role } from '../../../../contracts/roles/list_role';
import { RoleService } from '../../../../services/common/models/role.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent {
  constructor(private roleService: RoleService,
    spinnerService: NgxSpinnerService,
    private alertify: AlertifyService,
    private dialogService: DialogService
  ) {
    super(spinnerService)
  }
  displayedColumns: string[] = ['name', 'edit', 'delete'];

  dataSource: MatTableDataSource<List_Role> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getRoles();
  }
  async pageChanged() {
    await this.getRoles();
  }
  async getRoles() {
    this.showSpinner(SpinnerNameType.Work);
    const allRoles: { datas: List_Role[] } = await this.roleService.read(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => {

      }
    );
    this.dataSource = new MatTableDataSource<List_Role>(allRoles.datas);
    this.paginator.length = allRoles.datas.length;
    this.hideSpinner(SpinnerNameType.Work);
  }
}