import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent, SpinnerNameType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../../services/common/models/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/common/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authServer: AuthService
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
        this.authServer.identityCheck();

        const a = this.activatedRoute.snapshot.queryParamMap.get("returnUrl"); //queryString okurken farklı kod,
        //route değeri okurken farklı kod.
        this.activatedRoute.queryParams.subscribe(params => {
          const goReturnUrl: string = params["returnUrl"] ?? "/home";
          if (goReturnUrl)
            this.router.navigate([goReturnUrl]);

        })
        this.hideSpinner(SpinnerNameType.Work);
      });
    }
  }
  submitted: boolean = false;
}
