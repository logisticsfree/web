import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, map, tap, flatMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderedTrucksService } from '../services/ordered-trucks.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-truck-details',
  templateUrl: './truck-details.component.html',
  styleUrls: ['./truck-details.component.scss']
})
export class TruckDetailsComponent implements OnInit {
  truck: any;
  dataSource: any;
  columnsToDisplay: any;

  constructor(private afs: AngularFirestore,
    private router: ActivatedRoute,
    private ots: OrderedTrucksService) { }

  @ViewChild('page') paginator: MatPaginator;

  ngOnInit() {
    this.router.queryParams.pipe(
      map(params => params['driverID']),
      flatMap(driverID => this.ots.getTruckDetails(driverID))
    ).subscribe(truck => {
      this.truck = truck;

      let orders = Object.values(this.truck.orders);
      this.dataSource = new MatTableDataSource(orders);
      this.columnsToDisplay = ['invoice', 'locations', 'volume', 'weight', 'value'];
      this.dataSource.paginator = this.paginator;
    });
  }
}
