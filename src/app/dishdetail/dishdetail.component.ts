import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';

@Component({
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

    @Input() dish: Dish; /* #1 el nombre del objeto debe coincidir con el que pasamos entre corchetes en
                            menu.component.ts */


    constructor() { }

    ngOnInit(): void {
    }

}
