import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';
import {
    MatTableDataSource,
    MatPaginator,
} from '@angular/material';
import { DistributorService } from '../../database/services/distributor.service';
import {
    trigger, transition,
    style, animate, state
} from '@angular/animations';
import { Order } from 'src/app/models/Order';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateY(-100%)' }),
                animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
            ]),
            transition(':leave', [
                animate(
                    '200ms ease-in',
                    style({ transform: 'translateY(-100%)' })
                )
            ])
        ]),
        trigger('slideInOutFromLeft', [
            transition(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('200ms ease-in', style({ transform: 'translateX(0%)' }))
            ]),
            transition(':leave', [
                animate(
                    '200ms ease-in',
                    style({ transform: 'translateX(100%)' })
                )
            ])
        ]),
        trigger('moveLeft', [
            state('left', style({})),
            state('right', style({})),
            transition('left <=> right', animate('2000ms ease-in'))
        ])
    ]
})
export class OrdersComponent implements OnInit {
    newOrderForm: FormGroup;
    newOrderFormLoading;
    dataSource;
    SKUs;
    orders: Order[];
    distributors;
    warehouses;

    showNewOrderForm = true;
    selectedOrder: Order;
    orderTableState = 'right';

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
        private distributorService: DistributorService
    ) { }

    @ViewChild('ordersPaginator') orderPaginator: MatPaginator;

    ngOnInit() {
        this.createForm();
        this.fillTable();
        const unc = this.distributorService
            .getDistributors()
            .subscribe(dists => {
                this.distributors = Object.values(dists);
                unc.unsubscribe();
            });
    }
    unassignSKU(sku) {
        const newData = this.dataSource.data;

        for (let i = 0; i < newData.length; i++) {
            if (sku.invoice === newData[i].invoice) {
                delete newData[i].skus[sku.sku.code];
            }
        }

        this.dataSource = new MatTableDataSource(newData);
    }
    addNewlyAddedSkuToOrdersTable(row) {
        const newData = this.dataSource.data;
        for (let i = 0; i < newData.length; i++) {
            if (row.invoice === newData[i].invoice) { newData[i] = row; }
        }

        console.log(this.selectedOrder, row);
        this.selectedOrder = row;
        this.dataSource = new MatTableDataSource(newData);
    }

    selectInvoice(row) {
        this.showNewOrderForm = false;
        this.selectedOrder = row;
        // console.log(row);
    }
    applyOrderFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    addOrder(formValues) {
        if (this.newOrderForm.invalid) {
            return;
        }
        // console.log(formValues);


        this.newOrderFormLoading = true;
        this.orderService
            .addOrder(formValues)
            .then(res => {
                // console.log('hit');

                this.newOrderFormLoading = false;

                // add a new row to table
                const newData = this.dataSource.data;
                newData.push(res);
                this.dataSource = new MatTableDataSource(newData);
                this.dataSource.paginator = this.orderPaginator;

                this.newOrderForm.reset();
            })
            .catch(err => (this.newOrderFormLoading = false));
    }
    fillTable() {
        const unsubscribe = this.orderService.getOrders().subscribe(orders => {
            this.orders = Object.values(orders);
            this.dataSource = new MatTableDataSource(
                Object.values(orders)
            );
            // console.log(this.dataSource);

            this.dataSource.paginator = this.orderPaginator;
            // unsubscribe.unsubscribe();
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
