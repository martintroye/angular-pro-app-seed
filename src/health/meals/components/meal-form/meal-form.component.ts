import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import {FormArray, FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'meal-form',
    styleUrls: ['meal-form.component.scss'],
    templateUrl: 'meal-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealFormComponent {
    @Output() create = new EventEmitter<Meal>();

    form = this.fb.group({
        name: ['', Validators.required],
        ingredients: this.fb.array([''])
    });

    constructor(private fb: FormBuilder) {}

    get ingredients(){
        return this.form.get('ingredients') as FormArray;
    }

    get required(){
        return(
            this.form.get('name').hasError('required') &&
            this.form.get('name').touched
        );
    }

    createMeal(){
        if(this.form.valid){
            this.create.emit(this.form.value);
        }
    }

    addIngredient(){
        this.ingredients.push(new FormControl(''));
    }

    removeIngredient(index: number){
        this.ingredients.removeAt(index);
    }
}