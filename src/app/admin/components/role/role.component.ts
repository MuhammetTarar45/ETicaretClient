import { Component, inject, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-role',
  standalone: false,
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})

export class RoleComponent extends BaseComponent {
  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService);
  }
  authService: AuthService = inject(AuthService);
  @ViewChild(ListComponent) listComponents: ListComponent;

  lastRoleList(event: any) {
    //Burası List_Product Olmalı ama değer gönderirken Create_product gönderiyoruz List yapınca hata alıyoruz. En başta değer gönderirken de List gibi biçimlerde göndermeliyiz ama böyle kalsa da olur.
    this.authService.identityCheck();
    this.listComponents.getRoles();
  }
}