<template>
    <div style="height: 100%;position:relative">
        <div class="search">
            <div class="search-data" @click="Mapcont()">
                <img src="../../assets/images/search.png" class="serach-pic">
            </div>
            <input type="text" placeholder="请输入仪器名称" v-model="value" class="marchine-name">
        </div>
            <div id="allmap" :style="{height:mapheight+'px'}"></div>
    </div>
</template>

<script>
import BMap from 'BMap'
import BMap_Symbol_SHAPE_POINT from 'BMap_Symbol_SHAPE_POINT'
import { MessageBox } from 'mint-ui';
import { GETMAP } from '../../axios/axios'
import axios from 'axios';
export default {
    data(){
        return {
            mapheight:0,
            value:this.$store.state.all.searchText,               //搜索内容
            allmapData:[],          //所有数据
            menuIndex:this.$store.state.all.meumIndex,            //菜单栏切换
            r:[],
            lng:0,                  //经度
            lat:0,                  //纬度
            basestion:this.$store.state.all.baseStation,           //基站
        }
    },
    computed:{
        nowdata:function(){
            return this.$store.state.all.meumIndex
        },
        baseStation:function(){
            return this.$store.state.all.baseStation           //基站获取
        },
        //搜索内容获取
        sechText:function(){
            return this.$store.state.all.searchText
        }
    },
    watch:{
        nowdata(newVal,oldVal){
            this.menuIndex = newVal;
            this.Mapcont();
        },
        baseStation(newVal,oldVal){
            this.basestion = newVal;
            this.Mapcont();
        },
        sechText(newVal,oldVal){
            this.value = newVal;
            this.Mapcont();
        }
    },
    mounted(){
        this.ListHeight();
        this.Mapcont();
    },
    methods:{
        //高度计算
        ListHeight(){
            var windowwidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var headheight = 100*(windowwidth/750)*1.6
            var mintheight = document.getElementsByClassName('mint-tabbar')[0].clientHeight;
            this.mapheight = windowHeight-(100*(windowwidth/750)*1.02)-headheight-mintheight;

        },
        // 获取地图数据
        Mapcont(){
            //提交显示类型展示状态
            this.$store.commit('setsearchState',this.value);
            var userName = sessionStorage.getItem('name')
            var DomainAddress = sessionStorage.getItem('address')
            var port = sessionStorage.getItem('port')
            var URL= axios.create({
               baseURL:'http://'+DomainAddress
            })
            let params = {
                userName:userName,
                Identitys:port,
                groupId:this.basestion,
                giveAnAlarm:this.menuIndex,
                loggerName:this.value,
            }
            URL.get(GETMAP(params)).then(res=>{
                console.log(res)
                this.allmapData = res.data.Data;
                this.InitBaiduMap(this.allmapData);
                if(res.data.Data.length == 0){
                  MessageBox('数据不存在！');
                }
            })

        },
        // 初始化地图
        InitBaiduMap(data){
            console.log(data)
            var map = new BMap.Map('allmap')    // 创建地图实例
            map.clearOverlays();                //清除地图上的覆盖物
            //地图中心
            if(data.length != 0){
                var pot = new BMap.Point(data[0].Longitude,data[0].Latitude);
                var nowposition = new BMap.Marker(pot);
                map.centerAndZoom(pot,12)
            }else{
                var pot = new BMap.Point(116.46,39.92);
                var nowposition = new BMap.Marker(pot);
                map.centerAndZoom(pot,12)
            }
                      // 初始化地图，设置中心点坐标和地图级别
            // var myIcon = new BMap.Icon("markers.png", new BMap.Size(23, 25), {
            //     // 指定定位位置。
            //     // 当标注显示在地图上时，其所指向的地理位置距离图标左上
            //     // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
            //     // 图标中央下端的尖角位置。
            //     anchor: new BMap.Size(10, 25),
            //     // 设置图片偏移。
            //     // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
            //     // 需要指定大图的偏移位置，此做法与css sprites技术类似。
            //     imageOffset: new BMap.Size(0, 0 - index * 25)   // 设置图片偏移
            // });
            map.addOverlay(pot)
            // 添加控件
            // map.addControl(new BMap.GeolocationControl())
            map.addControl(new BMap.NavigationControl())        //添加平移缩放控件
            console.log(data)
            for (var i = 0;i<data.length;i++){
                var lng = data[i].Longitude;
                var lat = data[i].Latitude;
                var maker = this.AddMarker(new window.BMap.Point(lng,lat),i,map,data[i]);
                // console.log(i)
                this.AddInfoWindow(maker, data[i], i)           //信息窗口
            }
        },
        // 添加标注
        AddMarker(point, index,map,batter){
            var state= batter.LOGGER_STATE
            function decide(state){
                switch(state){
                    case"1":return('bluecar.png');break;
                    case"2":return('graycar.png');break;
                    case"3":return('redcar.png');break;
                    case"4":return('graycar.png');break;
                    default:'';
                }
            }
            var icon = new BMap.Icon(decide(state),
            new BMap.Size(40,49),{
                imageSize:new BMap.Size(40,49),
                imageOffset:new BMap.Size(0,0)
            });
            var map = map
            var marker = new BMap.Marker(point,{icon:icon});
            map.addOverlay(marker);
                return marker;
        },

        // 信息窗口
        AddInfoWindow(marker,poi){
            // console.log(marker,poi)
            var title = '<div class="info-title">'+'<p class="info-name">'+poi.LOGGER_NAME+'</p>'+'<span class="info-time">'+poi.LOGS_TIME+'</span>'+'</div>';
            var html = [];
            html.push('<ul>');
            html.push('<li style="height:35px;position:relative;">')
            compile0(poi.LOGGER_CHNUM,poi.CHONE_TYPE)
            html.push('<div style="position:absolute;top:0;right:0;'+show0(poi.LOGGER_CHNUM)+'">'+'<p class="temdata"'+compute(poi.LOGS_CHONE,poi.CHONE_HIGH,poi.CHONE_LOW)+'>'+poi.LOGS_CHONE+poi.CHONE_TYPE+'</p>'+'<div class="proce">'+'</div>'+'<span class="normal">'+'正常'+'</span>'+'<span class="warni">'+'预警'+'</span>'+'<span class="over">'+'超标'+'</span>'+'</div>')
            html.push('</li>')
            html.push('<li style="height:35px;position:relative;">')
            compile1(poi.LOGGER_CHNUM,poi.CHTWO_TYPE)
            html.push('<div style="position:absolute;top:0;right:0;'+show1(poi.LOGGER_CHNUM)+'">'+'<p class="temdata"'+compute(poi.LOGS_CHTWO,poi.CHTWO_HIGH,poi.CHTWO_LOW)+'>'+poi.LOGS_CHTWO+poi.CHTWO_TYPE+'</p>'+'<div class="proce">'+'</div>'+'<span class="normal">'+'正常'+'</span>'+'<span class="warni">'+'预警'+'</span>'+'<span class="over">'+'超标'+'</span>'+'</div>')
            html.push('</li>')
            html.push('<li style="height:35px;position:relative;">')
            compile2(poi.LOGGER_CHNUM,poi.CHTHR_TYPE)
            html.push('<div style="position:absolute;top:0;right:0;'+show2(poi.LOGGER_CHNUM)+'">'+'<p class="temdata"'+compute(poi.LOGS_CHTHREE,poi.CHTHR_HIGH,poi.CHTHR_LOW)+'>'+poi.LOGS_CHTHREE+poi.CHTHR_TYPE+'</p>'+'<div class="proce">'+'</div>'+'<span class="normal">'+'正常'+'</span>'+'<span class="warni">'+'预警'+'</span>'+'<span class="over">'+'超标'+'</span>'+'</div>')
            html.push('</li>')
            html.push('<li style="height:35px;position:relative;">')
            compile3(poi.LOGGER_CHNUM,poi.CHFOU_TYPE)
            html.push('<div style="position:absolute;top:0;right:0;'+show3(poi.LOGGER_CHNUM)+'">'+'<p class="temdata"'+compute(poi.LOGS_CHFOUR,poi.CHFOU_HIGH,poi.CHFOU_LOW)+'>'+poi.LOGS_CHFOUR+poi.CHFOU_TYPE+'</p>'+'<div class="proce">'+'</div>'+'<span class="normal">'+'正常'+'</span>'+'<span class="warni">'+'预警'+'</span>'+'<span class="over">'+'超标'+'</span>'+'</div>')
            html.push('</li>')
            html.push('</ul>')
            // console.log(title)
            // 判断通道类型
            function compile0(s,x){
                if(s>=1){
                    switch(x){
                    case"°C":return(html.push('<div class="wendu"/>'+'</div>'));break;
                    case"%RH":return(html.push('<div class="rh"/>'+'</div>'));break;
                    case"UW/":return(html.push('<div class="uw"/>'+'</div>'));break;
                    case"LUX/":return(html.push('<div class="lux1"/>'+'</div>'));break;
                    default:'';
                }
                }else{
                    return '<div style="display:none"></div>'
                }
            };
            // 判断通道类型
            function compile1(s,x){
                if(s>=2){
                    switch(x){
                    case"°C":return(html.push('<div class="wendu"/>'+'</div>'));break;
                    case"%RH":return(html.push('<div class="rh"/>'+'</div>'));break;
                    case"UW/":return(html.push('<div class="uw"/>'+'</div>'));break;
                    case"LUX/":return(html.push('<div class="lux1"/>'+'</div>'));break;
                    default:'';
                }
                }else{
                    return '<div style="display:none"></div>'
                }
            };
            // 判断通道类型
            function compile2(s,x){
                if(s>=3){
                    switch(x){
                    case"°C":return(html.push('<div class="wendu"/>'+'</div>'));break;
                    case"%RH":return(html.push('<div class="rh"/>'+'</div>'));break;
                    case"UW/":return(html.push('<div class="uw"/>'+'</div>'));break;
                    case"LUX/":return(html.push('<div class="lux1"/>'+'</div>'));break;
                    default:'';
                }
                }else{
                    return '<div style="display:none"></div>'
                }
            };
            // 判断通道类型
            function compile3(s,x){
                if(s>=4){
                    switch(x){
                    case"°C":return(html.push('<div class="wendu"/>'+'</div>'));break;
                    case"%RH":return(html.push('<div class="rh"/>'+'</div>'));break;
                    case"UW/":return(html.push('<div class="uw"/>'+'</div>'));break;
                    case"LUX/":return(html.push('<div class="lux1"/>'+'</div>'));break;
                    default:'';
                }
                }else{
                    return '<div style="display:none"></div>'
                }
            };
            function show0(x){
                if(x>=1){
                    return 'display:block'
                }else{
                    return 'display:none'
                }
            }
            function show1(x){
                if(x>=2){
                    return 'display:block'
                }else{
                    return 'display:none'
                }
            }
            function show2(x){
                if(x>=3){
                    return 'display:block'
                }else{
                    return 'display:none'
                }
            }
            function show3(x){
                if(x>=4){
                    return 'display:block'
                }else{
                    return 'display:none'
                }
            }
            // 计算数据显示的位置
            function compute(x,y,z){
                var dis =(x-z)*80/(y-z)
                if(x>y||x<z){
                    return 'style="left:115px;color:red"'
                }else{
                        return 'style="left:'+dis+'px"'
                }
            }
            var infoWindow = new BMap.InfoWindow(html.join(""),{title:title,width:146});
            marker.addEventListener("click", function(e){
                marker.openInfoWindow(infoWindow)
                console.log('pppp')
            });
        },
        // 获取浏览器定位
        // getlocation(){
        //     var geolocation = new BMap.Geolocation();
        //     geolocation.getCurrentPosition((r) =>{
        //         console.log(r)
        //         if(geolocation.getStatus()== BMAP_STATUS_SUCCESS){
        //             console.log(r)
        //             this.lng = r.point.lng;
        //             this.lat = r.point.lat;
        //             this.Mapcont();
        //         }else{
        //         }
        //     })
        // }
    }
}
</script>

<style>
.anchorBL{
    display: none;
}
.BMap_pop>img{
    top:6px !important;
    width: 10px !important;
    height: 10px !important;
}
.wendu{
    width: 25px;
    height: 25px;
    position: absolute;
    background-image: url('../../assets/images/tem.png');
    background-size: 100%;
    background-repeat: no-repeat;
    margin-top: 5px;
}
.temdata{
    font-size: 12px;
    color:#666666;
    position: relative;
}
.proce{
    width:180px;
    height: 4px;
    background: linear-gradient(to right,#D0D0D0,#F64949)
}
.normal{
    font-size: 12px;
    position: absolute;
    color: #666666;
}
.warni{
    font-size: 12px;
    color: #666666;
    position: absolute;
    left: 50%;
    margin-left: -12px;
}
.over{
    font-size: 12px;
    color: #666666;
    position: absolute;
    right: 0;
}
.uw{
    width: 25px;
    height: 25px;
    position: absolute;
    background-image: url('../../assets/images/uw.png');
    background-size: 100%;
    background-repeat: no-repeat;
    margin-top: 5px;
}
.rh{
    width: 25px;
    height: 25px;
    position: absolute;
    background-image: url('../../assets/images/rh.png');
    background-size: 100%;
    background-repeat: no-repeat;
    margin-top: 5px;
}
.lux1{
    width: 25px;
    height: 25px;
    position: absolute;
    background-image: url('../../assets/images/lux.png');
    background-size: 100%;
    background-repeat: no-repeat;
    margin-top: 5px;
}
</style>
