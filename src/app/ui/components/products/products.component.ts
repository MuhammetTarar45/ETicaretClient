import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService);
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: param => {
        if (param["pageNo"] == undefined)
          this.router.navigate(['products/1']);
      }
    })
  }
}