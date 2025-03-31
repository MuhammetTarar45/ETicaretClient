import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {


  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) {

  }

  private url(requestParameters: Partial<RequestParameters>): string {
    return `${requestParameters.baseUrl ?? this.baseUrl}/${requestParameters.controller ?? ''}${requestParameters.action ? `/${requestParameters.action}` : ''}`;
  }

  get<T>(requestParameters: Partial<RequestParameters>, id?: string,): Observable<T> {
    let url: string = "";
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint;
    else
      url = `${this.url(requestParameters)}${id ? `/${id}` : ''}${requestParameters.queryStrings ? `?${requestParameters.queryStrings}` : ''}`
    return this.httpClient.get<T>(url, { headers: requestParameters.headers });
  }

  post<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint;
    else
      url = `${this.url(requestParameters)}${requestParameters.queryStrings ? `?${requestParameters.queryStrings}` : ''}`;
    return this.httpClient.post<T>(url, body, { headers: requestParameters.headers });
  }

  put<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint
    else
      url = `${this.url(requestParameters)}${requestParameters.queryStrings ? `?${requestParameters.queryStrings}` : ''}`;
    return this.httpClient.put<T>(url, body, { headers: requestParameters.headers });
  }
  delete<T>(requestParameters: Partial<RequestParameters>, id: string) {
    let url: string = "";
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint
    else
      url = `${this.url(requestParameters)}/${id}${requestParameters.queryStrings ? `?${requestParameters.queryStrings}` : ''}`;
    return this.httpClient.delete(url, { headers: requestParameters.headers });
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;

  queryStrings?: string;

  headers?: HttpHeaders
  baseUrl?: string;
  fullEndPoint?: string;
}