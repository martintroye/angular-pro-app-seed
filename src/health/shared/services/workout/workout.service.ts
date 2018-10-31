import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

import { Store } from "store";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";

import { AuthService } from "../../../../auth/shared/services/auth/auth.sevice";
import { Workout } from '../../interfaces/workout';

@Injectable()
export class WorkoutService {
    workouts$: Observable<Workout[]> = this.db
    .list(`workouts/${this.uid}`)
    .do(next => this.store.set("workouts", next));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  getWorkout(key: string) {
    if (!key) return Observable.of({});
    return this.store
      .select<Workout[]>("workouts")
      .filter(Boolean)
      .map(workouts => workouts.find((workout: Workout) => workout.$key === key));
  }

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout): any {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(key: string) {
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }
}
