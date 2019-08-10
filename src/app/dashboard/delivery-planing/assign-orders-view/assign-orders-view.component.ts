import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, flatMap } from 'rxjs/operators';
import { OrderedTrucksService } from '../../bay-operations/services/ordered-trucks.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-assign-orders-view',
  templateUrl: './assign-orders-view.component.html',
  styleUrls: ['./assign-orders-view.component.scss'],
  animations: [
    trigger('slideInOutFromLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ transform: 'translateX(100%)' })
        )
      ])
    ]),
    trigger('grow', [
      state(
        'open',
        style({
          // overflow: 'hidden',
          height: '*',
          width: '*'
        })
      ),
      state(
        'close',
        style({
          // opacity: '0',
          // overflow: 'hidden',
        })
      ),
      transition('in <=> out', animate('400ms ease-in-out'))
    ])
  ]
})
export class AssignOrdersViewComponent implements OnInit {

  truck: any;

  constructor(private aRouter: ActivatedRoute,
    private router: Router,
    private truckService: OrderedTrucksService) { }

  ngOnInit() {
    this.aRouter.queryParams.pipe(
      map(params => params["tripID"]),
      flatMap(tripID => this.truckService.getTruckDetails(tripID))
    ).subscribe(truck => {
      console.log(truck);
      if (!truck) {
        // TODO: replace with appropriate error msg
        this.router.navigate(['/delivery-planing/(delivery:create-trip)'])
        return;
      }
      this.truck = truck;

      let orders = Object.values(this.truck.orders);
      // this.dataSource = new MatTableDataSource(orders);
      // this.columnsToDisplay = ['invoice', 'locations', 'volume', 'weight', 'value'];
      // this.dataSource.paginator = this.paginator;
    });
  }
  // TODO : replace with firebase Function
  getTotalWeight(truck) {
    if (!truck.orders) return 0;
    let totalWeight = 0;
    Object.values(truck.orders).forEach(order => {
      totalWeight += parseFloat(order['weight']);
    });
    return totalWeight;
  }

  // TODO : replace with firebase Function
  getTotalVolume(truck) {
    if (!truck.orders) return 0;
    let totalVolume = 0;
    Object.values(truck.orders).forEach(order => {
      totalVolume += parseFloat(order['volume']);
    });
    return totalVolume;
  }
  getOrders(truck) {
    return truck.orders ? Object.values(truck.orders) : [];
  }
}
