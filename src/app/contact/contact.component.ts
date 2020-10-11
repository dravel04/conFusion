import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective: any;

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      telnum: ['', Validators.required ],
      email: ['', Validators.required ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;  /*podemos mapear los valores directamente ya que la estructura
                                                de la clases Feedback es idéntica a la creada en en el metodo
                                                createForm() e instanciado a traves de feedbackForm.
                                                De no ser así, debemos mapear uno a uno los datos necesarios.*/
    console.log(this.feedback);
    // this.feedbackForm.reset({
    //   firstname: '',
    //   lastname: '',
    //   telnum: '',
    //   email: '',
    //   agree: false,
    //   contacttype: 'None',
    //   message: ''
    // });    
    this.feedbackFormDirective.resetForm();
  }

}
