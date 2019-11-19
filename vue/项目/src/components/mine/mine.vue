<template>
    <div style="height:100%">
        <div class="head">
            <p class="title">我的</p>
        </div>
        <div class="content">
            <div class="log">
                <img class="log-pic" src="../../assets/images/pic_logo.png"/>
            </div>
            <!-- <p class="company-name">深圳华图测控系统有限公司</p> -->
            <div class="intro">
                <!-- <p class="introduce-title">介绍</p> -->
                <p class="introduce-content">深圳市华图测控系统有限公司(HUATO System Co.,Ltd.)成立于2008年，公司坐落于深圳市宝安区桃花源科技创新园（国家级留学生创业服务中心），核心研发团队均有博士或硕士学历，曾长期留学美国或工作于世界五百强企业研发部门。华图公司聚焦于测量与控制系统领域，业务包括监测与控制系统软硬件的研发、生产、销售与服务，是深圳市政府重点扶持的高新技术企业。</p>
            </div>

            <div class="company-information">
                <ul>
                    <li v-for="(item,index) in introlist" :key=index class="information">
                        <p class="name">{{item.name}}</p>
                        <p class="cont">{{item.cont}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            introlist:[
                {
                    name:'电话：',
                    cont:'+86-755-23012549'
                },
                {
                    name:'传真：',
                    cont:'+86-755-29748856'
                },
                {
                    name:'Email：',
                    cont:'sales@huato.com'
                },
                {
                    name:'网址：',
                    cont:'http://www.huato.com'
                }
            ]
        }
    }
}
</script>

<style>
@import "./mine";
</style>
