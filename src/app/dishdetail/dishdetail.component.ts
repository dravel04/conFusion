import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {

  @ViewChild('cform') commentFormDirective: any;

  dish: Dish;
  dishIds: string[];
  dishcopy: Dish;
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment: Comment;
  errMsg: string;
  visibility = 'shown';

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author name is required.',
      'minlength': 'Author name must be at least 2 characters long.',
      'maxlength': 'Author name cannot be more than 30 characters long.'
    },    
    'comment': {
      'required': 'Comment is required.',
      'minlength': 'Comment must be at least 2 characters long.'
    },
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private baseURL:string) {
      this.createCommentForm();
  }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,
      error => this.errMsg = <any>error);
    this.getDish();
  }

  createCommentForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      rating: 5,
      comment: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }

  onValueChange(data?: any) {
    if(!this.commentForm) {return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    const date = new Date();
    this.comment = {
      author: this.commentForm.value.author,
      rating: this.commentForm.value.rating,
      comment: this.commentForm.value.comment,
      date: date.toISOString()
    };
    console.log(this.comment);
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
    .subscribe(dish => { this.dish; this.dishcopy = dish; },
      errmsg => { this.dish = null; this.dishcopy = null; this.errMsg = <any>errmsg;});         
    this.commentFormDirective.resetForm();    
    this.commentFormDirective.reset({rating: 5});
  }

  goBack(): void {
    this.location.back();
  }

  getDish(): void {
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; 
      return this.dishservice.getDish(params['id']); }))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id);
        this.visibility = 'shown'; },
        error => this.errMsg = <any>error);
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
}
