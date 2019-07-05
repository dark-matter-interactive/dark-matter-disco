import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs';

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

  // adds to users star count
  addingStars(username: string) {
    console.log('adding stars', username)
    return this.http.put('/user/stars', { username }).subscribe((response) => {
      console.log('response', response);
    }, (err) => {console.error(err)})
  }

  // gets users star count
  getStarCount(username: string) {
    console.log('get stars', username);
    return this.http.get(`/user/${username}`)
  }

  // gets all achievements
  recieveAchievement() {
    return this.http.get('/achievement');
  }

  // updates userAchievements join table
  updateAchievements(username, achievementID) {
    return this.http.post('/achievement', { username, achievementID});
  }

  // gets users achievements
  userAchievements(username) {
    return this.http.get('/userAchievements', { 
      params: { username: username }
      });
  }

}
