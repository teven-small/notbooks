<template>
    <div style="height:100%">
        <div class="head">
            <div class="goback" @click="Back()">
                <img src="../../assets/images/left.png" alt="" class="goback_main">
            </div>
            <p class="title">处理措施</p>
            <p class="complete" @click="Complte()">完成</p>
        </div>
        <div class="warn_detail">
            <p>报警设备：{{ConSlice(contentDetail)}}</p>
            <p style="margin-top: 0.18rem;">报警内容：{{DetaSlic(contentDetail)}}</p>
        </div>
        <div>
            <textarea class="measure_content" v-model="Meascontent"></textarea>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { MessageBox } from 'mint-ui'
import { DEAL } from '../../axios/axios'
export default {
    data(){
        return {
            contentDetail:'',               //报警内容
            Meascontent:'',                 //处理措施
            machID:null,                    //设备ID
        }
    },
    mounted(){
        console.log(this.$route.params);
        var Allcontent = this.$route.params.data;
        this.contentDetail = Allcontent.AlarmContent;
        this.machID = Allcontent.AlarmId;
        //判断处理措施是否存在
        if(Allcontent.TreatmentMeasures!=undefined){
            this.Meascontent = Allcontent.TreatmentMeasures;
        }
    },
    methods:{
        //返回
        Back(){
            this.$router.replace('/warning');
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
        //提交处理措施
        Complte(){
            var DomainAddress = sessionStorage.getItem('address')
            var port = sessionStorage.getItem('port')
            var URL= axios.create({
               baseURL:'http://'+DomainAddress
            })
            let params = {
                alarmId:this.machID,
                Identitys:port,
                treatmentMeasures:this.Meascontent,
            }
            console.log(params);
            URL.get(DEAL(params)).then(res=>{
                console.log(res)
                if(res.data.State=='200'){
                    MessageBox.alert('提交成功').then(action=>{
                        this.Back()
                    })      
                }else{
                    MessageBox.alert('提交失败')
                }
            })
        }
    }
}
</script>

<style>
.goback{
    width: 0.7rem;
    position:absolute;
}
.goback_main{
    width: 0.21rem;
    height: 0.37rem;
    padding-top: 0.25rem;
}
.complete{
    width: 58px;
    font-size: 0.3rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    position: absolute;
    right: 0;
    top: 0;
}
.warn_detail{
    padding: 0.27rem 0.44rem;
    font-size: 24px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153,153,153,1);
}
.measure_content{
    height: 3.18rem;
    background: rgba(255,255,255,1);
    border: 1px solid rgba(215,215,215,1);
    width: 100%;
    box-sizing: border-box;
    font-size:0.26rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(153,153,153,1);
    resize:none;
    text-indent: 2em
}
</style>
