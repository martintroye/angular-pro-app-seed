import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkoutService } from '../../../shared/services/workout/workout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Workout } from '../../../shared/interfaces/workout';

@Component({
    selector: 'workout',
    styleUrls: ['workout.component.scss'],
    templateUrl: 'workout.component.html'
})
export class WorkoutComponent implements OnInit, OnDestroy {
    workout$: Observable<Workout>;
    subscription: Subscription;

    constructor(
        private workoutService: WorkoutService
        , private router: Router
        , private route: ActivatedRoute) {

        }

    async addWorkout(workout: Workout) {
        await this.workoutService.addWorkout(workout);
        this.backToWorkouts();
    }

    async updateWorkout(workout: Workout) {
        const key = this.route.snapshot.params.id;
        await this.workoutService.updateWorkout(key, workout);
        this.backToWorkouts();
    }

    async removeWorkout(workout: Workout) {
        const key = this.route.snapshot.params.id;
        await this.workoutService.removeWorkout(key);
        this.backToWorkouts();
    }

    backToWorkouts(){
        this.router.navigate(['workouts'])
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    
    ngOnInit(): void {
        this.subscription = this.workoutService.workouts$.subscribe();
        this.workout$ = this.route.params
        .switchMap(param => this.workoutService.getWorkout(param.id));
    }    
}