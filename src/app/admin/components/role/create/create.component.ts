import { Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent, SpinnerNameType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from '../../../../services/common/models/role.service';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../../../../services/admin/alertify.service';
import { Create_Role } from '../../../../contracts/roles/create_role';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService, private roleService: RoleService, private alertify: AlertifyService) {
    super(spinner);
  }

  @Output() createdRole: EventEmitter<Create_Role> = new EventEmitter();
  createWButton(name: HTMLInputElement) {
    this.showSpinner(SpinnerNameType.Work);
    const create_role: Create_Role = new Create_Role();
    create_role.name = name.value;

    this.roleService.create(create_role.name, () => {
      this.hideSpinner(SpinnerNameType.Work),
        this.alertify.message('Ürün Başarıyla Eklendi', {
          delay: 7,
          messageType: AlertifyMessageType.Message,
          position: AlertifyPosition.TopLeft
        });
      this.createdRole.emit(create_role);
    }, error => {
      this.hideSpinner(SpinnerNameType.Work);
      this.alertify.message(error, { messageType: AlertifyMessageType.Error, delay: 10 });
    }
    );
  }
}