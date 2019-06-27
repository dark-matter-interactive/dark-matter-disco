import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient) { }

  searchUsers(username: string) {
    console.log(username, 'Friend');
    return this.http.get(`/user/${username}`)
  }

  getRequests(username:string) {
    return this.http.get(`/friend/request/${username}`)
  }

  addRequests(body: any) {
    return this.http.post('/friend/request', body);
  }
}
