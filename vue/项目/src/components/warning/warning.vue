<template>
    <div style="height:100%">
        <div class="head">
            <div class="zone_sl" @click="GroSelet()"> 
                <img src="../../assets/images/local.png" alt="" class="zone_dt">
            </div>
            <p class="title">警告</p>
            <!-- 左上角分区选择 -->
            <div class="group_sel" @click="Grouslect()"  v-show="Gropshow">
                <ul class="all_gro" :style="{height:Groupheight()}">
                    <li style="border-bottom: 0.02rem solid #ddd;"
                        @click="ZoneUp()"
                    >全部</li>
                    <li v-for="(zone, index) in groupdata" 
                        :key = "index" 
                        style="border-bottom: 0.02rem solid #ddd;"
                        @click="ZoneUp(zone.GroupId)"
                    >
                        <p>{{zone.GroupName}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content">
            <div class="warn-deal">
                <p class="warn-name">报警处理</p>
            </div>
            <div class="select-time">
                <div class="time">
                    <div style="height:0.9rem">
                        <input type="text"
                            class="start"
                            v-model="startTime"
                            @click='openStart("start")'
                            placeholder="请选择时间"
                            readonly
                        >
                        <calendar 
                        style="font-size:0.25rem"
                        v-model="startShow"
                        :defaultDate="defaultDate"
                        :maxDate="new Date(new Date().getTime()-24*60*60*1000)"
                        @change="startChange">
                        </calendar>
                        <img src="../../assets/images/arrow.png" class="arrow" alt="">
                        <input type="text"
                            class="start"
                            v-model="endTime"
                            @click='openStart("end")'
                            placeholder="请选择时间"
                            readonly
                        >
                        <calendar 
                        style="font-size:0.25rem"
                        v-model="endShow"
                        :defaultDate="defaultDate"
                        :maxDate="new Date()"
                        @change="endChange">
                        </calendar>
                    </div>
                    <div class="search-da" @click="Search()">
                        查询
                    </div>
                </div>
            </div>
            <div class="warn-information" :style="{height:contenHeight+'px'}">
                <ul>
                    <li v-for="(item,index) in infodata" :key="index" class="info_content" @click="open(item)">
                        <p class="content_title">{{ConSlice(item.AlarmContent)}}</p>
                        <p class="content_time">{{item.AlarmDate}}</p>
                        <p class="content_detail">报警内容：{{DetaSlic(item.AlarmContent)}}</p>
                        <p class="content_measure">处理措施：{{item.TreatmentMeasures}}</p>
                        <div class="to_detail">
                            <span class="iconfont icon-xiangyou"></span>
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios';
import { WARN, AREA } from '../../axios/axios'
export default {
    data() {
        return {
            startTime:'',                   //开始时间
            endTime:'',                     //结束时间
            defaultDate:new Date(),         //默认时间
            startShow:false,                //是否显示开始时间选择
            endShow:false,                  //是否显示结束时间选择
            page:10,             
            grouid:'',                      //基站
            infodata:[],                    //通知数据
            contenHeight:0,
            groupdata:[],                   //分区数据
            Gropshow:false,                 //分区显示
        }
    },
    mounted(){
        this.Infoheight();
        //时间取值
        if(sessionStorage.getItem('StarTim')&&sessionStorage.getItem('EndTim') == undefined){
            this.startTime=sessionStorage.getItem('StarTim');
            this.DefaultEnd();
        };
        if(sessionStorage.getItem('StarTim') == undefined&&sessionStorage.getItem('EndTim')){
            this.endTime =sessionStorage.getItem('EndTim');
            this.Defaulttime();
        };
        if(sessionStorage.getItem('StarTim')&&sessionStorage.getItem('EndTim')){
            this.startTime=sessionStorage.getItem('StarTim');
            this.endTime =sessionStorage.getItem('EndTim')
        };
        if(sessionStorage.getItem('StarTim') == undefined&&sessionStorage.getItem('EndTim') == undefined){
            this.DefaultEnd();
            this.Defaulttime();
        };
        this.Getusergroup();
        this.Search();
    },
    methods: {
        //通知内容区域高度
        Infoheight(){
            var windowwidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var mintheight = document.getElementsByClassName('mint-tabbar')[0].clientHeight;
            this.contenHeight = windowHeight-(100*(windowwidth/750)*4.2)-mintheight;
            console.log(this.contenHeight)
        },
        //默认开始时间
        Defaulttime(){
            var nowTime = new Date();
            var d = nowTime.getDate();
            var h =nowTime.getHours();
            var m = nowTime.getMinutes();
            var s = nowTime.getSeconds();
            var time = new Date(nowTime.getTime()-6*24*3600*1000-(h*3600+m*60+s)*1000)
            this.startTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
        },
        //默认结束时间
        DefaultEnd(){
            this.endTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        },
        // 时间选择框显示
        openStart(type){
            if(type == "start"){
                this.startShow = true;
            }else{
                this.endShow = true;
            }
        },
        //开始时间选择
        startChange(data){
            this.mixdate = data;
            this.pickerValue=moment(data).format('YYYY-MM-DD HH:mm:ss');
            this.startTime=this.pickerValue;
            sessionStorage.setItem('StarTim',this.pickerValue)
            console.log(this.mixdate)
            console.log('start')
        },
        //结束时间选择
        endChange(data){
            this.pickerValue=moment(data).format('YYYY-MM-DD HH:mm:ss');
            this.endTime =this.pickerValue;
            sessionStorage.setItem('EndTim',this.pickerValue)
            console.log('end');
        },
        //分区显示
        GroSelet(){
            this.Gropshow = true
        },
        // 关闭分区选择
        Grouslect(){
            this.Gropshow = false;
        },
        // 分区显示高度
        Groupheight(){
            if(this.length>=8){
                return '6.4rem'
            }else{
                return 'auto'
            }
        },
        //分区选择
        ZoneUp(GroupId){
            if(GroupId){
                this.grouid = GroupId;
                this.Search()
            }else{
                this.grouid = '';
                this.Search()
            }
        },
        // 报警设备切割
        ConSlice(data){
            let extra = data.slice(19,10000);
            let title = extra.split(" ")[0]
            return title
        },
        // 报警内容切割
        DetaSlic(cont){
            let residue = cont.slice(19,10000);
            let allcot = [];
            allcot = residue.split(" ");
            allcot.shift();
            var cotent = '';
            for(let i = 0;i<allcot.length;i++){
                cotent += allcot[i];
            }
            return cotent;
        },
        //跳转
        open(text){
            this.$router.replace({
                name:'/dispose',
                params:{
                    data:text
                }
            })
        },
        // 获取用户分区
        Getusergroup(){
            var userName = sessionStorage.getItem('name')
            var DomainAddress = sessionStorage.getItem('address')
            var port = sessionStorage.getItem('port')
            var URL= axios.create({
               baseURL:'http://'+DomainAddress
            })
            let params = {
                userName:userName,
                Identitys:port,
            }
            URL.get(AREA(params)).then(res =>{
                console.log(res)
                this.groupdata=res.data.Data;
            })
        },
        //查询
        Search(){
            var userName = sessionStorage.getItem('name');
            var DomainAddress = sessionStorage.getItem('address');
            var port = sessionStorage.getItem('port');
            var GETDATA= axios.create({
                baseURL:'http://'+DomainAddress
            });
            let params = {
                userName:userName,
                Identitys:port,
                staDate:this.startTime,
                endDate:this.endTime,
                currentPageNumber:this.page,
                groupId:this.grouid,
            };
            GETDATA.get(WARN(params)).then(res=>{
                console.log(res)
                this.infodata = res.data.Data;
            })
        }
    },
}
</script>

<style>
.warn-deal{
    height: 0.74rem;
    text-align: center;
    line-height: 0.74rem;
    background: #008CE5;
}
.warn-name{
    font-size: 0.3rem;
    color: #FFFFFF;
    display: inline;
    vertical-align: top;
    border-bottom: 0.02rem solid #FFFFFF;

}
.time{
    margin-top: 0.2rem;
    background: #FFFFFF;
    text-align: center;
    padding-bottom: 0.32rem;
}
.start{
    display: inline-block;
    width: 2.96rem;
    vertical-align: top;
    margin-top: 0.5rem;
    border: none;
    text-align: center;
    border-bottom: 0.02rem solid #ddd;
    font-size: 0.28rem;
    color:#666666;
}
.arrow{
    width: 0.4rem;
    height: 0.4rem;
    vertical-align: top;
    margin-top: 0.45rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
}
.search-da{
    width: 3.2rem;
    height: 0.6rem;
    border: 1px solid #008CE5;
    border-radius: 6px;
    background: #008CE5;
    font-size: 0.28rem;
    color: #FFFFFF;
    line-height: 0.6rem;
    margin: 0.34rem auto 0;
}
.warn-information{
    margin-top: 0.2rem;
    background: #FFFFFF;
    overflow: scroll;
}
.info_content{
    padding: 0.24rem 0.3rem 0.2rem;
    border-bottom: 0.02rem solid #E0E0E0;
    position: relative;
}
.content_title{
    font-size: 0.26rem;
    font-family: PingFang-SC-Medium;
    font-weight: bold;
    color: rgba(51,51,51,1);
}
.content_time{
    color: #999999;
    font-size: 0.22rem;
}
.content_detail{
    color: #666666;
    font-size: 0.24rem;
    width: 85%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.content_measure{
    color: #666666;
    font-size: 0.24rem;
    width: 85%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.to_detail{
    position: absolute;
    top: 0.7rem;
    right: 0.3rem;
    color: #A9A9A9;
}
.zone_sl{
    width: 0.27rem;
    height: 0.36rem;
    position: absolute;
    top: 0.26rem;
    left: 0.24rem;
}
.zone_dt{
    width: 100%;
    height: 100%;
    vertical-align: top;
}
.group_sel{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 99;
}
.all_gro{
    width: 2.6rem;
    border-radius: 0.2rem;
    background: #fff;
    position: absolute;
    top: 1rem;
    left: 0.2rem;
    overflow: scroll;
}
</style>
