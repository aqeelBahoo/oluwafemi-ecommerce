import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  user_dashboard_data;
  total_user: number = 0;
  admin_user: number = 0;
  seller_user: number = 0;
  buyer_user: number = 0;

  product_dashboard_data;
  total_product: number = 0;
  publish_product: number = 0;
  inactive_product: number = 0;
  draft_product: number = 0;
  rejected_product: number = 0;
  // tslint:disable-next-line: variable-name
  requested_product: number = 0;

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit() {
    this.adminUserDashboardData();
    // this.adminProductDashboardData();
  }

  userDashboard() {
    this.router.navigateByUrl('/admin/users');
  }

  productDashboard() {
    this.router.navigateByUrl('/admin/product');
  }

  adminUserDashboardData() {
    this.adminService.userDashboardData().subscribe(
      (data) => {
        this.user_dashboard_data = data;
        for (let user in this.user_dashboard_data) {
          // console.log(this.user_dashboard_data[status].status);
          if (this.user_dashboard_data[user].role == 'admin') {
            ++this.admin_user;
          } else if (this.user_dashboard_data[user].role == 'seller') {
            ++this.seller_user;
          } else if (this.user_dashboard_data[user].role == 'buyer') {
            ++this.buyer_user;
          }
          ++this.total_user;
        }
      },
      (error) => {
        console.log('My error', error);
      }
    );
  }

  adminProductDashboardData() {
    this.adminService.productDashboardData().subscribe(
      (data) => {
        this.product_dashboard_data = data;
        console.log(this.product_dashboard_data);

        // tslint:disable-next-line: forin
        for (status in this.product_dashboard_data) {
          // console.log(this.product_dashboard_data[status].status);
          // tslint:disable-next-line: triple-equals
          if (this.product_dashboard_data[status].status == 'publish') {
            ++this.publish_product;
          } else if (this.product_dashboard_data[status].status == 'inactive') {
            ++this.inactive_product;
          } else if (this.product_dashboard_data[status].status == 'draft') {
            ++this.draft_product;
          } else if (this.product_dashboard_data[status].status == 'rejected') {
            ++this.rejected_product;
          } else if (
            this.product_dashboard_data[status].status == 'requested'
          ) {
            ++this.requested_product;
          }
          ++this.total_product;
        }
      },
      (error) => {
        console.log('My error', error);
      }
    );
  }
}