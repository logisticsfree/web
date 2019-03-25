import {
    Component,
    OnInit,
    Input,
    ViewChild,
    OnChanges,
    SimpleChanges,
    Output
} from '@angular/core';
import { Order, OrderService } from '../services/order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/animations';
import { SkuService, SKU } from '../../database/services/sku.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'app-assign-skus',
    templateUrl: './assign-skus.component.html',
    styleUrls: ['./assign-skus.component.scss'],
    animations: [
        trigger('openNewSKUModal', [
            state(
                'close',
                style({
                    width: '0px'
                })
            ),
            state('open', style({ width: '*' })),
            transition(
                'close <=> open',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            )
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
    // TODO: add newly added SKU to ordersTable
    @Input() selectedOrder: any;
    @Output() skuAdded = new EventEmitter();

    addSKUForm: FormGroup;
    addSKUFormLoading = false;
    showNewSkuModal = false;

    dataSource;
    columnsToDisplay: string[] = [
        'item',
        'name',
        'volume',
        'weight',
        'value',
        'qty'
    ];

    SKUs: SKU[];

    @ViewChild('page') paginator: MatPaginator;
    constructor(
        private fb: FormBuilder,
        private skuService: SkuService,
        private orderService: OrderService
    ) {}

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
            this.SKUs = Object.values(skus.data());

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
        // console.log(this.selectedOrder);

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
    assignSKU(invoice, values) {
        this.addSKUFormLoading = true;
        this.orderService
            .assignSKU(invoice, values)
            .then(res => {
                const newData = this.dataSource.data;
                newData.push(res);
                this.dataSource = new MatTableDataSource(newData);
                this.dataSource.paginator = this.paginator;

                const newRow = this.selectedOrder;
                console.log('emit', res);
                newRow.skus[res.code] = res;
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
}
