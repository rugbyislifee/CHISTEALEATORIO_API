import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //Constructor
  constructor(private http: HttpClient) { }

  //Trae data de API
  public getApiData(): Observable<any> {
    let headers = new HttpHeaders({
      'X-RapidAPI-Key': 'b05bfabd40mshd9c0e902b224196p17a7a3jsnf259a191cb37',
      'X-RapidAPI-Host': 'jokes-by-api-ninjas.p.rapidapi.com'
    });
  
    return this.http.get<any>('https://jokes-by-api-ninjas.p.rapidapi.com/v1/jokes', {
      headers: headers 
    });
  }

  /*
    public getApiData(): Observable<any> {
    let headers = new HttpHeaders({
      'X-RapidAPI-Key': 'b05bfabd40mshd9c0e902b224196p17a7a3jsnf259a191cb37',
      'X-RapidAPI-Host': 'chelsea-fc-news-live.p.rapidapi.com'
    });
  
    return this.http.get<any>('https://chelsea-fc-news-live.p.rapidapi.com/news/NewsNow', {
      headers: headers 
    });
  }
  */



}
