import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  searchAudio(val: string) {
    console.log(val, 'Service');
    return this.http.get(`https://www.googleapis.com/youtube/v3/search/?key=AIzaSyANj9wF3ST1WPdhrXeQi64o8ApBZa5Ecek&q=${val}&part=snippet&type=video`)
  }

}
