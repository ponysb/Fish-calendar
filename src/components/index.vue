<script setup>
import { reactive } from 'vue';
import { useMainStore } from '../store/index'
const stores = useMainStore()

import Rili_Jingdian from './rili/rili_jingdian.vue' //第一个
import Rili_putong from './rili/rili_putong.vue'  //   第二个
import Rili_lao from './rili/rili_lao.vue'  //   第三个

import Home from './tab/home.vue'
import Hot from './hot/hot.vue'
import Game from './tab/game.vue'

stores.getDecrypt()  // 获取今天访问人数
stores.submitCalendar()  // 提交日历数据

const data = reactive({
    drawer: 'width: 150px;',
    drawer_show: false,

    tab_index: 0,

    // 日历切换
    calendar_index: 0,
})

function click_hot() {
    if(data.drawer === 'width: 150px;'){
        data.drawer = 'width: 88%;'

        setTimeout(() => {
            data.drawer_show = true;
        }, 300)
        
    }else{
        data.drawer = 'width: 150px;'
        data.drawer_show = false;
    }
}


// tab切换
function tab_change(index) {
    if(index === 2){
        window.open('https://mychat.zhuayuya.com/')
        return
    }
    data.tab_index = index;
}


// 加减一天方法
function addDays(dateStr, days) {
    // 将字符串转换为日期对象
    const date = new Date(dateStr);
    // 加减指定天数
    date.setDate(date.getDate() + days);
    // 格式化回指定的日期格式
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 加一天或减一天
function add_day(type) {
    if(type === 'add'){
        stores.today.day = addDays(stores.today.day, 1);
    }else{
        stores.today.day = addDays(stores.today.day, -1);
    }

    // 获取当前url去掉参数
    const url = window.location.href.split('?')[0];
    window.location.href = `${url}?date=${stores.today.day}`;
}

</script>

<template>
    <div class="box">
        <div class="content">
            <!-- 日历 -->
            <div class="calendar">
                <div class="calendar-tab">
                    <span @click="data.calendar_index = 0" :class="{active_rili: data.calendar_index === 0}">经典日历</span>
                    <span @click="data.calendar_index = 1" :class="{active_rili: data.calendar_index === 1}">个性日历</span>
                    <span @click="data.calendar_index = 2" :class="{active_rili: data.calendar_index === 2}">旧版日历</span>
                    <p>点击日历复制日历图片</p>
                </div>

                <div class="calendar-content">
                    <template v-if="data.calendar_index === 0">
                        <Rili_Jingdian />
                    </template>

                    <template v-if="data.calendar_index === 1">
                        <Rili_putong />
                    </template>

                    <template v-if="data.calendar_index === 2">
                        <Rili_lao />
                    </template>
                    
                </div>
            </div>

            <!-- 日历右侧内容 -->
            <div class="right">

                <!-- 内容头部 -->
                <div class="header">
                    <div class="header-left">
                        <div class="header-left-title">
                            <h1>摸鱼日历</h1>
                            <i></i>
                        </div>

                        <div class="header-left-date">
                            <div @click="add_day('sub')">
                                <img src="../assets/zuo_hei.svg" alt="">
                            </div>
                            
                            <p>{{stores.today.day}} <span>/</span> 周{{stores.today.week}}</p>

                            <div @click="add_day('add')">
                                <img src="../assets/you_hei.svg" alt="">
                            </div>
                            
                        </div>
                    </div>

                    <div class="header-right">
                        <a href="https://www.zhuayuya.com/" target="_blank">回到主站</a>
                        <img src="../assets/logo.svg" alt="">
                    </div>
                </div>

                <!-- tab切换 -->
                <div class="tab">
                    <div class="tab-item-button">
                        <span @click="tab_change(0)" :class="{active: data.tab_index === 0}">摸摸鱼</span>

                        <span @click="tab_change(1)" :class="{active: data.tab_index === 1}">摸鱼小游戏</span>
                        <span @click="tab_change(2)">摸鱼聊天室</span>
                        <!-- <span>实体摸鱼日历</span>
                        <span>摸鱼日历API</span> -->
                    </div>

                    <div class="tab-item">
                        <span>今日 {{stores.todayVisitors}} 人访问过</span>
                        <span><a class="support" href="https://vip.zhuayuya.com/" target="_blank">支持我们</a></span>
                    </div>

                    <div style="margin-top: 38px;">
                        <!-- 切换界面 -->

                        <template v-if="data.tab_index === 0">
                            <Home />
                        </template>
                        
                        <template v-if="data.tab_index === 1">
                            <Game />
                        </template>
                        
                    </div>

                </div>

            </div>

            <div class="footer">

            </div>

            <!-- 热榜 -->
            <div :style="data.drawer" class="hot">
                <div>
                    <h2 v-if="!data.drawer_show">摸鱼热榜</h2>
                </div>

                <div v-if="data.drawer_show">
                    <Hot />

                </div>

                <!-- 按钮 -->
                <i @click="click_hot">
                    <img v-if="data.drawer_show" src="../assets/you_bai.svg" alt="">
                    <img v-if="!data.drawer_show" src="../assets/zuo_bai.svg" alt="">
                </i>
            </div>
        </div>
    </div>
</template>

<style scoped>
.support{
    color: #262626;
    text-decoration: none;
}
.support:hover{
    text-decoration: underline;
}
.tab-item span{
    margin-right: 58px;
    font-size: 14px;
    color: #262626;
}
.tab-item{
    margin-top: 38px;
}
.tab-item-button span{
    display: block;
    padding: 10px 16px;
    /* background: #212121; */
    margin-right: 16px;
    border: 3px solid #212121;
    border-radius: 6px;
    cursor: pointer;
    /* 动效 */
    transition: all.3s ease;
}
.tab-item-button span:hover{
    display: block;
    padding: 10px 16px;
    background: #212121;
    margin-right: 16px;
    border: 3px solid #212121;
    border-radius: 6px;
    color: #fff;
}
.active{
    background: #212121;
    color: #fff;
}

.tab-item-button{
    display: flex;
    margin-top: 16px;
}
.header-right a{
    margin-bottom: 2px;
    color: #212121;
    font-size: 14px;
    text-decoration: none;
}
.header-right a:hover{
    color: #0259d2;
    text-decoration: underline;
}
.header-right img{
    width: 38px;
    margin-left: 6px;
}
.header-right{
    display: flex;
    align-items: end;
}
.header-left-date p{
    margin-top: -8px;
    margin-left: 5px;
    margin-right: 5px;
}
.header-left-date span{
    font-size: 24px;
    color: #3D3D3D;
}
.header-left-date img{
    width: 16px;
    height: 16px;
    cursor: pointer;
}
.header-left-date{
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #6C6C6C;
    margin-top: -5px;
    margin-left: 10px;
}
.header-left-title i{
    display: block;
    position: absolute;
    top: 15px;
    width: 96px;
    height: 10px;
    background: #6C6C6C;
}
.header-left-title h1{
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #212121;
    position: relative;
    z-index: 1;
}
.header-left-title{
    position: relative;
}
.header-left{
    display: flex;
    align-items: center;
}
.header{
    display: flex;
    justify-content: space-between;
    margin-top: 68px;
}
.right{
    width: 80%;
    height: 100%;
    padding-left: 30px;
    /* background: #212121; */

}
.footer{
    width: 280px;
}
.hot i img{
    width: 26px;
    height: 26px;
    
}
.hot i{
    position: absolute;
    top: 50%;
    left: -36px;
    transform: translateY(-50%);
    cursor: pointer;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #212121;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: -10px 0px 30px rgba(0,0,0,.2);
}
.hot h2{
    font-size: 24px;
    color: #212121;
    margin-top: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}
.hot{
    border: 10px solid #212121;
    height: 100%;
    background: #fff;
    position: absolute;
    right: -10px;
    top: -10px;
    box-shadow: -10px 0px 30px rgba(0,0,0,.2);
    text-align: center;
    z-index: 2;
    transition: all .3s ease;
}
.calendar-content{
    border-radius: 25px;
    box-shadow: 0px 10px 30px rgba(0,0,0,.3);
    cursor: pointer;
}
.active_rili{
    background: #212121 !important;
}
.calendar-tab span{
    padding: 5px 10px;
    cursor: pointer;
    margin-right: 10px;
    background: #535353;
    color: #fff;
    font-size: 12px;
    border-radius: 6px 6px 0 0;
}

.calendar-tab p{
    font-size: 12px;
    color: #fff;
    padding: 5px 8px;
    background: #212121;
    border-radius: 6px 6px 0 0;
}
.calendar-tab{
    margin-left: 30px;
    margin-top: 10px;
    display: flex;
}
.calendar{
    padding: 30px;
    padding-left: 38px;
    /* width: 20%; */
}

.content{
    height: 96%;
    width: 97.5%;
    display: flex;
    border: 10px solid #212121;
    position: relative;
}

.box{
    border: 10px solid #212121;
    width: calc(100% - 20px);
    height: calc(100vh - 20px);
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 媒体查询 */
@media screen and (max-width: 1080px){
    .right{
        display: none;
    }
}
</style>