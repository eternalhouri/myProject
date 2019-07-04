import { Component } from '@angular/core';
import { ToastController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  uname=''
  upwd=''

  constructor(public navCtrl: NavController, public navParams: NavParams,private myHttp:HttpClient,private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    // 获取用户名和密码
    console.log(this.uname,this,this.upwd);
    // 发起一次post请求，验证用户名和密码是否正确
    this.myHttp.post('http://localhost:8080/user/login',{uname:this.uname,upwd:this.upwd},{withCredentials:true}).subscribe((result:any)=>{
      console.log(result);
      if(result.code==200){
        // 登录成功,返回上一页
        this.navCtrl.pop();
      }else{
        // 登录失败,显示通知
        this,this.toastCtrl.create({
          message:'登录失败',
          showCloseButton:true,
          closeButtonText:"关闭",
          duration:1500
        }).present()
      }
    })
  }
}
