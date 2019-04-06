import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { WarehouseService } from "../services/warehouse.service";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import {
    trigger,
    transition,
    animate,
    style,
    keyframes,
    state
} from "@angular/animations";

interface Warehouse {
    name: string;
    latitude: number;
    longitude: number;
}

@Component({
    selector: "app-warehouses",
    templateUrl: "./warehouses.component.html",
    styleUrls: ["./warehouses.component.scss"],
    animations: [
        trigger("openNewDistritutorModal", [
            transition("* => close", [
                animate(
                    "225ms",
                    keyframes([
                        style({ transform: "scale(1)", offset: 0 }),
                        style({ transform: "scale(1.2)", offset: 0.6 }),
                        style({ transform: "scale(0.1)", offset: 1.0 })
                    ])
                )
            ]),
            transition("* => open", [
                animate(
                    "225ms",
                    keyframes([
                        style({ transform: "scale(0.1)", offset: 0 }),
                        style({ transform: "scale(1.2)", offset: 0.6 }),
                        style({ transform: "scale(1)", offset: 1.0 })
                    ])
                )
            ])
        ]),
        trigger("detailExpand", [
            state(
                "collapsed",
                style({ height: "0px", minHeight: "0", display: "none" })
            ),
            state("expanded", style({ height: "*" })),
            transition(
                "expanded <=> collapsed",
                animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
            )
        ])
    ]
})
export class WarehousesComponent implements OnInit {
    newWarehouseForm: FormGroup;
    distributorModelLoading = false;

    dataSource: any;
    columnsToDisplay: string[] = ["name", "longitude", "latitude"];
    expandedElement: Warehouse;

    @ViewChild("page") paginator: MatPaginator;

    constructor(
        private fb: FormBuilder,
        private warehouseService: WarehouseService
    ) {}

    ngOnInit() {
        this.createForm();
        this.fillTable();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    addWarehouse(formValues) {
        if (this.newWarehouseForm.invalid) {
            return;
        }

        this.distributorModelLoading = true;

        this.warehouseService
            .addWarehouse(formValues)
            .then(res => {
                this.distributorModelLoading = false;

                this.newWarehouseForm.reset();

                // add a new row to table
                let newData = this.dataSource.data;
                if (newData) {
                    newData.push(res);
                } else {
                    newData = [res];
                }

                this.dataSource = new MatTableDataSource(newData);
                this.dataSource.paginator = this.paginator;
            })
            .catch(err => (this.distributorModelLoading = false));
    }
    fillTable() {
        const unsubscribe = this.warehouseService
            .getWarehouses()
            .subscribe(warehouses => {
                if (!warehouses.data()) {
                    this.dataSource = new MatTableDataSource();
                } else {
                    this.dataSource = new MatTableDataSource(Object.values(warehouses.data()));
                }
                setTimeout(() => {
                    this.dataSource.paginator = this.paginator;
                });

                unsubscribe.unsubscribe();
            });
    }

    createForm() {
        this.newWarehouseForm = this.fb.group({
            name: ["", Validators.required],

            latitude: [
                null,
                [
                    Validators.required,
                    Validators.pattern(
                        "[-+]?([1-8]?[0-9](\\.[0-9]+)?|90(\\.0+)?)"
                    )
                ]
            ],
            longitude: [
                null,
                [
                    Validators.required,
                    Validators.pattern(
                        "[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)"
                    )
                ]
            ]
        });
    }

    get name() {
        return this.newWarehouseForm.get("name");
    }
    get latitude() {
        return this.newWarehouseForm.get("latitude");
    }
    get longitude() {
        return this.newWarehouseForm.get("longitude");
    }
}
