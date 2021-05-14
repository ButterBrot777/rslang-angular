import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiniGamesComponent } from './mini-games.component';
import { AudioCallComponent } from './audiocall/audio-call/audio-call.component';
import { MainAudioCallComponent } from './audiocall/main-audio-call/main-audio-call.component';
import { SavannaComponent } from './savanna/savanna.component';
import { TypeMeComponent } from './type-me/type-me/type-me.component';
import { MainTypeMeComponent } from './type-me/main-type-me/main-type-me.component';

const routes: Routes = [
  { path: 'savanna', component: SavannaComponent },
  { path: 'savanna/:group/:page', component: SavannaComponent },
  { path: 'audio-call', component: MainAudioCallComponent },
  { path: 'audio-call/:group', component: AudioCallComponent },
  { path: 'audio-call/:group/:page', component: AudioCallComponent },
  { path: 'type-me', component: MainTypeMeComponent },
  { path: 'type-me/:group', component: TypeMeComponent },
  { path: 'type-me/:group/:page', component: TypeMeComponent },
  { path: '', component: MiniGamesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiniGamesRoutingModule {}
