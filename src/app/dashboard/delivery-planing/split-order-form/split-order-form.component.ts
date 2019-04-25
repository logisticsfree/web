import { Component, OnInit, Input, Optional, Host } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-split-order-form',
  templateUrl: './split-order-form.component.html',
  styleUrls: ['./split-order-form.component.scss']
})
export class SplitOrderFormComponent implements OnInit {
  @Input() maxQty;
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.qty = this._value = x;
  }
  private _value = '';

  /** Form model for the input. */
  qty = '';

  constructor(@Optional() @Host() public popover: SatPopover) { }

  ngOnInit() {
    console.log(this.maxQty)
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.qty = this.value || '');
    }
  }

  onSubmit() {
    if (this.popover && this.qty < this.maxQty) {
      this.popover.close(this.qty);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }
}
