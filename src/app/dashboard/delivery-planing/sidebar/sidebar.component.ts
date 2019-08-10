import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-delivery-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() { }

    isCreateTripRoute() {
        return this.router.url.startsWith('/delivery-planing/(delivery:assign') ||
            this.router.url === '/delivery-planing/(delivery:create-trip)';
    }
}
