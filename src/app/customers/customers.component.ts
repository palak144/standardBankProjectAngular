import { OnInit, Component } from '@angular/core';
import { UserDashboard } from 'src/app/models/userDashboard';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, UserService } from '../services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  
  constructor(
    
  ) {
    
  }

  ngOnInit() {
  }
}
