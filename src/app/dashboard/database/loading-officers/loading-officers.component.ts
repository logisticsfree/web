import { Component, OnInit } from '@angular/core';
import { LoadingBayService } from '../services/loading-bay.service';

@Component({
  selector: 'app-loading-officers',
  templateUrl: './loading-officers.component.html',
  styleUrls: ['./loading-officers.component.scss']
})
export class LoadingOfficersComponent implements OnInit {

  bays: any;
  officers: any;
  officer = {
    name: '',
    prefBay: '',
  };

  constructor(private bayService: LoadingBayService) { }

  ngOnInit() {
    this.bayService.getBays().subscribe(bays => {
      this.bays = bays;
    });
    this.bayService.getOfficers().subscribe(officers => {
      this.officers = officers;
    });
  }

  addOfficer(form: any) {
    this.bayService.addOfficer(this.officer).subscribe(res => {
      form.reset();
    });
  }
}
