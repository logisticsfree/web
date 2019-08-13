import { Component, OnInit } from '@angular/core';
import { BayService } from '../services/bay.service';

@Component({
  selector: 'app-bayhome',
  templateUrl: './bayhome.component.html',
  styleUrls: ['./bayhome.component.scss']
})
export class BayhomeComponent implements OnInit {

  officers: any;
  bays: any;
  constructor(private bayService: BayService) { }

  ngOnInit() {
    this.bayService.getOfficers().subscribe(officers => {
      this.officers = officers;
    });
    this.bayService.getBays().subscribe(bays => {
      this.bays = bays;
    });
  }

  assignOfficer(id: string, bay: string) {
    this.bayService.assignOfficer(id, bay).subscribe();

  }

}
