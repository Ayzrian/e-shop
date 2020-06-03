import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService extends ApiService {
  isUserWithEmailExists(email: string) {
    return this.http.get<boolean>(this.url(`/users/exists/${email}`)).toPromise();
  }
}
