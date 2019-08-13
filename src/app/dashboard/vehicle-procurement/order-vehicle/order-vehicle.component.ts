import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import * as firebase from 'firebase';

import { Warehouse } from 'src/app/models/Warehouse';
import { GeofireService } from 'src/app/services/geofire.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { flatMap, tap, map } from 'rxjs/operators';
import { WarehouseService } from '../../database/services/warehouse.service';
import { TruckService } from '../services/truck.service';
import { TripService } from '../services/trip.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-order-vehicle',
    templateUrl: './order-vehicle.component.html',
    styleUrls: ['./order-vehicle.component.scss'],
    animations: [
        trigger('openOrderVehiclesModal', [
            transition('* => close', [
                animate('225ms', keyframes([
                    style({ transform: 'scale(1)', opacity: 1, offset: 0 }),
                    style({ transform: 'scale(1.2)', opacity: .5, offset: 0.6 }),
                    style({ transform: 'scale(0.1)', opacity: 0, offset: 1.0 }),
                ]))
            ]),
            transition('* => open', [
                animate('225ms', keyframes([
                    style({ transform: 'scale(0.1)', opacity: 0, offset: 0 }),
                    style({ transform: 'scale(1.2)', opacity: .5, offset: 0.6 }),
                    style({ transform: 'scale(1)', opacity: 1, offset: 1.0 })
                ]))
            ]),
        ])
    ]
})
export class OrderVehicleComponent implements OnInit {
    orderVehiclesForm: FormGroup;
    warehouses: Warehouse[];
    availableTrucks: any;

    constructor(
        private fb: FormBuilder,
        private gf: GeofireService,
        private afs: AngularFirestore,
        private tripService: TripService,
        private warehouseService: WarehouseService
    ) { }

    ngOnInit() {
        this.warehouseService.getWarehouses().subscribe(warehouses => {
            this.warehouses = Object.values(warehouses);
        });
        this.createForm();
    }

    sendOrder(truck) {
        console.log(truck);
        this.tripService
            .addPendingTrip(truck, this.date.value, this.time.value, this.warehouse.value)
            .toPromise().then(res => console.log(res));

    }

    placeOrder(formValues) {
        if (this.orderVehiclesForm.invalid) { return null; }
        const center = formValues.warehouse;
        const volume = Number.parseFloat(formValues.volume);
        const amount = Number.parseFloat(formValues.amount);
        const type = formValues.type;

        this.gf.getDriverIDsWithinRadius([center.latitude, center.longitude], 160);

        let geoResult: string[];
        this.gf.IDs.pipe(  // get driver IDs closer to the warehouse
            flatMap(IDs => {   // map them to driver Docs & filter by volume
                geoResult = IDs;
                return this.filterTrucksByVolumeAndType(IDs, volume, type, amount);
            }),
            map(trucks => { // get the intersection of (closer & compatible volume) trucks
                const filterdByVolume = trucks.filter(truck => {
                    return geoResult.includes(truck.payload.doc.id);
                });

                return filterdByVolume;
            }),
        ).subscribe(availableTrucks => {
            return this.availableTrucks = availableTrucks.map(truck => truck.payload.doc.data());
        });

        // this.orderVehiclesForm.reset();
    }

    filterTrucksByVolumeAndType(trucksIDs: string[], volume: number, type: string, amount: number) {
        // TODO: optimize the query,
        // instead of query for volume for whole db, only query for geoResults (use truckIDs)
        return this.afs.collection('drivers', driverRef => {
            return driverRef.where('truck.volume', '>=', volume)
                .where('truck.type', '==', type)
                .where('available', '==', true);
        }).snapshotChanges();
    }

    createForm() {
        this.orderVehiclesForm = this.fb.group({
            volume: [
                '',
                [Validators.required, Validators.min(0), Validators.pattern('[0-9.]*')]
            ],
            amount: [
                '',
                [Validators.required, Validators.min(0), Validators.pattern('[0-9.]*')]
            ],
            date: [
                '',
                [Validators.required, validateDate()]
            ],
            time: [
                '',
                [Validators.required]
            ],
            warehouse: [
                'Please Select...',
                [Validators.required, Validators.pattern('((?!Select).)*')]
            ],
            type: [
                'Non A/C',
                [Validators.required]
            ],
        });
    }

    get volume() { return this.orderVehiclesForm.get('volume'); }
    get date() { return this.orderVehiclesForm.get('date'); }
    get time() { return this.orderVehiclesForm.get('time'); }
    get amount() { return this.orderVehiclesForm.get('amount'); }
    get warehouse() { return this.orderVehiclesForm.get('warehouse'); }
    get type() { return this.orderVehiclesForm.get('type'); }
}
export function validateDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (new Date(control.value) < new Date()) {
            return { date: true };
        }
        return null;
    };
}
