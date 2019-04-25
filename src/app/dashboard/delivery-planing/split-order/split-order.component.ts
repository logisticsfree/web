import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { OrderService } from '../services/order.service';
import { Order } from 'src/app/models/Order';
import { SKU } from 'src/app/models/SKU';

@Component({
  selector: 'app-split-order',
  templateUrl: './split-order.component.html',
  styleUrls: ['./split-order.component.scss']
})
export class SplitOrderComponent implements OnInit {

  dataSource: any;
  columnsToDisplay = ['code', 'name', 'qty', 'actions'];
  private _order: Order;

  @Output() onSplit: EventEmitter<any> = new EventEmitter<any>();

  @Input() invoiceNo;
  @Input() set order(order) {
  	const skus = Object.values(order.skus);

  	if (skus.length) {
	    this.dataSource = new MatTableDataSource(skus);
  	}
  	this._order = order;
  }
  get order() { return this._order;}

  constructor(private orderService: OrderService) { }

  ngOnInit() {

  }

  splitOrder(sku, qty) {
  	if (!qty) return;

  	let newOrder = Object.assign({}, this.order);
  	newOrder.skus = {};
  	newOrder.status = 0;
  	newOrder.invoice = this.getNewInvoiceID(this.order);
  	newOrder.skus[sku.code] = Object.assign({}, sku);
  	newOrder.skus[sku.code].qty = qty;

  	sku.qty -= qty;

  	this.orderService.addOrder(newOrder);
  	this.onSplit.emit(this.order);

  }

  // generates a new id for the invoice according to the old one
  getNewInvoiceID(order) {
  	let name = order.invoice;
  	let newName = '';
  	let seperator = name.charAt(name.length - 2);
  	let lastChar = name.charAt(name.length - 1)
  	let newLastChar = '';
  	if (seperator == '-') {
  		newLastChar = String.fromCharCode(lastChar.charCodeAt() + 1)
  		newName = name.replace(/.$/, newLastChar)
  	} else {
  		newName = name + '-a';
  	}
  	return newName;
  }

}
