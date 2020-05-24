import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:3000';

  constructor(
    protected http: HttpClient
  ) {
  }

  url(part) {
    return this.baseUrl + part;
  }
}
