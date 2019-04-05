import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Order, OrderService } from "../services/order.service";
import {
    MatTableDataSource,
    MatPaginator,
    MatTab,
    MatTable
} from "@angular/material";
import { SkuService } from "../../database/services/sku.service";
import { DistributorService } from "../../database/services/distributor.service";
import { WarehouseService } from "../../database/services/warehouse.service";
import {
    trigger,
    transition,
    style,
    animate,
    state
} from "@angular/animations";

@Component({
    selector: "app-orders",
    templateUrl: "./orders.component.html",
    styleUrls: ["./orders.component.scss"],
    animations: [
        trigger("slideInOut", [
            transition(":enter", [
                style({ transform: "translateY(-100%)" }),
                animate("200ms ease-in", style({ transform: "translateY(0%)" }))
            ]),
            transition(":leave", [
                animate(
                    "200ms ease-in",
                    style({ transform: "translateY(-100%)" })
                )
            ])
        ]),
        trigger("slideInOutFromLeft", [
            transition(":enter", [
                style({ transform: "translateX(100%)" }),
                animate("200ms ease-in", style({ transform: "translateX(0%)" }))
            ]),
            transition(":leave", [
                animate(
                    "200ms ease-in",
                    style({ transform: "translateX(100%)" })
                )
            ])
        ]),
        trigger("moveLeft", [
            state("left", style({})),
            state("right", style({})),
            transition("left <=> right", animate("2000ms ease-in"))
        ])
    ]
})
export class OrdersComponent implements OnInit {
    newOrderForm: FormGroup;
    addSKUForm: FormGroup;
    newOrderFormeLoading;
    ordersTableDataSource;
    SKUs;
    distributors;
    warehouses;

    showNewOrderForm = true;
    showNewSKUModal = false;
    selectedOrder: Order;
    orderTableState = "right";

    ordersColumnsToDisplay: string[] = [
        "invoice",
        "distributor",
        "volume",
        "weight",
        "value"
    ];

    expandedElement: Order | null;

    constructor(
        private fb: FormBuilder,
        private orderService: OrderService,
        private distributorService: DistributorService
    ) {}

    @ViewChild("ordersPaginator") orderPaginator: MatPaginator;

    ngOnInit() {
        this.createForm();
        this.fillTable();
        const unc = this.distributorService
            .getDistributors()
            .subscribe(dists => {
                this.distributors = Object.values(dists.data());
                unc.unsubscribe();
            });
    }
    unassignSKU(sku) {
        let newData = this.ordersTableDataSource.data;

        for (let i = 0; i < newData.length; i++) {
            if (sku.invoice == newData[i].invoice)
                delete newData[i].skus[sku.sku.code];
        }

        this.ordersTableDataSource = new MatTableDataSource(newData);
    }
    addNewlyAddedSkuToOrdersTable(row) {
        const newData = this.ordersTableDataSource.data;
        for (let i = 0; i < newData.length; i++) {
            if (row.invoice == newData[i].invoice) newData[i] = row;
        }

        console.log(this.selectedOrder, row);
        this.selectedOrder = row;
        this.ordersTableDataSource = new MatTableDataSource(newData);
    }

    selectInvoice(row) {
        this.showNewOrderForm = false;
        this.selectedOrder = row;
        // console.log(row);
    }
    applyOrderFilter(filterValue: string) {
        this.ordersTableDataSource.filter = filterValue.trim().toLowerCase();
    }

    addOrder(formValues) {
        if (this.newOrderForm.invalid) {
            return;
        }

        this.newOrderFormeLoading = true;
        this.orderService
            .addOrder(formValues)
            .then(res => {
                this.newOrderFormeLoading = false;

                // add a new row to table
                const newData = this.ordersTableDataSource.data;
                newData.push(res);
                this.ordersTableDataSource = new MatTableDataSource(newData);
                this.ordersTableDataSource.paginator = this.orderPaginator;

                this.newOrderForm.reset();
            })
            .catch(err => (this.newOrderFormeLoading = false));
    }
    fillTable() {
        const unsubscribe = this.orderService.getOrders().subscribe(orders => {
            this.ordersTableDataSource = new MatTableDataSource(
                Object.values(orders)
            );

            setTimeout(() => {
                this.ordersTableDataSource.paginator = this.orderPaginator;
            });

            unsubscribe.unsubscribe();
        });
    }

    createForm() {
        this.newOrderForm = this.fb.group({
            distributor: [
                "Please Select..",
                [Validators.required, Validators.pattern("((?!Select).)*")]
            ],
            invoice: ["", Validators.required],
            volume: [
                "",
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.pattern("[0-9.]*")
                ]
            ],
            weight: [
                "",
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.pattern("[0-9.]*")
                ]
            ],
            value: [
                "",
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.pattern("[0-9.]*")
                ]
            ]
        });
    }

    get distributor() {
        return this.newOrderForm.get("distributor");
    }
    get invoice() {
        return this.newOrderForm.get("invoice");
    }
    get volume() {
        return this.newOrderForm.get("volume");
    }
    get weight() {
        return this.newOrderForm.get("weight");
    }
    get value() {
        return this.newOrderForm.get("value");
    }
}
