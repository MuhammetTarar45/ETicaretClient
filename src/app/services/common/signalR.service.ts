import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { error } from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("BaseSignalRUrl") private baseSignalRUrl: string) { }

  private _connection: HubConnection;
  get connection(): HubConnection {
    return this._connection;
  }


  async start(hubUrl: string): Promise<void> {
    hubUrl = this.baseSignalRUrl + hubUrl;
    if (!this.connection || this.connection.state === HubConnectionState.Disconnected) {
      const builder: HubConnectionBuilder = new HubConnectionBuilder();

      const hubConnection: HubConnection = builder.withUrl(hubUrl).withAutomaticReconnect().build();

      try {
        await hubConnection.start();
        this._connection = hubConnection;
        console.log(hubUrl + "'e Bağlanıldı");
      } catch (error) {
        console.error("Bağlantı kurulamadı, tekrar deneniyor...");
        setTimeout(() => this.start(hubUrl), 3000);
      }
    }
  }

  invoke(methodName: string, message: any, successCallBack?: (value) => void, errorCallBack?: () => void) {
    this.connection.invoke(methodName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }
  on(methodName: string, callBack: (...message) => void) {
    if (!this.connection) {
      console.warn("SignalR bağlantısı hazır değil, on() iptal edildi.");
      return;
    }
    console.log(`SignalR '${methodName}' fonksiyonu dinleniyor.`);
    this.connection.on(methodName, callBack)
  }
}