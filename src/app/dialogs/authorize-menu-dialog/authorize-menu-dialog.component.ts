import { AfterViewInit, Component, inject, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientService } from '../../services/common/http-client.service';
import { RoleService } from '../../services/common/models/role.service';
import { List_Role } from '../../contracts/roles/list_role';
import { MatSelectionList } from '@angular/material/list';
import { AuthorizationEndpointService } from '../../services/common/models/authorization-endpoint.service';

@Component({
  selector: 'app-authorize-menu-dialog',
  standalone: false,
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrl: './authorize-menu-dialog.component.scss'
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> {

  constructor(dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    super(dialogRef)
  }

  private readonly roleService = inject(RoleService);
  private readonly authorizationEndpointService = inject(AuthorizationEndpointService);
  roles: { datas?: List_Role[], totalCount?: number };


  async ngOnInit() {
    this.roles = await this.roleService.read(-1, -1, () => {

    }, () => {

    });
  }

  assignRole(rolesComp: MatSelectionList) {
    const selectedRoles: string[] = rolesComp.selectedOptions.selected.map(r => r._elementRef.nativeElement.innerText);
    this.authorizationEndpointService.assignRoleEndpoint(selectedRoles, this.data.code as string, this.data.menu)
  }
}