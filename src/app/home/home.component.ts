import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  errDishMsg: string;
  errPromotionMsg: string;
  errLeaderMsg: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.getFeaturedDish();
    this.getFeaturedPromotion();
    this.getFeaturedLeader();
  }

  getFeaturedDish(): void{
    this.dishservice.getFeaturedDish()
      .subscribe((dish) => this.dish = dish,
        errmsg => this.errDishMsg = <any>errmsg);
  }
  getFeaturedPromotion(): void{
    this.promotionservice.getFeaturedPromotion()
      .subscribe((promotion) => this.promotion = promotion,
        errmsg => this.errPromotionMsg = <any>errmsg);
  }
  getFeaturedLeader(): void{
    this.leaderservice.getFeaturedLeader()
      .subscribe((leader) => this.leader = leader,
        errmsg => this.errLeaderMsg = <any>errmsg);
  }

}
