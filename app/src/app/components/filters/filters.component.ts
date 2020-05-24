import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IFilter} from './filters.interfaces';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Input() filters: IFilter[] = [];
  @Output() query = new EventEmitter<object>();
  @Output() search = new EventEmitter();

  private lastQuery: any = {};

  ngOnInit(): void {
  }

  onChange() {
    this.lastQuery = this.filters
      .filter((filter) => Boolean(filter.selectedValue))
      .reduce(
        (accQuery, {queryField, selectedValue}) => ({
          ...accQuery,
          [queryField]: selectedValue,
        }),
        {}
      );

    this.query.emit(this.lastQuery);
  }

  onSelectChange() {
    setTimeout(() => {
      this.onChange();
      this.onSearch();
    }, 250);
  }

  onSearch() {
    this.search.emit();
  }
}
