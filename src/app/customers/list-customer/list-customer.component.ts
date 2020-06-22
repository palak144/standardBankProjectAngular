import { Component, OnInit } from '@angular/core';
import { UserDashboard } from 'src/app/models/userDashboard';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, UserService } from '../../services';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

 
  currentUser: User;
  currentUserSubscription: Subscription;
  customers: UserDashboard[] = [];

  constructor(
      private authenticationService: AuthService,
      private userService: UserService,
      private router : Router,
      private route: ActivatedRoute
  ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
          this.currentUser = user;
      });
  }

  ngOnInit() {
      this.loadAllUsers();
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.currentUserSubscription.unsubscribe();
  }

  
  editCustomer(id: number) {
    
    this.router.navigate([id,'edit'],{relativeTo : this.route})
}
addCustomer(){
    
    this.router.navigate(['new'],{relativeTo : this.route})

}
  private loadAllUsers() {
      this.userService.getAll().pipe(first()).subscribe(users => {
        
          this.customers = users;
      });
  }
}
