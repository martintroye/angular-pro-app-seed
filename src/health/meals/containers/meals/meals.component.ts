import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealsService } from '../../../shared/services/meals/meals.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from 'store';
import { Meal } from '../../../shared/interfaces/meal';

@Component({
    selector: 'meals',
    styleUrls: ['meals.component.scss'],
    templateUrl: 'meals.component.html'
})
export class MealsComponent implements OnInit, OnDestroy {

    meals$: Observable<Meal[]>;
    subscription: Subscription;
    
    constructor(private mealsService: MealsService, private store: Store) {

    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    
    ngOnInit(): void {
        this.meals$ = this.store.select<Meal[]>('meals');
        this.subscription = this.mealsService.meals$.subscribe();
    }

    removeMeal(event: Meal){
        this.mealsService.removeMeal(event.$key);
    }

}