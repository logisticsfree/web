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
    newOrderFormeLoading;
    dataSource;
    SKUs;
    distributors;

    columnsToDisplay: string[] = [
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

    @ViewChild('page') paginator: MatPaginator;

    ngOnInit() {
        this.createForm();
        this.fillTable();
        const unc = this.distributorService
            .getDistributors()
            .subscribe(dists => {
                this.distributors = Object.values(dists.data());
                unc.unsubscribe();
            });
        // this.skuService.getSKUs().subscribe(skus => {
        //     this.SKUs = Object.values(skus.data());
        // });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
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
                const newData = this.dataSource.data;
                newData.push(res);
                this.dataSource = new MatTableDataSource(newData);
                this.dataSource.paginator = this.paginator;

                this.newOrderForm.reset();
            })
            .catch(err => (this.newOrderFormeLoading = false));
    }
    fillTable() {
        const unsubscribe = this.orderService.getOrders().subscribe(skus => {
            this.dataSource = new MatTableDataSource(
                Object.values(skus.data())
            );

            setTimeout(() => {
                this.dataSource.paginator = this.paginator;
            });

            console.log(this.dataSource.data);

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
