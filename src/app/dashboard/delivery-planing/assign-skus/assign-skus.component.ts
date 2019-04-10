import {
    Component,
    OnInit,
    Input,
    ViewChild,
    OnChanges,
    SimpleChanges,
    Output
} from '@angular/core';
import { OrderService } from '../services/order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
    trigger,
    style,
    transition,
    animate,
    keyframes
} from '@angular/animations';
import { SkuService } from '../../database/services/sku.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { EventEmitter } from '@angular/core';
import { SKU } from 'src/app/models/SKU';

@Component({
    selector: 'app-assign-skus',
    templateUrl: './assign-skus.component.html',
    styleUrls: ['./assign-skus.component.scss'],
    animations: [
        trigger('openNewSKUModal', [
            transition('* => close', [
                animate('225ms', keyframes([
                    style({ transform: 'scale(1)', offset: 0 }),
                    style({ transform: 'scale(1.2)', offset: 0.6 }),
                    style({ transform: 'scale(0.1)', offset: 1.0 }),
                ]))
            ]),
            transition('* => open', [
                animate('225ms', keyframes([
                    style({ transform: 'scale(0.1)', offset: 0 }),
                    style({ transform: 'scale(1.2)', offset: 0.6 }),
                    style({ transform: 'scale(1)', offset: 1.0 })
                ]))
            ]),
        ]),
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
        ])
    ]
})
export class AssignSkusComponent implements OnInit, OnChanges {
    @Input() selectedOrder: any;
    @Output() skuAdded = new EventEmitter();
    @Output() skuDeleted = new EventEmitter();

    addSKUForm: FormGroup;
    addSKUFormLoading = false;
    unassignSKULoading = {};
    showNewSkuModal = false;

    dataSource;
    columnsToDisplay: string[] = [
        'item',
        'name',
        'volume',
        'weight',
        'value',
        'qty',
        'actions'
    ];

    SKUs: SKU[];

    @ViewChild('page') paginator: MatPaginator;
    constructor(
        private fb: FormBuilder,
        private skuService: SkuService,
        private orderService: OrderService
    ) { }

    ngOnInit() {
        if (!this.selectedOrder.skus) {
            this.dataSource = new MatTableDataSource([]);
        } else {
            this.dataSource = new MatTableDataSource(
                Object.values(this.selectedOrder.skus)
            );
        }
        this.dataSource.paginator = this.paginator;
        // console.log('assign-sku', this.dataSource);

        this.createNewSKUForm();
        const unc = this.skuService.getSKUs().subscribe(skus => {
            this.SKUs = Object.values(skus);

            unc.unsubscribe();
        });

        this.addSKUForm.get('code').valueChanges.subscribe(val => {
            if (!val) return;

            Object.keys(val).forEach(key => {
                if (key != 'code')
                    this.addSKUForm.patchValue({ [key]: val[key] });
            });
        });
    }
    ngOnChanges(changes: SimpleChanges) {
        if (!this.selectedOrder.skus) {
            this.dataSource = new MatTableDataSource([]);
        } else {
            this.dataSource = new MatTableDataSource(
                Object.values(this.selectedOrder.skus)
            );
        }

        this.dataSource.paginator = this.paginator;
    }

    applySKUFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    unassignSKU(invoice, sku) {
        this.unassignSKULoading[sku.code] = true;
        this.orderService.unassignSKU(invoice, sku).then(res => {
            let updatedData = this.dataSource.data;

            for (let i = 0; i < updatedData.length; i++) {
                if (updatedData[i].code == sku.code) {
                    updatedData.splice(i, 1);
                }
            }
            this.dataSource = new MatTableDataSource(updatedData);
            this.skuDeleted.emit({ invoice: this.selectedOrder.invoice, sku });
            this.unassignSKULoading[sku.code] = false;
        });
    }
    assignSKU(invoice, values) {
        this.addSKUFormLoading = true;
        this.orderService
            .assignSKU(invoice, values)
            .then(res => {
                const newRow = this.selectedOrder;
                newRow.skus[res.code] = res;

                // update skus table
                this.dataSource = new MatTableDataSource(
                    Object.values(this.selectedOrder.skus)
                );
                this.dataSource.paginator = this.paginator;

                // send new row to orders table
                this.skuAdded.emit(newRow);

                this.addSKUFormLoading = false;
                this.showNewSkuModal = false;
                this.addSKUForm.reset();
            })
            .catch(err => {
                this.addSKUFormLoading = false;
                this.showNewSkuModal = false;
            });
    }

    createNewSKUForm() {
        this.addSKUForm = this.fb.group({
            code: [
                'Please Select..',
                [Validators.required, Validators.pattern('((?!Select).)*')]
            ],
            name: ['', Validators.required],
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
            ],
            qty: [
                '',
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.pattern('[0-9.]*')
                ]
            ]
        });
    }

    get code() {
        return this.addSKUForm.get('code');
    }
    get name() {
        return this.addSKUForm.get('name');
    }
    get volume() {
        return this.addSKUForm.get('volume');
    }
    get weight() {
        return this.addSKUForm.get('weight');
    }
    get value() {
        return this.addSKUForm.get('value');
    }

    get qty() {
        return this.addSKUForm.get('qty');
    }
}
