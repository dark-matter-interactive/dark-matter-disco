import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../auth.service';
import { httpService } from 'src/app/config.service';
import { any } from '@tensorflow/tfjs-core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  isLoggedIn: Boolean = false;
  @Input() changeUser: any;

  constructor(public authService: AuthService, private httpService: httpService) {}
  
  googleLogin() {
    this.authService.signInWithGoogle().then((login: any) => {
      const { name } = login.additionalUserInfo.profile;
      console.log('login successful:', name);
      this.httpService.loginUser(name).subscribe(
        (response) => {
          console.log(response)
          const { username, starsTotal } = response[0];
          this.isLoggedIn = true;
          this.changeUser(username, starsTotal);
        },
        (err)=>{ console.log(err); }
      );

      // axios.post('/login', {
      //   name: ,
      //   email: result.additionalUserInfo.profile.email,
      // });
    }).catch((err) => {
      console.log(err);
    });
  }
  // signup() {
  //   this.authService.signup(this.email, this.password);
  //   this.email = this.password = '';
  // }

  // login() {
  //   this.authService.login(this.email, this.password);
  //   this.email = this.password = '';    
  // }

  // logout() {
  //   this.authService.logout();
  // }
  ngOnInit() {
  }

}
