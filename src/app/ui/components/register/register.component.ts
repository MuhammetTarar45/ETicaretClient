import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { registerUser } from '../../../entities/registerUser';
import { UserService } from '../../../services/common/models/user.service';
import { Create_User } from '../../../contracts/users/create_user';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerNameType } from '../../../base/base.component';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private toastr: CustomToastrService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {

  }
  frm: FormGroup;
  ngOnInit() {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]],
      userName: ["", [
        Validators.required,
        Validators.maxLength(23),
        Validators.minLength(2)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password: ["", [
        Validators.required,
      ]],
      confirmPassword: ["", [
        Validators.required,
      ]]
    })
  }
  get Component() {
    return this.frm.controls;
  }
  submitted: boolean = false;
  async onSubmit(user: registerUser) {
    if (this.frm.invalid) {
      this.submitted = true;
      if (user.password !== user.confirmPassword) {
        this.toastr.message("Şifreler Uyuşmuyor", "HATALI ŞİFRE!", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.BottomCenter
        })
        console.log("Şifre DOĞRULAMA GEÇERSİZ!");
        return;
      }
      console.log("GEÇERSİZ KULLANICI KAYDI!");
      return;
    }
    else if (user.password === user.confirmPassword) {
      this.spinner.show(SpinnerNameType.Work);
      this.submitted = false;
      const result: Create_User = await this.userService.create(user);
      if (result.succeeded) {
        this.toastr.message(result.message, "Başarılı", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        });
      } else {
        this.toastr.message(result.message, "Başarısız", {
          messageType: ToastrMessageType.Warning,
          position: ToastrPosition.TopRight
        });
      }
      this.spinner.hide(SpinnerNameType.Work)
    } else {
      console.log("GEÇERSİZ KULLANICI KAYDI");
      return;
    }
  }
}