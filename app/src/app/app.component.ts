import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'e-shop';

  constructor(
    private iconService: MatIconRegistry

  ) {
  }

  ngOnInit(): void {
    this.iconService.addSvgIcon('person', 'https://fonts.gstatic.com/s/i/materialicons/person/v4/24px.svg?download=true');
  }
}
