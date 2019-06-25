import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, map, tap, flatMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderedTrucksService } from '../services/ordered-trucks.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { BayService } from '../services/bay.service';

@Component({
  selector: 'app-truck-details',
  templateUrl: './truck-details.component.html',
  styleUrls: ['./truck-details.component.scss']
})
export class TruckDetailsComponent implements OnInit {
  truck: any;
  dataSource: any;
  columnsToDisplay: any;
  selectedBay: any;
  bays: any;

  constructor(private afs: AngularFirestore,
    private router: ActivatedRoute,
    private ots: OrderedTrucksService,
    private bayService: BayService) { }

  @ViewChild('page') paginator: MatPaginator;

  ngOnInit() {
    this.bayService.getBays().subscribe(bays => {
      this.bays = bays;
    })
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

  assignToBay(bayID) {
    const bay = this.bays.filter(bay => bay.id == bayID);
    this.ots.assignToBay(this.truck.truck.uid, bay[0]).subscribe();
  }
}
