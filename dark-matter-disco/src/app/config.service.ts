import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  searchAudio(val: string) {
    console.log(val, 'Service');
    return this.http.get(`https://www.googleapis.com/youtube/v3/search/?key=AIzaSyBhomfptlaxkQWAnmaUXHIn-D5TUXy_oOU&q=${val}&part=snippet&type=video`)
  }

}
