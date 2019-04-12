import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
	orders: Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  	this.orderService.getOrders().subscribe(orders => {
  		// console.log(orders);
  		this.orders = orders;
  	});
  }

}
