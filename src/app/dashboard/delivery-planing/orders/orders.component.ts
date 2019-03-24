import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Order, OrderService } from '../services/order.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SkuService } from '../../database/services/sku.service';
import { DistributorService } from '../../database/services/distributor.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
    newOrderForm: FormGroup;
    addSKUForm: FormGroup;
    newOrderFormeLoading;
    ordersTableDataSource;
    skusTableDataSource;
    SKUs;
    distributors;

    showNewOrderForm = true;
    showNewSKUModal = false;
    selectedOrder: Order;

    ordersColumnsToDisplay: string[] = [
        'invoice',
        'distributor',
        'volume',
        'weight',
        'value'
    ];

    expandedElement: Order | null;

    constructor(
        private fb: FormBuilder,
        private orderService: OrderService,
        private skuService: SkuService,
        private distributorService: DistributorService
    ) {}

    @ViewChild('ordersPaginator') orderPaginator: MatPaginator;
    @ViewChild('skusPaginator') skuPaginator: MatPaginator;

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

    selectInvoice(row) {
        this.showNewOrderForm = false;
        this.selectedOrder = row;
        this.skusTableDataSource = new MatTableDataSource(row.skus);
        console.log(this.skusTableDataSource);
    }
    applyOrderFilter(filterValue: string) {
        this.ordersTableDataSource.filter = filterValue.trim().toLowerCase();
    }
    applySKUFilter(filterValue: string) {
        this.skusTableDataSource.filter = filterValue.trim().toLowerCase();
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
                Object.values(orders.data())
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
                'Please Select..',
                [Validators.required, Validators.pattern('((?!Select).)*')]
            ],
            invoice: ['', Validators.required],
            volume: [
                '',
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.pattern('[0-9.]*')
                ]
            ],
            weight: [
                '',
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.pattern('[0-9.]*')
                ]
            ],
            value: [
                '',
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.pattern('[0-9.]*')
                ]
            ]
        });
    }

    get distributor() {
        return this.newOrderForm.get('distributor');
    }
    get invoice() {
        return this.newOrderForm.get('invoice');
    }
    get volume() {
        return this.newOrderForm.get('volume');
    }
    get weight() {
        return this.newOrderForm.get('weight');
    }
    get value() {
        return this.newOrderForm.get('value');
    }
}
