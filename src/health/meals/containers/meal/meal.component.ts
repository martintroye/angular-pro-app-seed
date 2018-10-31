import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealsService } from '../../../shared/services/meals/meals.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Meal } from '../../../shared/interfaces/meal';

@Component({
    selector: 'meal',
    styleUrls: ['meal.component.scss'],
    templateUrl: 'meal.component.html'
})
export class MealComponent implements OnInit, OnDestroy {
    meal$: Observable<Meal>;
    subscription: Subscription;

    constructor(
        private mealsService: MealsService
        , private router: Router
        , private route: ActivatedRoute) {

        }

    async addMeal(meal: Meal) {
        await this.mealsService.addMeal(meal);
        this.backToMeals();
    }

    async updateMeal(meal: Meal) {
        const key = this.route.snapshot.params.id;
        await this.mealsService.updateMeal(key, meal);
        this.backToMeals();
    }

    async removeMeal(meal: Meal) {
        const key = this.route.snapshot.params.id;
        await this.mealsService.removeMeal(key);
        this.backToMeals();
    }

    backToMeals(){
        this.router.navigate(['meals'])
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    
    ngOnInit(): void {
        this.subscription = this.mealsService.meals$.subscribe();
        this.meal$ = this.route.params
        .switchMap(param => this.mealsService.getMeal(param.id));
    }    
}