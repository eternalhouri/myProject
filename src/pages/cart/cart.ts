import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from '../login/login';
import { IndexPage } from '../index';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartList=[]
  myIndex=IndexPage
  isAllSelected=false

  constructor(public navCtrl: NavController, public navParams: NavParams,private myHttp:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    
  }
  
  ionViewWillEnter(){
    // 请求购物车列表
    this.myHttp.get("http://localhost:8080/cart/list",{withCredentials:true}).subscribe((result:any)=>{
      console.log(result);
      if(result.code==300){
        this.navCtrl.push(LoginPage);
      }else if(result.code==200){
        console.log(result);
        this.cartList=result.data;
        // 遍历this.cartList数组，给每一个对象添加一个属性isSelected来记录是否被选中
        for(var i=0;i<this.cartList.length;i++){
          this.cartList[i].isSelected=false;
        }
      }
    })
  }

  // 全选复选框的方法
  selectAll(){
    // 将购物车每一个商品的isSelected修改为全选复选框的状态
    for(var i=0;i<this.cartList.length;i++){
      this.cartList[i].isSelected=this.isAllSelected;
    }
  }
 
  isSelected(){
    var result=true;
    for(var i=0;i<this.cartList.length;i++){      
      result=result&&this.cartList[i].isSelected;     
    }
    this.isAllSelected=result;
  }

  // 计算被选中商品的总价格
  calcAll(){
    var totalPrice=0;
    for(var i=0;i<this.cartList.length;i++){
      if(this.cartList[i].isSelected){
        totalPrice+=this.cartList[i].price*this.cartList[i].count;
      }
    }
    return totalPrice;
  }
}
