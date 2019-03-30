import { Component, OnInit, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
  keyframes
} from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkuService } from '../services/sku.service';
import { SKU } from '../services/sku.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
  styleUrls: ['./sku.component.scss'],
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
    ])
  ]
})
export class SkuComponent implements OnInit {
  newSKUForm: FormGroup;

  toggleNewSkuModal = false;
  skuModelLoading = false;

  dataSource: any;
  columnsToDisplay: any;
  expandedElement: SKU | null;

  @ViewChild('page') paginator: MatPaginator;

  constructor(private fb: FormBuilder, private skuService: SkuService) { }

  ngOnInit() {
    this.createForm();
    this.fillTable();
    // this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addSKU(formValues) {
    if (this.newSKUForm.invalid) {
      return;
    }

    this.skuModelLoading = true;
    this.skuService
      .addSku(formValues)
      .then(res => {
        this.skuModelLoading = false;
        this.toggleNewSkuModal = false;

        // add a new row to table
        const newData = this.dataSource.data;
        newData.push(res);
        this.dataSource = new MatTableDataSource(newData);
        this.dataSource.paginator = this.paginator;

        this.newSKUForm.reset();
      })
      .catch(err => (this.skuModelLoading = false));
  }

  fillTable() {
    const unsubscribe = this.skuService.getSKUs().subscribe(skus => {
      this.dataSource = new MatTableDataSource(Object.values(skus.data()));
      this.columnsToDisplay = Object.keys(this.dataSource.data[0]);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });

      unsubscribe.unsubscribe();
    });
  }

  createForm() {
    this.newSKUForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      volume: [
        '',
        [Validators.required, Validators.min(0), Validators.pattern('[0-9.]*')]
      ],
      weight: [
        '',
        [Validators.required, Validators.min(0), Validators.pattern('[0-9.]*')]
      ],
      value: [
        '',
        [Validators.required, Validators.min(0), Validators.pattern('[0-9.]*')]
      ]
    });
  }

  get code() {
    return this.newSKUForm.get('code');
  }
  get name() {
    return this.newSKUForm.get('name');
  }
  get volume() {
    return this.newSKUForm.get('volume');
  }
  get weight() {
    return this.newSKUForm.get('weight');
  }
  get value() {
    return this.newSKUForm.get('value');
  }
}
