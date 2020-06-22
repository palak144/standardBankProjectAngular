import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AuthService, UserService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { UserDashboard } from 'src/app/models/userDashboard';

@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.css']
})

export class EditCustomersComponent implements OnInit {
  dashboardForm: FormGroup;
  
  submitted = false;
  editMode = false;
  id: number;
  dashboardFormDetails: any;
  customers: any;
  customer: any
  customerTitle = "Add Customer"
  constructor(
    
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthService,
      private userService: UserService,
      private toastr: ToastrService,
      private route: ActivatedRoute
      ) { 
     
  }

  ngOnInit() {
    
    this.route.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        console.log(this.editMode)
        this.initForm()
      }
    )}

    get f() { return this.dashboardForm.controls; }

  onSubmit() {
    
    this.submitted = true;

      if (this.dashboardForm.invalid) {
        return;
    }
    this.dashboardFormDetails = {
      "name": this.dashboardForm.get('name').value,
      "lname":this.dashboardForm.get('lname').value,
      "add":this.dashboardForm.get('add').value,
      "city":this.dashboardForm.get('city').value,
      "state":this.dashboardForm.get('state').value,
      "order":this.dashboardForm.get('order').value,

    }
    if (this.id ) {

      this.dashboardFormDetails.id = this.id;
    }
    if (this.editMode) {
      this.customerTitle = "Edit Customer"
      this.userService.updateCustomer(this.dashboardFormDetails).subscribe(
        data => {
          
          console.log(data)
          this.toastr.success("Customer Details Editted Successfully")
          this.router.navigate(['/customers']);
        },
        error => {
          
          this.toastr.error(error.message)
        });



    }
    else{
      this.customerTitle = "Add Customer"
    this.userService.registerDashboard(this.dashboardFormDetails)
          .pipe(first())
          .subscribe(
              data => {
                
                this.toastr.success('Customer Created successful');
                this.router.navigate(['/customers']);
              },
              error => {
                  this.toastr.error(error);
              });
            }
 }

 private initForm() {
    let name = "";
    let lname = "";
    let add = "";
    let city = "";
    let state = "";
    let order = "";

if(this.editMode){
  this.customerTitle = "Edit Customer"
  this.userService.getAll().pipe(first()).subscribe(users => {
    
      this.customers = users;
this.customer = this.customers.filter((item: any) => {
                return this.id === item.id
              })   
                 
      this.dashboardForm.patchValue({
        "name" : this.customer[0].name,
        "lname" : this.customer[0].lname,
        "add" : this.customer[0].add,
        "city" : this.customer[0].city,
        "state" : this.customer[0].state,
        "order" : this.customer[0].order,


    })
  });
}
  this.dashboardForm = this.formBuilder.group({
    name: [name, Validators.required],
    lname: [lname, Validators.required],
    add: [add, Validators.required],
    city: [city, Validators.required],
    state: [state, Validators.required],
    order: [order, Validators.required],

   })
}
delete() {
  
  this.userService.delete(this.id).pipe(first()).subscribe()
  this.router.navigate(['/customers']);

}
}
