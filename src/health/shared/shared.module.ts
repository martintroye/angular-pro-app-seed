import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, Routes, RouterModule } from "@angular/router";

import { AngularFireDatabaseModule } from "angularfire2/database";

import { MealsService } from "./services/meals/meals.service";
import { ListItemComponent } from './components/list-item/list-item.component';
import { WorkoutService } from './services/workout/workout.service';
import { JoinPipe } from './pipes/join.pipe';
import { WorkoutPipe } from './pipes/workout.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule,
    
  ],
  declarations: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ],
  exports: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        MealsService,
        WorkoutService
      ]
    };
  }
}
