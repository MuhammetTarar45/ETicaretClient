import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent, SpinnerNameType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { BasketService } from '../../../services/common/models/basket.service';
import { List_Basket } from '../../../contracts/baskets/list_basket';
import { Update_Basket_Item } from '../../../contracts/baskets/update_basket_item';
import { OrderService } from '../../../services/common/order.service';
import { Create_Order } from '../../../contracts/orders/create_order';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { Router } from '@angular/router';
import { DialogService } from '../../../services/common/dialog.service';
import { DialogDeleteComponent } from '../../../dialogs/dialog-delete/dialog-delete.component';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
declare var $: any;
// declare var Swal: any;

@Component({
  selector: 'app-baskets',
  standalone: false,
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.scss'
})

export class BasketsComponent extends BaseComponent implements OnInit {

  private readonly basketService = inject(BasketService);
  private readonly orderService = inject(OrderService);
  private readonly toastrService = inject(CustomToastrService);
  private readonly router = inject(Router);
  private readonly dialogService = inject(DialogService);






  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService)
  }
  basketList: List_Basket[];

  ngOnInit() {
    this.spinnerService.show(SpinnerNameType.Work);
    this.basketService.get((response: List_Basket[]) => {
      this.basketList = response;
    }, () => {
      console.log('veri başarısız')
    })
    this.spinnerService.hide(SpinnerNameType.Work);
  }


  changeQuantity(event: any) {
    this.showSpinner(SpinnerNameType.Work);
    const basketItems: Update_Basket_Item = new Update_Basket_Item();
    basketItems.basketItemId = event.target.attributes['id'].value;
    basketItems.quantity = event.target.value;
    this.basketService.put(basketItems);
    this.hideSpinner(SpinnerNameType.Work);
  }

  deleteProduct(basketItemId: string, rowItem: HTMLElement | HTMLInputElement) {

    // Swal.fire({
    //   title: 'Emin Misiniz',
    //   text: "You clicked the button!",
    //   icon: "success"
    // })
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });
    const modalElement = document.getElementById('basketItemModal');
    const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
    modalInstance.hide();
    $('.modal-backdrop').remove();


    this.dialogService.openDialog({
      componentType: DialogDeleteComponent,
      data: BasketItemDeleteState.Yes,
      afterClosedSuccessCallBack: async () => {
        this.showSpinner(SpinnerNameType.Work);
        await this.basketService.remove(basketItemId, () => $(rowItem.closest('tr')).fadeOut(200));
        this.hideSpinner(SpinnerNameType.Work);
      }, afterClosedErrorCallBack: () =>
        console.log('hi')
    });
  }

  async shoppingComplete() {
    this.showSpinner(SpinnerNameType.Work);
    let order = new Create_Order();
    order.address = 'Yeni Mahalle';
    order.description = 'Tüm Hakları Saklıdır';
    await this.orderService.create(order);
    this.hideSpinner(SpinnerNameType.Work);
    this.toastrService.message('Siparişiniz Oluşturuldu', 'Başarılı', {
      position: ToastrPosition.TopRight,
      messageType: ToastrMessageType.Success
    })
    this.router.navigate(['/']);
  }
}
export enum BasketItemDeleteState {
  Yes = 'yes',
  No = 'no'
}