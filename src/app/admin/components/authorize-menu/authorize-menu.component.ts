import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicationService } from '../../../services/common/models/application.service';
import { Menu } from '../../../contracts/application-configurations/menu';
import { DialogService } from '../../../services/common/dialog.service';
import { AuthorizeMenuDialogComponent } from '../../../dialogs/authorize-menu-dialog/authorize-menu-dialog.component';



@Component({
  selector: 'app-authorize-menu',
  standalone: false,
  templateUrl: './authorize-menu.component.html',
  styleUrl: './authorize-menu.component.scss',
})


export class AuthorizeMenuComponent extends BaseComponent implements OnInit {


  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService);
  }

  async ngOnInit() {
    this.dataSource = await this.applicationService.getAuthorizeDefinitionEndPoints();
  }

  dataSource?;

  readonly applicationService = inject(ApplicationService);
  readonly dialogService = inject(DialogService);


  childrenAccessor = (node: Menu) => node.actions as Menu[] ?? [];

  hasChild = (_: number, node: Menu) => !!node.actions && node.actions?.length > 0;




  assignRole(code: any, menu: string, name: string) {
    // console.log(code);
    // console.log(menu);
    // console.log(name);
    // debugger
    this.dialogService.openDialog({
      componentType: AuthorizeMenuDialogComponent,
      data: { code: code, menu: menu, name: name },
      afterClosedSuccessCallBack: () => {

      },
    })
  }
}