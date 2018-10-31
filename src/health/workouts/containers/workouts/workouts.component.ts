import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkoutService } from '../../../shared/services/workout/workout.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from 'store';
import { Workout } from '../../../shared/interfaces/workout';

@Component({
    selector: 'workouts',
    styleUrls: ['workouts.component.scss'],
    templateUrl: 'workouts.component.html'
})
export class WorkoutsComponent implements OnInit, OnDestroy {

    workouts$: Observable<Workout[]>;
    subscription: Subscription;
    
    constructor(private workoutService: WorkoutService, private store: Store) {

    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    
    ngOnInit(): void {
        this.workouts$ = this.store.select<Workout[]>('workouts');
        this.subscription = this.workoutService.workouts$.subscribe();
    }

    removeMeal(event: Workout){
        this.workoutService.removeWorkout(event.$key);
    }

}