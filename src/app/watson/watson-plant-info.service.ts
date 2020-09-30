import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { PlantInfo } from '../models/plant_info';
import { Plant } from '../models/plant';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class WatsonPlantInfoService {
  
  constructor(private http: HttpClient) { }

  public plantInfoRequest(plantInfo: PlantInfo): Observable<Plant> {
    let url = '/discovery/getPlantSearchResult';

    const paramsObj = new HttpParams()
    .set('flowerType', plantInfo.flowerType)
    .set('light', plantInfo.light)
    .set('flowers', plantInfo.flowers? "true":"false")
    .set('humidity', plantInfo.humidity? "true":"false")
  
    return this.http.get<Plant>(API_URL + url, { params: {
      'flowerType': plantInfo.flowerType,
      'light': plantInfo.light,
      'flowers': plantInfo.flowers? "true":"false",
      'humidity': plantInfo.humidity? "true":"false"
      }
      
    }
    );
  }

  stringToBoolean(stringValue: string): boolean | undefined {  
    try {  
        return JSON.parse(stringValue);  
    }  
    catch (e) {  
        return undefined;  
    }  
} 

  // TODO in future
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
