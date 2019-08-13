import { Component, OnInit } from '@angular/core';
import { LoadingBayService } from '../services/loading-bay.service';

@Component({
  selector: 'app-loading-bay',
  templateUrl: './loading-bay.component.html',
  styleUrls: ['./loading-bay.component.scss']
})
export class LoadingBayComponent implements OnInit {

  constructor(private bayService: LoadingBayService) { }

  originalTypes = ['20ft', '50ft', '10.5ft', '16ft'];
  vehicleTypes = this.originalTypes.slice();
  newBay = { types: {} };
  showAddBayCard = true;

  allBays: any;

  ngOnInit() {
    this.bayService.getBays().subscribe(bays => {
      this.allBays = bays;
    });
  }

  unassignType(bayID: string, types: any, type: string) {

    delete types[type];

    this.bayService.unassignType(bayID, types, type).subscribe();
  }
  assignType(bayID: string, typeBox) {
    const type = typeBox.options[typeBox.selectedIndex].value;
    if (type === 'Please Select...') { return; }

    this.bayService.assignType(bayID, type).subscribe();
  }

  toggleAddBayCard() {
    this.showAddBayCard = !this.showAddBayCard;
  }

  unassignTypeToNewBay(type: string) {
    delete this.newBay.types[type];
    this.vehicleTypes.push(type);
  }

  assignTypeToNewBay(typeBox) {
    const type = typeBox.options[typeBox.selectedIndex].value;
    if (type === 'Please Select...') { return; }

    this.newBay['types'][type] = true;
    const index = this.vehicleTypes.indexOf(type);
    if (index > -1) {
      this.vehicleTypes.splice(index, 1);
    }
  }

  getAssignedTypes(bay) {
    return Object.keys(bay['types']);
  }

  removeBay(bayID) {
    this.bayService.removeBay(bayID).subscribe();
  }
  addNewBay() {
    if (!this.newBay['name']) { return; }
    if (!Object.keys(this.newBay.types).length) { return; }


    this.bayService.addBay(this.newBay).subscribe(res => {
      this.newBay = { types: {} };
      this.vehicleTypes = this.originalTypes.slice();
    });
  }

}
