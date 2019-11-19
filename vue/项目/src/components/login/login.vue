<template>
    <div style="height:100%">
        <div class="login-logo">
            <div class="bg"></div>
            <p class="com-name">华图云平台</p>
        </div>
        <div class="login-content">
            <div class="username">
                <span class="iconfont icon-wode positon"></span>
                <input type="text" class="input-username" v-model="username" placeholder="用户名/手机"/>
            </div>
            <div class="password">
                <span class="iconfont icon-icon-mima positon"></span>
                <input type="password"  class="input-username" v-model="password" placeholder="密码"/>
            </div>
            <div class="serverset" @click="server()">
                <span class="server positon"></span>
                <input type="text"  class="input-username" v-model="serverset" readonly placeholder="请选择服务器"/>
            </div>
            <div class="add" @click="login()">登录</div>
            <div class="fuwuset">
                <a class="fuset" href="https://www.huato.net/grantLogin/wxd8ed68dc49694379/1">微信报警</a>
            </div> 
        </div>
        <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
            <mt-picker 
                :slots="serverda"
                :show-toolbar="true"
                ref="picker"
                value-key="ADDRESS"
            >   
                <div @click="cancleConfirm()" class="cancle">取消</div>
                <div @click="handleConfirm()" class="sure">确认</div>
            </mt-picker>
        </mt-popup>
    </div>
</template>

<script>
import axios from 'axios';
import {USERLogin,sport} from '../../axios/axios'
import { MessageBox } from 'mint-ui'
export default {
    data(){
        return {
            username:null,  //用户名
            password:null,  //密码
            popupVisible:false, //选择的初始状态
            serverset:'',   //服务器设置
            serverda:[],
        }
    },
    mounted(){
        //获取本地缓存，直接填入
        this.username=localStorage.getItem('huatousername');
        this.password=localStorage.getItem('huatopassword');
        this.huatoID =localStorage.getItem('huatoID');
        this.address();
        this.back()
    },
    destroyed() {
        this.back()
    },
    methods:{
        //由于ios端页面被键盘顶起之后会出现不能回原位置的情况，因此添加事件
        back(){
            var a = document.getElementsByTagName('input'); 
            for (let i = 0; i < a.length; i++) {    
                a[i].addEventListener('blur', this.fixScroll); 
            } 
        },
        //页面位置重置
        fixScroll(){
            window.scroll(0,0);
        },
        // 服务器入口获取
        address(){
            sport().then(res=>{
                console.log(res)
                this.serverlist=res.data.Data;
                if(this.huatoID==null){
                    this.first(this.index)
                }else{
                    this.first(this.huatoID)
                };
                this.serverda = [
                    {
                        flex:1,
                        values:this.serverlist,
                        className:'slot1',
                        textAlign:'center',
                    }
                ]
            })  
        },
        //默认初始化服务器
        first(n){
            for(var s= 0;s<this.serverlist.length;s++){
                if(n==this.serverlist[s].ID){
                    this.serverset=this.serverlist[s].ADDRESS
                    this.ip=this.serverlist[s].ADDRESSLINK
                    this.Identitys=this.serverlist[s].IDENTITYS
                    sessionStorage.setItem('address',this.ip)
                    sessionStorage.setItem('port',this.Identitys)  
                }
            }     
        },
        //取消
        cancleConfirm(){
            this.popupVisible=false
        },
        //确认
        handleConfirm(picker,values){
            console.log(this.$refs.picker.getValues()[0])
            this.serverset=this.$refs.picker.getValues()[0].ADDRESS
            this.ip=this.$refs.picker.getValues()[0].ADDRESSLINK
            this.Identitys=this.$refs.picker.getValues()[0].IDENTITYS
            this.huatoID = this.$refs.picker.getValues()[0].ID
            sessionStorage.setItem('address',this.ip)
            sessionStorage.setItem('port',this.Identitys)
            localStorage.setItem('huatoID',this.huatoID);
            this.popupVisible=false
        },
        //登录
        login(){
            for(var i=0;i<this.serverlist.length;i++){
                console.log(this.serverlist[i])
                if(this.huatoID==this.serverlist[i].ID){
                    this.Identitys=this.serverlist[i].IDENTITYS
                    console.log(this.Identitys)
                }
            }
            var userName = sessionStorage.getItem('name')
            var port = sessionStorage.getItem('port')
            var DomainAddress = sessionStorage.getItem('address')
            var URL= axios.create({
               baseURL:'http://'+DomainAddress
            })
            console.log(URL)
            let params = {
                userName:this.username,
                userPass:this.password,
                Identitys:this.Identitys,
                Port:0, 
            }
            for(var key in params){
                if(params[key]==null){
                    MessageBox.alert('登陆失败，请输入信息').then(action=>{
                        this.$router.replace({path:'/login'})
                    })
                }else{
                    console.log(params[key])
                }
            }
            sessionStorage.setItem('name',this.username)
            sessionStorage.setItem('pass',this.password)
            localStorage.setItem('huatousername',this.username);
            localStorage.setItem('huatopassword',this.password);
            URL.get(USERLogin(params)).then(res=>{
                console.log(res)
                if(res.data.State=='200'){
                    this.$router.replace({path:'/home'}) 
                }else{
                    MessageBox.alert('登陆失败，请输入正确信息').then(action=>{
                        this.$router.replace({path:'/login'})
                    })
                }
            })
        },
        //打开服务器选择
        server(){
           this.popupVisible=true 
        },
    }
}
</script>


<style>
    @import './login.css';
    
</style>
