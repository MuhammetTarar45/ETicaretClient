import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private toastrService: CustomToastrService) {
  }
  ngOnInit() {
    this.toastrService.message("Nasılsınız", "Selamlar", { position: ToastrPosition.BottomCenter, messageType: ToastrMessageType.Info });
  }
}