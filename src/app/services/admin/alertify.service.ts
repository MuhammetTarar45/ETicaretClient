import { Injectable } from '@angular/core';

declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string, options: Partial<AlertifyOptions>) {
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.position);
    alertify[options.messageType](message);
  }
}
export class AlertifyOptions {
  messageType: AlertifyMessageType = AlertifyMessageType.Message;
  position: AlertifyPosition = AlertifyPosition.TopRight;
  delay: number = 3;
}

export enum AlertifyMessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}
export enum AlertifyPosition {
  TopLeft = "top-left",
  TopRight = "top-right",
}
