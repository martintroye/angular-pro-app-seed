import { Component } from '@angular/core';
import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'meal',
    styleUrls: ['meal.component.scss'],
    templateUrl: 'meal.component.html'
})
export class MealComponent {
    constructor() {}

    addMeal(event: Meal) {
        console.log('Meal: ',event);
    }
}