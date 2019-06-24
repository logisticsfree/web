import { Component, OnInit } from '@angular/core';
import { OrderedTrucksService } from '../services/ordered-trucks.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  orderedTrucks: any;

  constructor(private ots: OrderedTrucksService) { }

  ngOnInit() {
    this.ots.getOrderedTrucks().subscribe(trucks => {
      this.orderedTrucks = trucks;
    })
  }

}
