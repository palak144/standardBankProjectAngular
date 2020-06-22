import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import { UserDashboard } from '../models/userDashboard';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<UserDashboard[]>(`/users`);
  }

  register(user: User) {
      return this.http.post(`/users/register`, user);
  }

  delete(id: number) {
    
      return this.http.delete(`/users/${id}`);
  }
  registerDashboard(user: UserDashboard) {
    
    return this.http.post(`/users/registerDashboard`, user);
}
updateCustomer(user: UserDashboard) {   
  
  return this.http.put(`/users/updateDashboard`, user);
}

}
