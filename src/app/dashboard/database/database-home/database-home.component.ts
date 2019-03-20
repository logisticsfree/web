import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-database-home',
  templateUrl: './database-home.component.html',
  styleUrls: ['./database-home.component.scss'],
  animations: [
    trigger('openNewSKUModal', [
      state(
        'close',
        style({
          height: '0px'
        })
      ),
      state('open', style({ height: '*' })),
      transition(
        'close <=> open',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class DatabaseHomeComponent implements OnInit {
  newSKUForm: FormGroup;

  toggleNewSkuModal = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  addSKU(formValues) {
    console.log(formValues);

    // this.toggleNewSkuModal = false;
  }

  createForm() {
    this.newSKUForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      volume: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      value: ['', [Validators.required]]
    });
  }

  get code() {
    return this.newSKUForm.get('code');
  }
  get name() {
    return this.newSKUForm.get('name');
  }
  get volume() {
    return this.newSKUForm.get('volume');
  }
  get weight() {
    return this.newSKUForm.get('weight');
  }
  get value() {
    return this.newSKUForm.get('value');
  }
}
