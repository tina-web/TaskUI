import { Action, ActionReducer, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { RootState } from './store/state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TaskListPageEffects } from './store/task-list-page/effects';
import { taskDetailsPageStateReducer } from './store/task-detail-page/reducers';
import { taskListPageReducer } from './store/task-list-page/reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EffectsModule.forRoot([TaskListPageEffects]),
    StoreModule.forRoot({
      taskDetailsPage: taskDetailsPageStateReducer,
      taskListPage: taskListPageReducer,
    } as { [T in keyof RootState]: ActionReducer<RootState[T], Action> }),
    StoreDevtoolsModule.instrument({ maxAge: 100 }),
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
