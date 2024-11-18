<script setup>
import { useMainStore } from '../../store/index'
const stores = useMainStore()
</script>


<template>
    <div class="home">
        <ul>
            <li>
                <h1>打工人语录</h1>
                <p>{{ stores.saying }}</p>
            </li>

            <li>
                <div class="home-title">
                    <h1>摸鱼解密</h1>
                    <a-tooltip :title="stores.decrypt.answer">
                        <span>解密</span>
                    </a-tooltip>
                    
                </div>
                <p>{{ stores.decrypt.text }}</p>
            </li>

            <li>
                <h1>历史上的今天</h1>
                <p>{{ stores.historyToday }}</p>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.home-title span{
    padding: 7px 12px;
    background: #272727;
    border-radius: 5px;
    border-radius: 5px;
    color: #fff;
    font-size: 12px;
    margin-left: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
}
.home-title span:hover{
    box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
}
.home-title{
    display: flex;
}
.home ul li p{
    font-size: 14px;
    color: #454545;
    margin-top: 28px;
    letter-spacing: 1px;
}
.home ul li h1{
    font-size: 24px;
    font-weight: bold;
    color: #212121;
}
.home ul li{
    height: 108px;
    border-bottom: 1px solid #ccc;
    margin-top: 50px;
    margin-bottom: 50px;
}
</style>