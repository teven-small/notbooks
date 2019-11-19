<template>
    <div style="height:100%">
        <div class="head">
            <div class="back" @click="Back()">
                <img src="../../assets/images/left.png" alt="" class="back_main">
            </div>
            <p class="title">{{machineName}}</p>
        </div>
        <div class="detail_content">
            <div class="time_search">
                <div style="height:0.9rem">
                    <input type="text"
                        class="start_select"
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
                        class="start_select"
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
                <div class="search-da" @click="GetData()">
                    查询
                </div>
            </div>
            <div class="detail_da" >
                <table>
                    <tr>
                        <th>数据总数</th>
                        <th>通道→</th>
                        <th v-if="listdata.LOGGER_CHNUM>=1">{{listdata.CHONE_TYPE}}</th>
                        <th v-if="listdata.LOGGER_CHNUM>=2">{{listdata.CHTWO_TYPE}}</th>
                        <th v-if="listdata.LOGGER_CHNUM>=3">{{listdata.CHTHR_TYPE}}</th>
                        <th v-if="listdata.LOGGER_CHNUM>=4">{{listdata.CHFOU_TYPE}}</th>
                    </tr>
                    <tr>
                        <td class="colo" rowspan="2">{{listdata.TotalData}}</td>
                        <td class="mnumber">最大值</td>
                        <td class="colo" v-if="listdata.LOGGER_CHNUM>=1">{{listdata.CHONE_MAX}}</td>
                        <td class="colo" v-if="listdata.LOGGER_CHNUM>=2">{{listdata.CHTWO_MAX}}</td>
                        <td class="colo" v-if="listdata.LOGGER_CHNUM>=3">{{listdata.CHTHR_MAX}}</td>
                        <td class="colo" v-if="listdata.LOGGER_CHNUM>=4">{{listdata.CHFOU_MAX}}</td>
                    </tr>
                    <tr>
                        <td class="mnumber">最小值</td>
                        <td class="colo" v-if="listdata.LOGGER_CHNUM>=1">{{listdata.CHONE_MIN}}</td>
                        <td class="colo" v-if="listdata.LOGGER_CHNUM>=2">{{listdata.CHTWO_MIN}}</td>
                        <td class="colo" v-if="listdata.LOGGER_CHNUM>=3">{{listdata.CHTHR_MIN}}</td>
                        <td class="colo" v-if="listdata.LOGGER_CHNUM>=4">{{listdata.CHFOU_MIN}}</td>
                    </tr>
                </table>
            </div>
            <div class="list_line">
                <div class="base_butt list_show" :class="a? 'active' :''" @click="ListShow()">列表</div>
                <div class="base_butt line_show" :class="a? '' :'active'" @click="LineShow()">曲线</div>
            </div>
            <div class="list_detail" v-if="Show">
                <table class="tp" >
                    <tr>
                        <th class="time-content">时间</th>
                        <th class="temper" v-if="listdata.LOGGER_CHNUM>=1">{{listdata.CHONE_TYPE}}</th>
                        <th class="temper" v-if="listdata.LOGGER_CHNUM>=2">{{listdata.CHTWO_TYPE}}</th>
                        <th class="temper" v-if="listdata.LOGGER_CHNUM>=3">{{listdata.CHTHR_TYPE}}</th>
                        <th class="temper" v-if="listdata.LOGGER_CHNUM>=4">{{listdata.CHFOU_TYPE}}</th>
                    </tr>
                </table>
                <div  :style="{height:ListHeight+'px'}" class="lis_deta">
                    <table  class="lisdata">
                        <tr  class="excelshow" v-for="(item ,index) in  maindata" :key="index">
                            <td class="time-data">{{item.LOGS_TIME}}</td>
                            <td class="detail-data" v-if="listdata.LOGGER_CHNUM>=1">{{item.LOGS_CHONE}}</td>
                            <td class="detail-data" v-if="listdata.LOGGER_CHNUM>=2">{{item.LOGS_CHTWO}}</td>
                            <td class="detail-data" v-if="listdata.LOGGER_CHNUM>=3">{{item.LOGS_CHTHREE}}</td>
                            <td class="detail-data" v-if="listdata.LOGGER_CHNUM>=4">{{item.LOGS_CHFOUR}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="line_detail" v-show="!Show">
                <div :style="{height:LineHeight+'px'}" class="lis_deta">
                <div class="detail-bight" v-show="listdata.LOGGER_CHNUM>=1">
                    <div id="box" style="width:7.5rem;height:5.42rem"></div>
                </div>
                <div class="relative-humidity" v-show="listdata.LOGGER_CHNUM>=2">
                    <div id="box2" style="width:7.5rem;height:5.42rem"></div>
                </div>
                <div class="luminous-intensity" v-show="listdata.LOGGER_CHNUM>=3">
                    <div id="box3" style="width:7.5rem;height:5.42rem"></div>
                </div>
                <div class="lux" v-show="listdata.LOGGER_CHNUM>=4">
                    <div id="box4" style="width:7.5rem;height:5.42rem"></div>
                </div>
                </div>
            </div>
            <div class="no_data" v-show="None">
                <img src="../../assets/images/none.png">
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios';
import {MACHINE, EXCEL} from '../../axios/axios'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
export default {
    data(){
        return {
            machineName:'详情',  //详情页标题
            startTime:'',       //开始时间
            endTime:'',         //结束时间
            defaultDate:new Date(),   //默认时间
            startShow:false,     //是否显示开始时间选择
            endShow:false,      //是否显示结束时间选择
            listdata:[],        //列表数据
            a:true,
            maindata:[],        //所有数据
            Show:true,          //列表显示
            ListHeight:0,       //列表显示区域的高度
            LineHeight:0,       //折线图显示区域
            None:false,         //无数据时
        }
    },
    mounted(){
        this.machineName = this.$route.params.inst
        this.Defaulttime();
        this.HeightLi();
        this.GetallData();
        this.GetEveryData()
    },
    methods:{
        //默认时间
        Defaulttime(){
            var nowTime = new Date();
            var d = nowTime.getDate();
            var h =nowTime.getHours();
            var m = nowTime.getMinutes();
            var s = nowTime.getSeconds();
            var time = new Date(nowTime.getTime()-6*24*3600*1000-(h*3600+m*60+s)*1000)
            this.startTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
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
        },
        //结束时间选择
        endChange(data){
            this.pickerValue=moment(data).format('YYYY-MM-DD HH:mm:ss');
            this.endTime =this.pickerValue;
            console.log('end');
        },
        //搜索
        GetData(){
            this.GetallData();
            this.GetEveryData()
        },
        // 列表显示
        ListShow(){
            this.a = true;
            this.Show = true;
            if(this.maindata.length == 0){
                this.None = true
            }
        },
        // 折线图显示
        LineShow(){
            this.a = false;
            this.Show = false;
            this.HeightLi();
            this.Sort();
            if(this.maindata.length == 0){
                this.None=false;
            }
        },
        //返回
        Back(){
            this.$router.replace('/monitor');
        },
        // 表格区域显示
        HeightLi(){
            var windowwidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var headheight = 100*(windowwidth/750)*0.88;
            this.ListHeight = windowHeight-(100*(windowwidth/750)*5.4)-headheight;
            this.LineHeight = windowHeight-(100*(windowwidth/750)*4.96)-headheight;
        },
        // 获取头部数据
        GetallData(){
            var macNumber =this.$route.params
            console.log(this.$route)
            var usName =sessionStorage.getItem('name')
            var address =sessionStorage.getItem('address')
            var port = sessionStorage.getItem('port')
            var URL= axios.create({
               baseURL:'http://'+address
            })
            let params={
                userName:usName,
                Identitys:port,
                loggerSn:macNumber.mach,  
                staDate:this.startTime,
                endDate:this.endTime
            }
            URL.get(MACHINE(params)).then(res=>{
                console.log(res)
                this.listdata = res.data.Data
                // this.maindata = this.listdata.ListLoggerSnDetailsModelData
                this.CHONE_TYPE=this.listdata.CHONE_TYPE
                this.CHTWO_TYPE=this.listdata.CHTWO_TYPE
                this.CHTHR_TYPE=this.listdata.CHTHR_TYPE
                this.CHFOU_TYPE=this.listdata.CHFOU_TYPE
            })
        },
        //获取各时间数据
        GetEveryData(){
            var data =this.$route.params
            var address =sessionStorage.getItem('address')
            var port = sessionStorage.getItem('port')
            var URL= axios.create({
               baseURL:'http://'+address
            })
            let params = {
                Identitys:port,
                loggerSn:data.mach,  
                staDate:this.startTime,
                endDate:this.endTime,
                currentPageNumber:1
            }
            URL.get(EXCEL(params)).then(res=>{
                if(res.data.State==200){
                    this.None=false;
                    this.maindata = res.data.Data;
                    // 判断当前是列表显示还是图形显示
                    if(this.a==false){
                        this.Sort();
                    }
                }else{
                    this.maindata=[];
                    // 判断当前是列表显示还是图形显示
                    if(this.a==false){
                        this.Sort();
                        this.None=false
                    }else{
                        this.None=true
                    }
                }
            })
        },
        // 数据分类
        Sort(){
            // 数据分类
            var arr1=[];            //通道一
            var arr2=[];            //通道二
            var arr3=[];            //通道三
            var arr4=[];            //通道四
            var arrtime=[];         //时间
            for(let i=0;i<this.maindata.length;i++){
                let item = this.maindata[i]
                for(let key in item){
                    switch(key){
                        case"LOGS_CHONE":arr1.push(item.LOGS_CHONE);break;
                        case"LOGS_CHTWO":arr2.push(item.LOGS_CHTWO);break;
                        case"LOGS_CHTHREE":arr3.push(item.LOGS_CHTHREE);break;
                        case"LOGS_CHFOUR":arr4.push(item.LOGS_CHFOUR);break;
                        case"LOGS_TIME":arrtime.push(item.LOGS_TIME);break;
                        default:'';
                    }
                }
            }
            this.Draw(arr1,arr2,arr3,arr4,arrtime)
        },
        //画图
        Draw(x1,x2,x3,x4,xTime){
            console.log('909090')
            var dataTime =[];
            var myCharts = echarts.init(document.getElementById('box'));
            var chart = echarts.init(document.getElementById('box2'));
            var mychart = echarts.init(document.getElementById('box3'));
            var mychat = echarts.init(document.getElementById('box4'));
            var yAxis_name1='',yAxis_name2='',yAxis_name3='',yAxis_name4='';
                yAxis_name1 = this.CHONE_TYPE
                yAxis_name2 = this.CHTWO_TYPE
                yAxis_name3 = this.CHTHR_TYPE
                yAxis_name4 = this.CHFOU_TYPE
                dataTime = xTime.reverse()
                // 坐标轴最大值和最小值
            var max1 = Math.ceil(Math.max(...x1)+2);
            var min1 = Math.floor(Math.min(...x1)-2);
            var max2 = Math.ceil(Math.max(...x2)+2);
            var min2 = Math.floor(Math.min(...x2)-2);
            var max3 = Math.ceil(Math.max(...x3)+2);
            var min3 = Math.floor(Math.min(...x3)-2);
            var max4 = Math.ceil(Math.max(...x4)+2);
            var min4 = Math.floor(Math.min(...x4)-2);
            var data1 = x1.reverse();
            var data2 = x2.reverse();
            var data3 = x3.reverse();
            var data4 = x4.reverse();

            myCharts.setOption({
                backgroundColor:'#FFFFFF',
                grid:
                {
                    show:true,
                    left:"15%",
                    right:"30px",
                },
                xAxis: [{
                        splitLine:{ show: true},
                        type:'category',
                        boundaryGap:false,
                        data: dataTime.map(function (str) {
                            var str_before = str.split(' ')[0];
                            var str_after = str.split(' ')[1];
                            return str_after + '\n' + str_before;
                        }),
                        axisLabel:{
                            textStyle:{
                                fontSize:10
                            }
                        },
                }],
                yAxis:[
                    {
                        splitLine:{show:true,lineStyle:{type:'dashed'} },
                        type:'value',
                        show:'true',
                        name:yAxis_name1,
                        max:max1,
                        min:min1,
                        axisLabel:{
                            formatter:'{value}'             //刻度标签的内容格式器，支持字符串模板和回调函数两种形式
                        },
                        
                    },
                
                ],
                legend:{
                    data:[data1]
                },
                series:[{
                    itemStyle:{
                        normal:{
                            lineStyle:{
                                color:'#1AB91E',        //线条颜色
                                width:1,                //线宽
                            }
                        }
                    },
                    name:'legend_data',
                    type:'line',
                    data:data1,
                    
                }]
            },true);
            chart.setOption({
                backgroundColor:'#FFFFFF',
                grid:
                {
                show:true,
                left:"15%",
                right:"30px",
                },
                xAxis: [{
                        splitLine:{ show: true },                   //分隔线
                        type:'category',
                        boundaryGap:false,
                        data: dataTime.map(function (str) {
                            var str_before = str.split(' ')[0];
                            var str_after = str.split(' ')[1];
                            return str_after + '\n' + str_before;
                        }),
                        axisLabel:{
                            textStyle:{
                                fontSize:10                         //坐标轴刻度字体大小
                            }
                        },
                        
                }],
                yAxis:[
                    {
                        splitLine:{show:true,lineStyle:{type:'dashed'} },
                        type:'value',
                        show:'true',
                        name:yAxis_name2,
                        max:max2,
                        min:min2,
                        axisLabel:{
                            formatter:'{value}'
                        },
                        
                    },
                ],
                legend:{
                    data:[data2]
                },
                series:[{
                    itemStyle:{
                        normal:{
                            lineStyle:{
                                color:'#1AB91E',
                                width:1
                            }
                        }
                    },
                    name:'legend_data',
                    type:'line',
                    data:data2,
                    
                }]
            },true);
            mychart.setOption({
                backgroundColor:'#FFFFFF',
                grid:
                {
                show:true,
                left:"15%",
                right:"30px",
                },
                xAxis: [{
                        splitLine:{ show: true },
                        type:'category',
                        boundaryGap:false,
                        data: dataTime.map(function (str) {
                            var str_before = str.split(' ')[0];
                            var str_after = str.split(' ')[1];
                            return str_after + '\n' + str_before;
                        }),
                        axisLabel:{      
                            textStyle:{
                                fontSize:10
                            }
                        },
                        
                }],
                yAxis:[
                    {
                        splitLine:{show:true,lineStyle:{type:'dashed'} },
                        type:'value',
                        show:'true',
                        name:yAxis_name3,
                        max:max3,
                        min:min3,
                        axisLabel:{
                            formatter:'{value}'
                        },
                        
                    },
                ],
                legend:{
                    data:[data3]
                },
                series:[{
                    itemStyle:{
                        normal:{
                            lineStyle:{
                                color:'#1AB91E',
                                width:1
                            }
                        }
                    },
                    name:'legend_data',
                    type:'line',
                    data:data3,
                    
                }]
            },true);
            mychat.setOption({
                backgroundColor:'#FFFFFF',
                grid:
                {
                show:true,
                left:"15%",
                right:"30px",
                },
                xAxis: [{
                        splitLine:{ show: true },
                        type:'category',
                        boundaryGap:false,
                        data: dataTime.map(function (str) {
                            var str_before = str.split(' ')[0];
                            var str_after = str.split(' ')[1];
                            return str_after + '\n' + str_before;
                        }),
                        axisLabel:{
                            
                            textStyle:{
                                fontSize:10
                            }
                        },
                        
                }],
                yAxis:[
                    {
                        splitLine:{show:true,lineStyle:{type:'dashed'} },
                        type:'value',
                        show:'true',
                        name:yAxis_name4,
                        max:max4,
                        min:min4,
                        axisLabel:{
                            formatter:'{value}'
                        },
                        
                    },
                ],
                legend:{
                    data:[data4]
                },
                series:[{
                    itemStyle:{
                        normal:{
                            lineStyle:{
                                color:'#1AB91E',
                                width:1
                            }
                        }
                    },
                    name:'legend_data',
                    type:'line',
                    data:data4,
                    
                }]
            },true);
        }
    }
}
</script>

<style>
.back{
    width: 0.7rem;
    position:absolute;
}
.back_main{
    width: 0.21rem;
    height: 0.37rem;
    padding-top: 0.25rem;
}
.time_search{
    margin-top: 0.2rem;
    background: #FFFFFF;
    text-align: center;
    padding-bottom: 0.32rem;
}
.start_select{
    display: inline-block;
    width: 2.96rem;
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
.mnumber{
    font-size: 0.24rem;
    color: #999999;
}
.colo{
    color: #008CE5;
    font-size: 0.3rem;
}
.detail_da{
    background: #fff;
}
 table{
    border-collapse: collapse;
    width: 100%;
}
table,th, td{
    border: 1px solid #F2F2F2;
}
th{
    width: 1.25rem;
    height: 0.44rem;
    font-size: 0.24rem;
    color: #999999;
    font-weight: normal;
}
td{
    height: 0.44rem;
    font-size: 0.3rem;
    text-align: center;
}
.list_line{
    height: 1rem;
    margin-top: 0.2rem;
    position: relative;
    background: #fff;
    color: #008CE5;
}
.base_butt{
    width: 1.4rem;
    height: 0.56rem;
    text-align: center;
    line-height: 0.56rem;
    border: 1px solid rgba(0,140,229,1);
    border-radius: 28px;
    top: 0.22rem;
    position: absolute;
}
.list_show{
    left: 1.65rem;
}
.active{
    background:rgba(0,140,229,1);
    color: #FFFFFF;
}
.line_show{
    right: 1.65rem;
}
.temper{
    width: 1.08rem;
    font-size: 0.28rem;
    color:#008CE5;
}
.time-content{
    width: 3.18rem;
    font-size: 0.28rem;
    color:#008CE5;
}
.time-data{
    width: 3.18rem;
    font-size: 0.28rem;
    color: #999999;
    background: #FFFFFF
}
.detail-data{
    width: 1.08rem;
    font-size: 0.28rem;
    color: #999999;
    background: #FFFFFF
}
.lis_deta{
    overflow: scroll;
}
.no_data{
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -99px;
}
</style>
