import { Component, OnInit, Input, Optional, Host } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-form-popup',
  templateUrl: './edit-form-popup.component.html',
  styleUrls: ['./edit-form-popup.component.scss']
})
export class EditFormPopupComponent implements OnInit {

  // @Input() maxQty;
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.newValue = this._value = x;
  }
  private _value = '';

  /** Form model for the input. */
  newValue = '';

  constructor(@Optional() @Host() public popover: SatPopover) { }

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
    
        .subscribe(() => this.newValue = this.value || '');
    }
  }

  onSubmit() {
    // if (this.popover && this.newValue < this.maxQty) {
      this.popover.close(this.newValue);
    // }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }

}
