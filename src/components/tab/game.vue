<script setup>
import game_data from '../../assets/data/game.json'

</script>

<template>
    <div class="game">
        <ul>
            
            <li v-for="(item, index) in game_data" :key="index">
                <a :href="item.url" target="_blank">
                    <div class="game-item-top">
                        <img :src="'https://mychat.api.zhuayuya.com/app_icon/'+item.icon" alt="">
                        <h1>{{item.title}}</h1>
                    </div>

                    <p>{{item.description}}</p>
                </a>
            </li>
            
        </ul>
    </div>
</template>

<style scoped>
a{
    text-decoration: none;
}
.game ul li p{
    height: 64px;
    padding: 8px 20px;
    font-size: 13px;
    line-height: 24px;
    color: rgb(60, 60, 60);
    /* 保留三行 */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.game-item-top h1{
    /* 超出一行省略号 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 10px;
    font-size: 16px;
    font-weight: 600;
    color: rgb(59, 59, 59);
}
.game-item-top img{
    width: 26px;
    height: 26px;
    border-radius: 50%;
    margin-right: 10px;
    margin-left: 16px;
}
.game-item-top{
    height: 46px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
}
.game-item{
    padding: 12px 20px;
}
.game ul li{
    list-style: none;
    width: 100%;
    height: 130px;
    background: #ffffff;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.08);
    border: 1px solid #f0f0f0;
    transition: all 0.2s ease-in-out;
}
.game ul li:hover{
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
}
.game ul{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    justify-content: left;
    height: calc(100vh - 340px);
    grid-gap: 20px;
    padding-bottom: 16px;
    padding-right: 16px;
    padding-left: 5px;
    overflow: auto;
    overflow-x: hidden;
}

.game ul::-webkit-scrollbar {
    display: none;
}
</style>