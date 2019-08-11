import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-controller',
  templateUrl: './pagination-controller.component.html',
  styleUrls: ['./pagination-controller.component.scss']
})
export class PaginationControllerComponent {


  @Input() id: string;
  @Input() maxSize: number = 7;
  @Input()
  get directionLinks(): boolean {
    return this._directionLinks;
  }
  set directionLinks(value: boolean) {
    this._directionLinks = !!value && <any>value !== 'false';
  }
  @Input()
  get autoHide(): boolean {
    return this._autoHide;
  }
  set autoHide(value: boolean) {
    this._autoHide = !!value && <any>value !== 'false';
  }
  @Input() previousLabel: string = 'Previous';
  @Input() nextLabel: string = 'Next';
  @Input() screenReaderPaginationLabel: string = 'Pagination';
  @Input() screenReaderPageLabel: string = 'page';
  @Input() screenReaderCurrentLabel: string = `You're on page`;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  private _directionLinks: boolean = true;
  private _autoHide: boolean = false;
}
