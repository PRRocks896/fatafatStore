import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { flatten } from '@angular/compiler';
import { RetailerService } from '../shared/retailer.service';
import { Utils } from '../shared/utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../shared/common.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent implements OnInit {

  @ViewChild('imageContanerDiv', { static: true }) imageContanerDiv: ElementRef;
  url:any = '';
  edited = false;
  deleteImage:boolean = false;
  SelectedImage;
  inventoryDetail: string = '';
  inventoryImage: any = [];
  retailerDetail: any;

  constructor(private retailerService: RetailerService, private spinner: NgxSpinnerService,
    private commonService: CommonService, private title: Title) {
      this.title.setTitle('Retailer' + Utils.getAppName());
    }

  ngOnInit(): void {
    this.retailerDetail = JSON.parse(localStorage.getItem('retailer'));
    // console.log(this.retailerDetail);
    this.fetchInventory(this.retailerDetail.RetailerID);
    // this.imageContanerDiv.nativeElement
  }

  fetchInventory(id) {
    if(Utils.checkTokenValid()) {
      this.spinner.show();
      this.retailerService.getInventory(id).subscribe((res: any) => {
        this.spinner.hide();
        // console.log(res);
        if(res.errorcode == '0') {
          this.inventoryImage = [];
          this.inventoryDetail = res.InventoryList[0].ItemName;
          res.InventoryList.filter(itemImage => {
            if(itemImage.ItemImage !== '') {
              this.inventoryImage.push({
                itemID: itemImage.ItemID,
                image: Utils.getImages() + 'Inventory/' + itemImage.ItemImage
              });
            }
          })
          // console.log(this.inventoryImage);
          // this.inventoryImage = this.inventoryImage + res.InventoryList[1].ItemImage;
          // console.log(this.inventoryImage);
        }
      }, err => {
        this.spinner.hide();
        console.error(err)
      });
    } else {
      this.commonService.getToken().subscribe((res: any) => {
        Utils.setToken(res);
        this.fetchInventory(this.retailerDetail.RetailerID);
      })
    }
  }

  onSelectFile(event) {
    this.SelectedImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      this.edited = true;
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
  onDeleteImage(imageName){
    // console.log(Utils.checkTokenValid());
    if(Utils.checkTokenValid()) {
      const index = this.inventoryImage.indexOf(imageName);
      if (index !== -1) {
        this.inventoryImage.splice(index, 1);
        this.retailerService.deleteItemImage(imageName.itemID).subscribe((res: any) => {
          this.fetchInventory(this.retailerDetail.RetailerID);
        });
      }
    } else {
      this.commonService.getToken().subscribe((res: any) => {
        Utils.setToken(res);
        const index = this.inventoryImage.indexOf(imageName);
        if (index !== -1) {
          this.inventoryImage.splice(index, 1);
          this.retailerService.deleteItemImage(imageName.itemID).subscribe((res: any) => {
            this.fetchInventory(this.retailerDetail.RetailerID);
          });
        }
      })
    }
    // this.deleteImage = true;
  }

  submitInventory() {
    this.spinner.show();
    // console.log(this.inventoryDetail);
    // console.log(this.SelectedImage);
    const body = {
      RetailerID: this.retailerDetail.RetailerID,
      ItemName: this.inventoryDetail
    }
    this.retailerService.storeInventory(body, this.SelectedImage).subscribe((res: any) => {
      this.spinner.hide();
      if(res['errorcode'] == '0')  {
        this.inventoryDetail = '';
        this.SelectedImage = null;
        this.url = '';
        alert(res['message']);
        this.fetchInventory(this.retailerDetail.RetailerID);
        // this.router.navigate(['/']);
      } else {
        
        alert(res['message']);
      }
    }, err => {
      this.spinner.hide();
      alert(err.error.message);
      console.error(err)
    });
  }
}
