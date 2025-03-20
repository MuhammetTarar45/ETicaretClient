import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // ngOnInit() {
  //   $(document).ready(() => {
  //     alert("Hi");
  //   })
  // }
}