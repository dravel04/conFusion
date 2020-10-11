import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];  // extraemos el valor del parametro "id" dentro del URL
    this.getDish(id);  // extraemos la información asociada al plato con la id pasada
  }

  goBack(): void {
    this.location.back();
  }

  getDish(id:string): void {
    this.dishservice.getDish(id)
      .subscribe((dish) => this.dish = dish);
  }

}
