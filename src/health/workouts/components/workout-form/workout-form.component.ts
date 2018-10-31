import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FormArray, FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Workout } from '../../../shared/interfaces/workout';

@Component({
    selector: 'workout-form',
    styleUrls: ['workout-form.component.scss'],
    templateUrl: 'workout-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutFormComponent implements OnChanges {
    @Output() create = new EventEmitter<Workout>();
    @Output() update = new EventEmitter<Workout>();
    @Output() remove = new EventEmitter<Workout>();

    @Input() workout: Workout;

    toggled = false;
    exists = false;

    form = this.fb.group({
        name: ['', Validators.required],
        type: 'strength',
        strength: this.fb.group({
            reps: 0,
            sets: 0,
            weight: 0
        }),
        endurance: this.fb.group({
            distance: 0,
            duration: 0
        })
    });

    constructor(private fb: FormBuilder) {}

    get placeholder(){
        return `e.g. ${this.form.get('type').value === 'strength' ? 'Benchpress' : 'Treadmill'}`;
    }

    get required(){
        return(
            this.form.get('name').hasError('required') &&
            this.form.get('name').touched
        );
    }

    createWorkout(){
        if(this.form.valid){
            this.create.emit(this.form.value);
        }
    }

    updateWorkout(){
        if(this.form.valid){
            this.update.emit(this.form.value);
        }
    }
    
    removeWorkout(){
        this.remove.emit(this.form.value);
    }    

    toggle(){
        this.toggled = !this.toggled;
    }

    ngOnChanges(changes: SimpleChanges){
        if(this.workout && this.workout.name){
            this.exists = true;
            const value = this.workout;
            this.form.patchValue(value);
        }
    }
}