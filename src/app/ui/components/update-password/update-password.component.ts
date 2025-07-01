import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent, SpinnerNameType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../../../services/admin/alertify.service';
import { UserService } from '../../../services/common/models/user.service';

@Component({
  selector: 'app-update-password',
  standalone: false,
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent extends BaseComponent {
  private readonly router: Router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly alertifyService = inject(AlertifyService);
  private readonly userService = inject(UserService);
  state: boolean = false;


  constructor(spinnerService: NgxSpinnerService, private userAuthService: UserAuthService) {
    super(spinnerService);
    const navigation = this.router.getCurrentNavigation();
    const userName = navigation.extras.state?.['userNameParameters'];
    console.log(userName);
  }


  userId: any;
  resetToken: any;
  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: params => {
        this.userId = params['userId'];
        this.resetToken = params['resetToken'];
        this.userAuthService.verifyResetToken(this.resetToken, this.userId, () => {
          this.state = true;
        })
      }
    });
  }
  async updatePassword(password: string, passwordConfirm: string) {
    this.spinnerService.show(SpinnerNameType.Work);
    if (password != passwordConfirm) {
      this.alertifyService.message('Şifreler Uyuşmuyor!', {
        messageType: AlertifyMessageType.Warning,
        position: AlertifyPosition.TopLeft,
        delay: 5000
      })
      return;
    }
    await this.userService.updatePassword(this.userId, this.resetToken, password, () => {
      this.alertifyService.message('Şifre Güncellendi!!!', {
        messageType: AlertifyMessageType.Success
      });
      this.router.navigate['/login'];
    }, () => {
      this.alertifyService.message('Bir Hata Oluştu', {
        messageType: AlertifyMessageType.Error
      })
    });
    this.spinnerService.hide(SpinnerNameType.Work);
  }
}