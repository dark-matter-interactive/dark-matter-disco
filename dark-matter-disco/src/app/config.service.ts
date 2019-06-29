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

  addingStars(username: string) {
    console.log('adding stars', username)
    return this.http.put('/user/stars', { username }).subscribe((response) => {
      console.log('response', response);
    }, (err) => {console.log(err)})
  }

}
