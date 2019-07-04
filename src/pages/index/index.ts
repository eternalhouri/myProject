import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  carouselItems=[]
  newArrialItems=[]
  recommendedItems=[]


  constructor(public navCtrl: NavController, public navParams: NavParams,private myHttp:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');

    //发送请求
    this.myHttp.get("http://127.0.0.1:8080/index").subscribe((result:any)=>{
      console.log(result)
      // 保存数据
      this.carouselItems=result.carouselItems
      this.newArrialItems=result.newArrialItems
      this.recommendedItems=result.recommendedItems
    })
  }

  // 跳转详情页
  jump(pid){
    this.navCtrl.push(DetailPage,{pid:pid})
  }

}
