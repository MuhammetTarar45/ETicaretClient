import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent, SpinnerNameType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../../services/common/models/user.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    spinner: NgxSpinnerService
  ) {
    super(spinner)
  }
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      userNameOrEmail: ["", [
        Validators.required,
        Validators.minLength(2)
      ]],
      password: ["", [
        Validators.required
      ]]
    })
  }
  frm: FormGroup;

  get Component() {
    return this.frm.controls;
  }
  async onSubmit(user: any) {
    if (this.frm.invalid) {
      this.submitted = true;
      return;
    }
    else {
      this.showSpinner(SpinnerNameType.Work);
      this.submitted = false;
      await this.userService.login(user, () => {
        this.hideSpinner(SpinnerNameType.Work);
      });
    }
  }
  submitted: boolean = false;
}
