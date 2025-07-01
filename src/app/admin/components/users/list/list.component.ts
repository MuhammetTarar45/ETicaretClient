import { Component, inject } from '@angular/core';
import { UserService } from '../../../../services/common/models/user.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { AuthorizeUserDialogComponent } from '../../../../dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  private readonly userService = inject(UserService);
  private readonly dialogService = inject(DialogService);
  readonly alertifyService = inject(AlertifyService);
  public users: any;

  async ngOnInit() {
    this.users = await this.userService.getAllUser();
  }

  assignRole(id: string) {
    this.dialogService.openDialog({
      componentType: AuthorizeUserDialogComponent,
      data: id,
      afterClosedSuccessCallBack: () => {
        this.alertifyService.message('BAŞARILI', {
          delay: 2000,
          messageType: AlertifyMessageType.Success,
          position: AlertifyPosition.TopLeft
        })
      },
      afterClosedErrorCallBack: () => {
        this.alertifyService.message('HATA', {
          delay: 2000,
          messageType: AlertifyMessageType.Error,
          position: AlertifyPosition.TopLeft
        })
      },
    })
  }
}