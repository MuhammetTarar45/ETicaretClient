import { Component, inject, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { UserService } from '../../services/common/models/user.service';
import { RoleService } from '../../services/common/models/role.service';
import { List_Role } from '../../contracts/roles/list_role';

@Component({
  selector: 'app-authorize-user-dialog',
  standalone: false,
  templateUrl: './authorize-user-dialog.component.html',
  styleUrl: './authorize-user-dialog.component.scss'
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> {

  constructor(dialogRef: MatDialogRef<AuthorizeUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    super(dialogRef)
  }

  private readonly roleService = inject(RoleService);
  private readonly userService = inject(UserService);
  // private readonly authorizationEndpointService = inject(AuthorizeUserDialogComponent);
  roles: { datas?: List_Role[], totalCount: number };
  assignedRoles: { userRoles: string[] };


  async ngOnInit() {
    this.assignedRoles = await this.userService.getRolesToUser(this.data);
    this.roles = await this.roleService.read(-1, -1, () => {

    }, (err) => {

    })
  }

  assignRole(rolesComp: MatSelectionList) {
    const selectedRoles: string[] = rolesComp.selectedOptions.selected.map(r => r._elementRef.nativeElement.innerText);
    this.userService.assignRoleToUser(this.data, selectedRoles);
  }
}