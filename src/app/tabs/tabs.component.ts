import { Component, OnInit , ViewChild, ElementRef,Input, EventEmitter, Output} from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateService } from '../services/update.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @ViewChild('tabset', { static : false}) tabsetEl: ElementRef;
  @ViewChild('tabset', { static : false}) tabset: TabsetComponent;
  @ViewChild('first' ,  { static : false}) first: TabDirective;
  @ViewChild('second' ,  { static : false}) second: TabDirective;
  @Input('flagString')  fl:string;
  @ViewChild('login' ,  { static : false}) t1:Component;
  @Output() update: EventEmitter<number> = new EventEmitter()
    activeTab:number;
    tabVisible1:boolean;
    tabVisible2:boolean;
  
    constructor( private router : Router,
      private activatedRoute: ActivatedRoute,
      private updateservice: UpdateService ) 
      { 
      }
  ngOnInit(): void {
  }
  ngAfterViewInit(){
    
    this.activatedRoute.params.subscribe(params => {
      this.activeTab = params['id']; 
      this.tabset.tabs[this.activeTab].active = true;  
   });
  
  }
  switchTab($event){
    
    if($event.tabs[2].active)
    {
      this.publishService(2);
    }
    else($event.tabs[1].active)
    {
      this.publishService(1);
    }

  }
   publishService(id){   
     
   this.updateservice.emitNavChangeEvent(id);

}
  
  onTabSelect(tabId){
  }

}
