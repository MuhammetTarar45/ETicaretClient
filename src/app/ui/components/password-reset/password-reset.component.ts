import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent, SpinnerNameType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../../../services/admin/alertify.service';

@Component({
  selector: 'app-password-reset',
  standalone: false,
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent extends BaseComponent {

  private readonly router: Router = inject(Router);
  private readonly userAuthService: UserAuthService = inject(UserAuthService);
  private readonly alertifyService: AlertifyService = inject(AlertifyService);
  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService);
  }
  async navigateWithUserName(userName: string) {
    this.spinnerService.show(SpinnerNameType.Work);
    await this.userAuthService.passwordReset(userName, () => {
      this.alertifyService.message('Mail başarıyla gönderilmiştir', {
        delay: 5000,
        messageType: AlertifyMessageType.Success,
        position: AlertifyPosition.TopLeft
      })
    }, () => {
      alert('kullanıcı bulunamadı TEST!');
    });
    this.spinnerService.hide(SpinnerNameType.Work);
    return;


    // this.router.navigate(['/update-password'], {
    //   state: { userNameParameters: userName }
    // })
  }
}