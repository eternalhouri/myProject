import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { NotFoundPage } from '../not-found/not-found';
import { CartPage } from '../cart/cart';
import { LoginPage } from '../login/login';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  lid=0
  pList=[]
  itemTitle=''
  itemSubTitle=''
  itemPrice=0

  constructor(public navCtrl: NavController, public navParams: NavParams,private myHttp:HttpClient,private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    this.lid=this.navParams.get('pid');
    this.myHttp.get(`http://127.0.0.1:8080/product/detail?lid=${this.lid}`).subscribe((result:any)=>{
      console.log(result);
      this.pList=result.details.picList;
      this.itemTitle=result.details.title;
      this.itemSubTitle=result.details.subtitle;
      this.itemPrice=result.details.price.toFixed(2);
    })
  }

  jump404(){
    this.navCtrl.push(NotFoundPage);
  }

  jumpCart(){
    this.navCtrl.push(CartPage);
  }

  jump(){
    this.myHttp.get(`http://localhost:8080/cart/add?lid=${this.lid}&buyCount=1`,{withCredentials:true})
    .subscribe((result:any)=>{
      console.log(result);
      var msg;
      if(result.code==200){
        msg='添加购物车成功';        
      }else if(result.code==300){
        msg='请先登录';
        this.navCtrl.push(LoginPage)
      }
      this.toastCtrl.create({
        message:msg,
        showCloseButton:true,
        closeButtonText:'关闭',
        duration:1500
      }).present()
    })
  }
}
