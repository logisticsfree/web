import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
@Component({
  selector: 'app-order-truck',
  templateUrl: './order-truck.component.html',
  styleUrls: ['./order-truck.component.scss']
})

export class OrderTruckComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

submit1()
{
	this.router.navigateByUrl('/vehicle-procurement/(procurement:order-specific-veficle)');


}
submit()
{
	this.router.navigateByUrl('/vehicle-procurement/(procurement:order-vehicle)');
}

  

}
