import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { MaterialModule } from '../material';
import { MiniGamesRoutingModule } from './mini-games-routing.module';
import { GameUtilsService } from './services/game-utils.service';

import { GameFirstModalComponent } from './components/game-first-modal/game-first-modal.component';
import { GameResultsModalComponent } from './components/game-results-modal/game-results-modal.component';
import { MiniGamesComponent } from './mini-games.component';
import { ItemAudioCallComponent } from './audiocall/item-audio-call/item-audio-call.component';
import { AudioCallComponent } from './audiocall/audio-call/audio-call.component';
import { MainAudioCallComponent } from './audiocall/main-audio-call/main-audio-call.component';
import { SavannaComponent } from './savanna/savanna.component';
import { SavannaChildComponent } from './savanna/savanna-child/savanna-child.component';
import { TypeMeComponent } from './type-me/type-me/type-me.component';
import { ItemTypeMeComponent } from './type-me/item-type-me/item-type-me.component';
import { MainTypeMeComponent } from './type-me/main-type-me/main-type-me.component';

@NgModule({
  declarations: [
    AudioCallComponent,
    MiniGamesComponent,
    ItemAudioCallComponent,
    MainAudioCallComponent,
    GameFirstModalComponent,
    GameResultsModalComponent,
    SavannaChildComponent,
    TypeMeComponent,
    ItemTypeMeComponent,
    MainTypeMeComponent,
    SavannaComponent,
  ],
  imports: [MiniGamesRoutingModule, SharedModule, MaterialModule, RouterModule],
  entryComponents: [GameResultsModalComponent],
  providers: [GameUtilsService],
})
export class MiniGamesModule {}
