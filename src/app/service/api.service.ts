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
      'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
    });
  
    return this.http.get<any>('https://low-carb-recipes.p.rapidapi.com/random', {
      headers: headers 
    });
  }

  public getListaComida(): Observable<any> {
    let headers = new HttpHeaders({
      'X-RapidAPI-Key': 'b05bfabd40mshd9c0e902b224196p17a7a3jsnf259a191cb37',
      'X-RapidAPI-Host': 'the-vegan-recipes-db.p.rapidapi.com'
    });
  
    return this.http.get<any>('https://the-vegan-recipes-db.p.rapidapi.com/', {
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
