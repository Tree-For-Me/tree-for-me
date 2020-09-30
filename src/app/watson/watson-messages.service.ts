import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Message } from '../models/message';
import { map } from "rxjs/operators";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class WatsonMessagesService {

  constructor(private http: HttpClient) { }

  public getPromptMessage(): Observable<Message> {
    let url = '/getPromptMessage';
    return this.http.get<Message>(API_URL + url);
  }
  
  public getPlantTypeMessage(): Observable<Message> {
    let url = '/getPlantTypeMessage';
    return this.http.get<Message>(API_URL + url);
  }
  
  public getSunMessage(): Observable<Message> {
    let url = '/getSunMessage';
    return this.http.get<Message>(API_URL + url);
  }
  
  public getHumidityMessage(): Observable<Message> {
    let url = '/getHumidityMessage';
    return this.http.get<Message>(API_URL + url);
  }
  
  public getFlowersMessage(): Observable<Message> {
    let url = '/getFlowersMessage';
    return this.http.get<Message>(API_URL + url);
  }

}
