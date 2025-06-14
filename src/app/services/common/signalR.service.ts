import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("BaseSignalRUrl") private baseSignalRUrl: string) { }


  hubConnection: HubConnection;

  start(hubUrl: string): HubConnection {
    hubUrl = this.baseSignalRUrl + hubUrl;

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    try {
      this.hubConnection.start();
      console.log('SignalR Connected =>', this.hubConnection.connectionId);
      return this.hubConnection;
    } catch (err) {
      console.error('SignalR Connection Error:', err);
      throw err;
    }
  }

  invoke(hubUrl: string, methodName: string, message: any, successCallBack?: (value) => void, errorCallBack?: () => void) {
    this.start(hubUrl).invoke(methodName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }
  on(hubUrl: string, methodName: string, callBack: (...message) => void) {
    this.start(hubUrl).on(methodName, callBack);
    if (!this.hubConnection) {
      console.warn("SignalR bağlantısı hazır değil, on() iptal edildi.");
      return;
    }
    console.log(`SignalR '${methodName}' fonksiyonu dinleniyor.`);
  }
}