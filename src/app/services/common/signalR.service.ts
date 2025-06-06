import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { error } from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }

  private _connection: HubConnection;
  get connection(): HubConnection {
    return this._connection;
  }


  start(hubUrl: string) {
    if (!this.connection || this.connection?.state === HubConnectionState.Disconnected) {
      const builder: HubConnectionBuilder = new HubConnectionBuilder();

      const hubConnection: HubConnection = builder.withUrl(hubUrl).withAutomaticReconnect().build();

      hubConnection.start()
        .then(() => {
          console.log("Connected!")
          this._connection = hubConnection;
        })
        .catch(error => setTimeout(() => {
          this.start(hubUrl)
        }, 3000));
    }
    console.log(this.connection.connectionId);
  }

  invoke(methodName: string, message: any, successCallBack?: (value) => void, errorCallBack?: () => void) {
    this.connection.invoke(methodName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }
  on(methodName: string, callBack: (...message) => void) {
    this.connection.on(methodName, callBack);
  }
}