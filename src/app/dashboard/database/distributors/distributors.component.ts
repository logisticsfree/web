import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';
import {
  DistributorService,
} from '../services/distributor.service';
import { Distributor } from 'src/app/models/Distributor';

@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrls: ['./distributors.component.scss'],
  animations: [
    trigger('openNewDistritutorModal', [
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
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class DistributorsComponent implements OnInit {
  newDistributorForm: FormGroup;

  toggleNewDistributorModal = false;
  distributorModelLoading = false;

  dataSource: any;
  columnsToDisplay: any;
  expandedElement: Distributor;

  @ViewChild('page') paginator: MatPaginator;
  constructor(
    private fb: FormBuilder,
    private distributorService: DistributorService
  ) { }

  ngOnInit() {
    this.createForm();
    this.fillTable();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateDistributor(id, key, value) {
    if (!id || !key || !value) return;
    this.distributorService.updateDistributor(id, key, parseFloat(value) || value);
  }

  addDistributor(formValues) {
    if (this.newDistributorForm.invalid) {
      return;
    }

    this.distributorModelLoading = true;
    this.distributorService
      .addDistributor(formValues)
      .then(res => {
        this.distributorModelLoading = false;
        this.toggleNewDistributorModal = false;
        this.newDistributorForm.reset();
      })
      .catch(err => (this.distributorModelLoading = false));
  }

  fillTable() {
    const unsubscribe = this.distributorService
      .getDistributors()
      .subscribe(distributors => {
        this.dataSource = new MatTableDataSource(distributors);
        this.columnsToDisplay = Object.keys(this.dataSource.data[0]).reverse();

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });

        // unsubscribe.unsubscribe();
      });
  }

  createForm() {
    this.newDistributorForm = this.fb.group({
      name: ['', Validators.required],

      latitude: [
        null,
        [
          Validators.required,
          Validators.pattern('[-+]?([1-8]?[0-9](\\.[0-9]+)?|90(\\.0+)?)')
        ]
      ],
      longitude: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)'
          )
        ]
      ]
    });
  }

  get name() {return this.newDistributorForm.get('name'); }
  get latitude() {return this.newDistributorForm.get('latitude'); }
  get longitude() {return this.newDistributorForm.get('longitude'); }
}
