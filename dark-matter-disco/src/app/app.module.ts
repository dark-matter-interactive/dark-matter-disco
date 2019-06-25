import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AudioComponent } from './audio/audio.component';
import { DanceFloorComponent } from './dance-floor/dance-floor.component';
import { DancerComponent } from './dancer/dancer.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FriendsComponent } from './friends/friends.component';
import { AudioListComponent } from './audio/audio-list/audio-list.component';



@NgModule({
  declarations: [
    AppComponent,
    AudioComponent,
    DanceFloorComponent,
    DancerComponent,
    FriendsComponent,
    AudioListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
