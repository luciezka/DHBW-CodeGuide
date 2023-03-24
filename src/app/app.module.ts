import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { FlashcardComponent } from './components/FlashCards/flashcard/flashcard.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { RouterModule } from "@angular/router";
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { TestMenuComponent } from './components/Tests/test-menu/test-menu.component';
import { TestingScreenComponent } from './components/Tests/testing-screen/testing-screen.component';
import { FlashcardMenuComponent } from './components/FlashCards/flashcard-menu/flashcard-menu.component';
import { FlashcardCreatorComponent } from './components/FlashCards/flashcard-creator/flashcard-creator.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from "../environments/environment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { NoCodeComponent } from "./components/StudienArbeit/no-code/no-code.component";
import { FlashcardAdminMenuComponent } from './components/FlashCards/flashcard-admin-menu/flashcard-admin-menu.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { LearnCodeMenuComponent } from './components/LearnCode/learn-code-menu/learn-code-menu.component';
import { LearnCodeComponent } from './components/LearnCode/learn-code/learn-code.component';
import { MarkdownComponent } from './components/LearnCode/learn-code-creator/markdown.component';
import { LearnCodeAdminMenuComponent } from './components/LearnCode/learn-code-admin-menu/learn-code-admin-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    FlashcardComponent,
    UserAccountComponent,
    TopBarComponent,
    BottomBarComponent,
    HomeScreenComponent,
    TestMenuComponent,
    TestingScreenComponent,
    FlashcardMenuComponent,
    FlashcardCreatorComponent,
    NoCodeComponent,
    FlashcardAdminMenuComponent,
    LearnCodeMenuComponent,
    MarkdownComponent,
    LearnCodeComponent,
    LearnCodeAdminMenuComponent
  ],
  providers: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AngularEditorModule,
    /*MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),*/
    RouterModule.forRoot([
      {path: '', component: HomeScreenComponent},
      {path: 'Flashcard', component: FlashcardComponent},
      {path: 'FlashcardMenu', component: FlashcardMenuComponent},
      {path: 'FlashcardCreator', component: FlashcardCreatorComponent},
      {path: 'FlashcardAdminMenu', component: FlashcardAdminMenuComponent},
      {path: 'Testcard', component: TestingScreenComponent},
      {path: 'TestMenu', component: TestMenuComponent},
      {path: 'Account', component: UserAccountComponent},
      {path: 'Login', component: LoginScreenComponent},
      {path: 'NoCode', component: NoCodeComponent},
      {path: 'LearnCodeMenu', component: LearnCodeMenuComponent},
      {path: 'LearnCodeCreator', component: MarkdownComponent},
      {path: 'LearnCode', component: LearnCodeComponent},
      {path: 'LearnCodeAdminMenu', component: LearnCodeAdminMenuComponent}
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ReactiveFormsModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore())
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    // Only required for database features

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
