import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule, MatCardModule, MatIconModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducers } from './store/reducers/app.reducer';
import { TodoEffects } from './store/effects/todo.effect';
import { BackendService } from './shared/services/backend.service';
import { TodoService } from './shared/services/todo.service';
import { TodosComponent } from './containers/todos/todos.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';

@NgModule({
  declarations: [AppComponent, TodosComponent, TodosListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([TodoEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument(),
    AppRoutingModule,
  ],
  providers: [BackendService, TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
