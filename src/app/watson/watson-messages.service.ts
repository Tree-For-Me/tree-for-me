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

  public getMessage(): Observable<Message> {
    let url = '/getPromptMessage';
    return this.http.get<Message>(API_URL + url);
  }

}
