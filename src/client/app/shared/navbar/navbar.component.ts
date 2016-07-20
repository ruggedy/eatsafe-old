import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent implements OnInit {
  
  @Input() isLoggedIn: boolean = false;
  @Input() isValidated: boolean = false;
  @Output() logout = new EventEmitter();
  @Input() isAdmin: boolean = false;
  adminUrl = '<%=ADMIN_URL%>'

  loggedOut(event: any){
	  this.logout.emit({
		  value: event.target.id
	  }); 
  }

  ngOnInit() {
   }

}

