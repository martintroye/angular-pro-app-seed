import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FormArray, FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Meal } from '../../../shared/interfaces/meal';

@Component({
    selector: 'meal-form',
    styleUrls: ['meal-form.component.scss'],
    templateUrl: 'meal-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealFormComponent implements OnChanges {
    @Output() create = new EventEmitter<Meal>();
    @Output() update = new EventEmitter<Meal>();
    @Output() remove = new EventEmitter<Meal>();

    @Input() meal: Meal;

    toggled = false;
    exists = false;

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

    updateMeal(){
        if(this.form.valid){
            this.update.emit(this.form.value);
        }
    }
    
    removeMeal(){
        this.remove.emit(this.form.value);
    }    

    addIngredient(){
        this.ingredients.push(new FormControl(''));
    }

    removeIngredient(index: number){
        this.ingredients.removeAt(index);
    }

    toggle(){
        this.toggled = !this.toggled;
    }

    ngOnChanges(changes: SimpleChanges){
        if(this.meal && this.meal.name){
            this.exists = true;
            const value = this.meal;
            this.form.patchValue(value);

            this.emptyIngredients();

            if(value.ingredients){
                for(const item of value.ingredients){
                    this.ingredients.push(new FormControl(item));
                }
            }
        }
    }

    emptyIngredients(){
        while(this.ingredients.controls.length){
            this.ingredients.removeAt(0);
        }
    }
}