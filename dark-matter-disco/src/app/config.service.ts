import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class httpService {

  constructor(private http: HttpClient) { }

  // searches YouTube for video/music based on user input
  searchAudio(val: string) {
    return this.http.get('/search/youtube', {
      params: { query: val }
    })
  }

  // adds to users star count
  addingStars(username: string) {
    return this.http.put('/user/stars', { username }).subscribe((response) => {
    }, (err) => {console.error(err)})
  }

  // gets users star count
  getStarCount(username: string) {
    return this.http.get(`/user/${username}`)
  }

  // gets all achievements
  recieveAchievement() {
    return this.http.get('/achievement');
  }

  // updates userAchievements join table, using User's username and the Achievement id
  updateAchievements(username, achievementID) {
    return this.http.post('/achievement', { username, achievementID});
  }

  // gets users achievements
  userAchievements(username) {
    return this.http.get('/userAchievements', { 
      params: { username: username }
      });
  }
  
  // adds new user to database if does not exist, else gets the Users information
  loginUser(username) {
    return this.http.post('/user/login', { username });
  }

}
