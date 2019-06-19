import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  searchAudio(val: string) {
    console.log(val, 'Service');
    return this.http.get('/search/youtube', {
      params: { query: val }
    })
  }

}
