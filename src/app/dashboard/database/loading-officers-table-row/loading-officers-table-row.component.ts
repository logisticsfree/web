import { Component, OnInit, Input } from '@angular/core';
import { LoadingBayService } from '../services/loading-bay.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tr[app-loading-officers-table-row]',
  templateUrl: './loading-officers-table-row.component.html',
  styleUrls: ['./loading-officers-table-row.component.scss']
})
export class LoadingOfficersTableRowComponent implements OnInit {

  constructor(private bayService: LoadingBayService) { }

  showNameField = false;
  showBayField = false;
  bays: any;

  @Input() officer: any;

  ngOnInit() {
    this.bayService.getBays().subscribe(bays => {
      this.bays = bays;
    });
  }

  removeBay(id: string) {
    this.bayService.removeOfficer(id).subscribe();
  }

  saveBay(id: string, bay: string) {
    const officer = { id, prefBay: bay };
    this.bayService.saveOfficer(officer).subscribe(res => {
      this.toggleBayField();
    });
  }

  saveOfficer(id: string, name: string) {
    if (!name) { return; }
    const officer = { id, name };
    this.bayService.saveOfficer(officer).subscribe(res => {
      this.toggleNameField();
    });
  }

  toggleNameField() {
    this.showNameField = !this.showNameField;
  }
  toggleBayField() {
    this.showBayField = !this.showBayField;
  }
}
