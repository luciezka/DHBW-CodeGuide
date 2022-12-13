import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { FlashcardComponent } from './components/FlashCards/flashcard/flashcard.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { NoCodeComponent } from './components/no-code/no-code.component';
import {RouterModule} from "@angular/router";
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { BasicInformationComponent } from './components/basic-information/basic-information.component';
import { TestMenuComponent } from './components/Tests/test-menu/test-menu.component';
import { TestingScreenComponent } from './components/Tests/testing-screen/testing-screen.component';
import { FlashcardMenuComponent } from './components/FlashCards/flashcard-menu/flashcard-menu.component';
import { FlashcardCreatorComponent } from './components/FlashCards/flashcard-creator/flashcard-creator.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {environment} from "../environments/environment";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    FlashcardComponent,
    UserAccountComponent,
    TopBarComponent,
    BottomBarComponent,
    NoCodeComponent,
    HomeScreenComponent,
    BasicInformationComponent,
    TestMenuComponent,
    TestingScreenComponent,
    FlashcardMenuComponent,
    FlashcardCreatorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: HomeScreenComponent},

      {path: 'Flashcard', component: FlashcardComponent},
      {path: 'FlashcardMenu', component: FlashcardMenuComponent},
      {path: 'FlashcardCreator', component: FlashcardCreatorComponent},
      {path: 'TestingScreen', component: TestingScreenComponent},
      {path: 'TestMenu', component: TestMenuComponent},
      {path: 'NoCode', component: NoCodeComponent},
      {path: 'Basics', component: BasicInformationComponent},
      {path: 'Account', component: UserAccountComponent},
      {path: 'Login', component: LoginScreenComponent}
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
