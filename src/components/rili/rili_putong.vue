<script setup>
  import { ref, reactive } from "vue";
  import {Solar, Lunar, HolidayUtil} from 'lunar-javascript';
  import html2canvas from 'html2canvas';
  import axios from 'axios'
  import { message } from 'ant-design-vue';

  const today = new Date();
  const data = reactive({
    a:[
      {content:'周一周一天打雷劈',img:''},
      {content:'周二摆烂啥也不干',img:''},
      {content:'周三摸鱼干活多余',img:''},
      {content:'周四躺平量力而行',img:''},
      {content:'周五周五敲锣打鼓',img:''},
      {content:'周六加班作恶多端',img:''},
      {content:'周日周日死期将至',img:''}
    ],
    b:[
      {name:'元旦',date:'2025-01-01'},
      {name:'春节',date:'2025-01-29'},
      {name:'清明',date:'2024-04-04'},
      {name:'劳动',date:'2024-05-01'},
      {name:'端午',date:'2024-06-10'},
      {name:'中秋',date:'2024-09-17'},
      {name:'国庆',date:'2024-10-01'}
    ],
    c:[],
    d:[],
    e:'',
    z:['3','05','三'],
    f:[
      "锄禾日当午，打工好辛苦",
      "古藤老树昏鸦，上班摸鱼，下班回家",
      "古道西风瘦马，老板坐车，我骑爱玛",
      "人之初，性本善，不想上班怎么办",
      "打工只是一场戏，大家因为贫困而相聚",
      "天天想辞职，月月拿全勤",
      "上辈子作恶多端，这辈子早起上班",
      "打工打工两手空空，闹钟一响就要开工",
      "今天打工不努力，明日回村掰苞米",
      "早上多睡了五分钟，电动车都能拧冒烟",
      "我上班的怨气可以复活十个邪剑仙",
      "今日心情：没心情工作",
      "余额：你最好创造心情",
      "上班=有钱，有钱=快乐，所以上班=快乐",
      "打工的快乐是你想象不到的，因为打工根本就没有快乐",
      "只要我一直不努力，老板，就过不上他想要的生活",
      "日常四个期盼：等周五、等下班、等快递、等发工资",
      "放假发的朋友圈叫朋友圈，上班发的朋友圈叫劳改日记",
      "葡萄酒开了都要醒五分钟，人醒了却要立刻去上班",
      "有人相爱，有人夜里看海，有人七八个闹钟起不来",
      "每天早上睡着都要骂自己几句，怎么找了个早八的工作",
      "装模做样上班，真心实意下班",
      "我上班领的不是薪水，而是精神损失费",
      "没有困难的工作，只有勇敢的打工人",
      "生活不是卡通，请你起床打工。",
      "努力不一定被看到 但摸鱼休息一定会。",
      "金窝银窝不如我的办公桌",
      "加班不是福报 摸鱼才是王道",
      "一星期 总有那么5天摸鱼上班",
      "人之初性本善 不想上班怎么办",
      "漫长的岁月 竟没有一天适合上班",
      "刚喝了一杯美式，好苦，跟我的命一样苦。",
      "世界上只有一种英雄主义，那就是早起上班。",
      "如果坐牢有平替，那一定是上班。",
    ],
    g:[
      "世界上最痛苦的三件事 第一，上班 第二，早起为了去上班 第三，早睡为了早起去上班",
      "我真的太喜欢上班了，这种低人一等，累死累活还赚不到钱的感觉，真的太让人着迷了",
      "办公室为什么一直弥漫着一股海鲜味？原来都是你们在摸鱼？",
      "小时候不明白章鱼哥天天上班为什么拉着个脸，直到我天天上班我才明白",
      "每天闹钟响的时候，我都会在心里问一遍自己：这点逼钱真的非赚不可吗？",
      "上班前：拜托拜托，我真的很需要这份工作;上班后：那你去开除我啊",
      "摸鱼时：这钱还挺好赚 认真工作时：你他妈的给我几个钱啊",
      "工资就像大姨妈，一个月来一次，一个星期左右就没了。",
      "上辈子诡计多端，这辈子高风险上班 ，生活你好，我叫累死拉倒。",
      "当我一觉醒来，发现腰不酸了，腿不疼了，精神饱满，容光焕发，我就知道，我迟到了。",
      "你每天都很忙的样子，可是你又穷，所以你在忙什么？",
      "去看牙，牙医问我年纪轻轻的牙齿怎么磨损这么严重？我说这些年，我都是咬着牙过来的。",
      "皮革厂会倒，小姨子会跑，只有你打工到老！加油打工人！",
      "想买一件羽绒服，但是999感冒灵才22块钱，于是我又穿着短裤出门了！早安，打工人！",
      "靠别人是公主，“靠你叽哇”是日本人，靠自己是光荣的打工人！",
      "KFC看到一男一女吃一根薯条，还嘴对嘴抢着吃，千万别活成他们那样，加油！打工人",
      "真的很喜欢上班，喜欢打工，那种累死累活也赚不到钱的滋味真令我着迷。",
      "上班还没有存款的人那都叫自费打工，不用羡慕，我已经自费打工好几年了。",
      "什么叫万死不辞，就是每天被气死一万次，依然不辞职。",
      "奥德彪至死都认为他生活过得不好是因为香蕉拉得不够多",
      "为什么要感到伤心，难道你的生活还不够可笑吗？",
    ],
    h:[
      '这台手术很成功，我失败的人生……结束了。',
      "人的心脏都在左边，我们要如何拥抱才能心心相印。",
      "我闭上眼睛触碰星空，阅读宇宙留给我的盲文。",
      "有目的地人生才会迷路，我只是来世界散步。",
      "为什么要感到伤心，难道你的生活还不够可笑吗？",
      "成年人的崩溃从算了开始，计算机的崩溃从不算了开始。",
      "停车的人应该是瞎子吧，不然为什么把车停在盲道上？",
      "在禁欲的寺庙求姻缘，向不出门的方丈为前路在何方。",
      "“我出门了。”流浪汉踏进收容所的大门时对身后的城市说道。",
      "小明因为没有买VIP，被广告商判了15s有期徒刑。",
      "妈妈做的面可以直接吃，但是方便面却还要我泡，我真不知道方便在哪。",
      "写了又删的话，才是真心话。",
      "是真的想我了？还是没有遇见更好的人。",
      "我怕他知道，怕他不知道，怕他装作不知道。",
      "小时候不理解老人晒太阳，一坐就是半天。长大了才明白，目之所及皆是回忆，心之所想皆是过往，眼之所看皆是遗憾。",
      "考59分比考0分更难过最痛苦的不是不曾拥有，而是差一点就可以。",
      "驮上香蕉无法刹车，卸下香蕉无法生活 --奥德彪",
    ],
    i:[
      "不同意，意不同：一晚上，就变红",
      "三刀短，作歹长。除庇护，终得亡",
      "一云底，一支箭，一张口，一声叹",
      "耳边有，两张口：一大口，一小口",
      "外看方，里看方，给钱后，就球状",
      "山一座，岩上挪。水一潭，向下落",
      "一星下，一两峰，一田中，一物动",
      "清瓷上，画半屏：小嘴巴，长脖颈",
      "夜将晓，一火着。灭掉先，拿水浇",
      "半光荧，半飞萤。半蜡尽，半焰明",
      "在东边，草桥连，在西边，雨水连",
      "走进里，先落涕。传达意，说及第",
      "声势大，一水流，先到前，后来后",
      "梅放西，浪奔东。心无悔，泪眼腾",
      "天穹下，一水长。沛公前，是子房",
      "闻锹声，宵挖宝，心要细，声要小",
      "聚会办，请吃饭。女客先，到中间",
      "带走火，炸一洞。火灭后，炸一孔",
      "辞行前，遇上官。肚子里，能撑船",
      "一帽子，树上挂，一女娃，爬上拿",
      "一日前，成双行，两日后，歌声听",
      "天空上，花落下，见着后，觉得大",
      "说兑现，雨晴见。说完后，变一年",
      "宝钗前，叶翻飞，不要走，辛苦追",
      "说是猪，不是猪。说是猪，狗不如",
      "买残本，有言先：念无得，倒着念",
    ]
  })


  //随机文案
  function suijiwenan(e){
    if(e == "f"){
      return data.f[Math.floor(Math.random() * (data.f.length))]
    }

    if(e == "g"){
      return data.g[Math.floor(Math.random() * (data.g.length))]
    }

    if(e == "i"){
      return data.i[Math.floor(Math.random() * (data.i.length))]
    }
  }


  //今天几月几日周几
  function riqi_(){
    let zhou = ['一','二','三','四','五','六','天']
    data.z[0] = today.getMonth() + 1
    data.z[1] = today.getDate()
    data.z[2] = zhou[today.getDay()-1]
  }
  riqi_()


  //计算距离发薪日
  function faxin(e) {
    // 获取本月的第15天的日期
    var fifteenthOfMonth = new Date(today.getFullYear(), today.getMonth(), e);

    // 检查今天是否在本月的15日之前
    if (today.getDate() <= e) {
      // 计算今天距离本月15日的天数
      var daysUntil15th = Math.ceil((fifteenthOfMonth - today) / (1000 * 60 * 60 * 24));
      // console.log('距离本月15日还有 ' + daysUntil15th + ' 天');
      return daysUntil15th
    } else {
      // 计算今天距离下个月15日的天数
      var firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      var fifteenthOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, e);
      var daysUntil15th = Math.ceil((fifteenthOfNextMonth - today) / (1000 * 60 * 60 * 24));
      // console.log('距离下个月15日还有 ' + daysUntil15th + ' 天');
      return daysUntil15th
    }
  }


  //获取本月有多少天
  function benyuetianshu(){
    // 获取本月的第一天
    var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // 获取下个月的第一天
    var firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    // 计算本月天数
    var daysInMonth = Math.floor((firstDayOfNextMonth - firstDayOfMonth) / (1000 * 60 * 60 * 24));

    return daysInMonth
  }


  //距离节日时间
  function jieri(){
    for (let index = 0; index < data.b.length; index++) {
      var startDate = new Date(today.toISOString().split('T')[0]) // 开始日期
      var endDate = new Date(data.b[index].date);   // 结束日期
      // 计算两个日期之间的天数
      var timeDifference = endDate - startDate;
      var daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      if(daysDifference > 0){
        // console.log('两个日期之间相差 ' + daysDifference + ' 天');
        return "距离"+data.b[index].name+"还剩："+daysDifference+"天"
        break;
      }
    } 
  }



  //周几文案
  function zhouji(){
    // console.log(data.a[today.getDay()-1].content)
    if(today.getDay() == 0){
        return data.a[6].content
    }else{
        return data.a[today.getDay()-1].content
    }
  }


  //距离周末还剩多少天
  function julizhoumo(){
    // 计算今天是星期几 (0 表示星期天, 1 表示星期一, 以此类推)
    var currentDay = today.getDay();
    var isWeekend = currentDay === 0 || currentDay === 6;

    // 计算距离周末的天数
    var daysUntilWeekend;
    if (currentDay === 0) {
        // 如果今天是星期天
        daysUntilWeekend = 4; // 距离下个星期五还有 5 天
    } else {
        daysUntilWeekend = 4 - currentDay + 2; // 加 1 表示包括今天
    }

    if (isWeekend) {
      return 0
    } else {
        return daysUntilWeekend
    }

    
  }

  //获取黄历信息
  function huangli(){
    var d = Lunar.fromDate(new Date());

    // 宜
    var l = d.getDayYi();
    for (var i=0, j=l.length; i<j; i++){
      if(i > 4){
        break;
      }else{
        data.c.push(l[i])
      }
      
    }

    // // 忌
    l = d.getDayJi();
    for (var ii=0, jj=l.length; ii<jj; ii++){
      if(ii > 4){
        break;
      }else{
        data.d.push(l[ii])
      }
    }
  }
  
  //历史上的今天
  function lishi(){
    let get_lishi = localStorage.getItem('lishi')
    if(get_lishi != null){
     if(JSON.parse(get_lishi).date == today.toISOString().split('T')[0]){
      data.e = JSON.parse(get_lishi).content
     }else{
      get_http_lishi()
     }
    }else{
      get_http_lishi()
    }

  }

  //发送请求存图片
  function set_img(e){
    axios.post('https://root.zhuayuya.com:8325/set_rili', {
      img:e,
      date:today.toISOString().split('T')[0]
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  

  //请求历史上的今天
  function get_http_lishi(){
    axios.get('https://api.leafone.cn/api/lishi')
      .then(function (response) {
        // 处理成功情况
          data.e = response.data.data.list[0].title
          localStorage.setItem(
            'lishi',JSON.stringify({content:response.data.data.list[0].title,date:today.toISOString().split('T')[0]})
          )
      })
      .catch(function (error) {
        // 处理错误情况
        // console.log(error);
        data.e = "摸鱼办今日出现了重大bug"
      })
      .finally(function () {
        // 总是会执行
      });
  }
  huangli()
  lishi()


  //图片base64转文件格式，复制图片用的
  function base64ToBlob(dataurl) {
    var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
    while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

  //生成图片
  const imageTofile1 = ref(null)
  function imageTofile_click(){
    // console.log('请等待')
    message.warning('复制中请勿离开本页面', 10);
    window.pageYOffset = 0;
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    html2canvas(imageTofile1.value, {
        useCORS: true,
        width: 520,
        height: 808,
        windowHeight: imageTofile1.value.scrollHeight,
        scale: 2
      }).then((canvas) => {
        let url = canvas.toDataURL("image/png");
        console.log(base64ToBlob(url).type)
       
        navigator.clipboard.write([
          new window.ClipboardItem({ 
            [base64ToBlob(url).type]: base64ToBlob(url) 
          })
        ]);
        set_img(url)
        // console.log('成功')
        message.success('摸鱼日历已复制到剪切板', 10);
      })
  }

  //打开摸鱼鸭
  function open_zhuayuya(){
    window.open("https://www.zhuayuya.com")
  }

//获取api
function get_api(){
  window.open("https://docs.qq.com/doc/DY3NRVUpxZWRsY2VT")
}
</script>

<template>
  <div>

    <!-- <div class="anniu">
      <span @click="imageTofile_click()">复制摸鱼日历</span>
      <span @click="open_zhuayuya()">去摸鱼鸭摸鱼</span>
    </div> -->
    <div ref="imageTofile1" class="kuang">
      <div @click="imageTofile_click()" class="nei-kuang">
        <div class="top">

          <div class="top-left">
            <img src="../../assets/image 45.png" alt="">
            <h3>摸鱼哲学：「摸鱼不是放纵，是实力的积蓄」</h3>
          </div>
          
          <h4>公众号：摸鱼鸭</h4>
        </div>

        <div class="rili">
          <div class="riqi">
            <div class="rili-1">
              <h3>{{data.z[0]}} /</h3>
              <h4>周{{data.z[2]}}</h4>
            </div>

            <div class="rili-2">
              <h1>{{data.z[1]}}</h1>
            </div>

            <div class="rili-3"></div>

            <div class="rili-4">
              <h3>摸鱼办</h3>
            </div>
          </div>

          <div class="xiaorili">
            <div class="xiaorili-1">
              距周末
            </div>
            <div class="xiaorili-2">
              <h3>{{julizhoumo()}}</h3>
              <h4>天</h4>
            </div>
          </div>
        </div>

        <div class="hexin">
          <div class="hexin-zuo">
            <div class="hexin-zuo-1">
              <img src="../../assets/Group 323.svg" alt="">
              <h3>{{zhouji()}}</h3>
            </div>
            <div class="hexin-zuo-2">
              <div>历史上的今天</div>
              <h3>{{data.e}}</h3>
            </div>
            <div class="hexin-zuo-3">
              {{suijiwenan('f')}}
            </div>
          </div>

          <div class="hexin-you">
            <img class="hexin-you-1" src="../../assets/Rectangle 1684.svg" alt="">
            <div>
              <h3>距离 【15号发工资】：{{faxin(15)}}天</h3>
              <h3>距离 【25号发工资】：{{faxin(25)}}天</h3>
              <h3>距离 【月底发工资】：{{faxin(benyuetianshu())}}天</h3>
              <h3>距离 【05号发工资】：{{faxin(5)}}天</h3>
              <h3>距离 【10号发工资】：{{faxin(10)}}天</h3>
            </div>
            <img class="hexin-you-2" src="../../assets/Rectangle 1683.svg" alt="">
          </div>
        </div>

        <div class="cihexin">
          <div class="biaoqing">
            <img src="../../assets/image 47.png" alt="">
          </div>
          
          <div class="jiyi">
            <div class="jiyi-kuang">
              <div class="jiyi-">忌</div>
              <div class="liebiao">
                <h3 v-for="(item,index) in data.d">{{item}}</h3>
              </div>
            </div>

            <div class="jiyi-kuang">
              <div class="jiyi-">宜</div>
              <div class="liebiao">
                <h3 v-for="(item,index) in data.c">{{item}}</h3>
              </div>
            </div>
          </div>
        </div>

        <div class="zimi-gognzi">
          <div class="zimi">字谜:{{suijiwenan('i')}}</div>

          <div class="gongzi">{{jieri()}}</div>
        </div>

        <div class="dibu">
          <h3>{{suijiwenan('g')}}</h3>

          <img src="../../assets/Group 324.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .anniu{
    width: 470px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    margin-top: 68px;
    margin-bottom: 20px;
  }
  .anniu span{
    padding-left: 15px;
    padding-right: 15px;
    height: 45px;
    background: #313131;
    color: #fff;
    font-size: 18px;
    line-height: 45px;
    border-radius: 10px;
    cursor: pointer;
  }
  .anniu span:hover{
    background: #151515;
  }
  .anniu span:active{
    background: #4e4e4e;
  }
  .dibu img{
    width: 62px;
    height: 62px;
    margin-right: 12px;
    margin-top: 12px;
  }
  .dibu h3{
    font-size: 18px;
    line-height: 32px;
    margin-left: 15px;
    margin-top: 10px;
    margin-right: 15px;
  }
  .dibu{
    width: 469px;
    height: 87px;
    margin-top: 20px;
    border-radius: 15px;
    margin-left: -2px;
    border: 3px solid #2D2D2D;
    background: #F5F5F5;
    display: flex;
  }
  .zimi{
    width: 280px;
    height: 48px;
    font-size: 15px;
    line-height: 46px;
    color: #fff;
    text-align: left;
    padding-left: 10px;
    border-radius: 12px;
    background: #313131;
  }
  .gongzi{
    width: 180px;
    height: 48px;
    font-size: 16px;
    text-align: center;
    color: #fff;
    border-radius: 12px;
    border: 4px solid #313131;
    box-sizing: border-box;
    background: #FFF;
    color: #313131;
    line-height: 38px;
    margin-left: -12px;
  }
  .zimi-gognzi{
    width: 450px;
    margin: 0 auto;
    margin-top: 22px;
    display: flex;
  }
  .liebiao h3{
    height: 20px;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 12px;
    line-height: 19px;
    border-radius: 6px;
    margin-left: 5px;
    background: #313131;
    color: #fff;
  }
  .liebiao{
    width: 120px;
    margin-left: 5px;
    margin-top: 6px;
    display: flex;
    flex-wrap: wrap;
  }
   .jiyi-{
    width: 36px;
    height: 36px;
    margin-top: 8px;
    margin-left: 6px;
    border-radius: 10px;
    font-size: 20px;
    text-align: center;
    line-height: 35px;
    border: 4px solid #313131;
    background: #FFF;
  }
  .jiyi-kuang{
    width: 180px;
    height: 60px;
    border-radius: 15px;
    border: 4px solid #313131;
    background: #FFF;
    margin-top: 20px;
    display: flex;
    float: right;
    margin-right: 15px;
  }
  .jiyi{
    margin-top: -50px;
  }
  .biaoqing img{
    width: 230px;
    margin-left: 10px;
  }
  .cihexin{
    margin-top:20px;
    display: flex;
  }
.hexin-you h3{
  color: #616161;
  font-size: 16px;
  font-weight: 600;
  margin-top: 26px;
}
.hexin-you div{
    margin-top: -50px;
  }
  .hexin-you-1{
    width: 42px;
    margin-left: -20px;
  }
  .hexin-you-2{
    width: 42px;
    float: right;
    margin-right: -20px;
    margin-top: -20px;
  }
  .hexin-you{
    margin-right: 22px;
    margin-top: 15px;
  }
  .hexin-zuo-3{
    height: 85px;
    margin-top: 25px;
    font-weight: 500;
    font-size: 18px;
    width: 162px;
    line-height: 28px;
  }
  .hexin-zuo-2 h3{
    width: 142px;
    margin: 0 auto;
    margin-top: 5px;
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
  }
  .hexin-zuo-2 div{
    width: 156px;
    height: 36px;
    margin-left: -3px;
    margin-top: -1px;
    background: #313131;
    border-radius: 13px;
    text-align: center;
    color: #FFF;
    line-height: 32px;
    font-size: 18px;
  }
  .hexin-zuo-2{
    width: 150px;
    height: 98px;
    margin-top: 20px;
    border-radius: 15px;
    border: 4px solid #313131;
    background: #FFF;
  }
  .hexin-zuo-1 img{
    width: 50px;
    height: 50px;
  }
  .hexin-zuo-1 h3{
    width: 108px;
    margin-left: 12px;
    line-height: 25px;
    font-size: 18px;
    letter-spacing: 6px;
  }
  .hexin-zuo-1{
    display: flex;
  }
  .hexin{
    width: 450px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content:space-between;
  }
  .xiaorili-2 h4{
    font-size: 12px;
    margin-top: 13px;
  }
  .xiaorili-2 h3{
    font-size: 28px;
    font-weight: 700;
  }
  .xiaorili-2{
    width: 30px;
    display: flex;
    margin: 0 auto;
    margin-top: 3px;
  }
  .xiaorili-1{
    width: 56px;
    height: 28px;
    margin: 0 auto;
    margin-top: 5px;
    font-size: 13px;
    color: #fff;
    text-align: center;
    line-height: 27px;
    border-radius: 20px;
    background: #313131;
  }
  .rili-4{
    width: 180px;
    margin-left: 20px;
    margin-top: 8px;
    line-height: 52px;
    font-size: 50px;
    font-weight: 600;
    letter-spacing: 10px;
  }
  .rili-3{
    width: 8px;
    height: 46px;
    margin-top: 15px;
    margin-left: 20px;
    border-radius: 10px 0px 0px 10px;
    background: #FFF;
  }
  .rili-2 h1{
    font-size: 50px;
    font-weight: 700;
  }
  .rili-2{
    margin-top: 11px;
    margin-left: 2px;
  }
  .rili-1 h4{
    font-size: 14px;
    margin-top: 5px;
  }
  .rili-1 h3{
    width: 42px;
    font-size: 20px;
    font-weight: 700;
  }
  .rili-1{
    width: 38px;
    margin-left: 20px;
    margin-top: 16px;
  }
  .xiaorili{
    width: 75px;
    height: 75px;
    border-radius: 15px;
    margin-right: 13px;  
    border: 4px solid #313131;
    box-sizing: border-box;
    background: #FFF;
  }
  .riqi{
    width: 360px;
    height: 75px;
    display: flex;
    border-radius: 0px 15px 15px 0px;
    background: #313131;
    color: #fff;
  }
  .rili{
    margin-top: 20px;
    display: flex;
    justify-content:space-between;
  }
  .top h4{
    font-size: 14px;
    margin-top: 9px;
    margin-right: 10px;
    color: #767676;
  }
  .top-left h3{
    font-size: 14px;
    margin-top: 9px;
    margin-left: 3px;
    color: #767676;
  }
  .top-left img{
    width: 28px;
    height: 28px;
    margin-top: 2px;
    margin-left: 5px;
  }
  .top-left{
    display: flex;

  }
  .top{
    width: 100%;
    height: 32px;
    border-bottom: 2px solid #424242;
    display: flex;
    justify-content:space-between;
  }
  .nei-kuang{
    width: 472px;
    height: 763px;
    margin: 0 auto;
    margin-top: 10px;
    border-radius: 13px;
    border: 3px solid #424242;
    background: rgba(255, 255, 255, 0.00);
  }
.kuang{
  width: 500px;
  height: 788px;
  /* margin: 0 auto; */
  border-radius: 25px;
  border: 10px solid #757575;
  background: #FFF;
}
</style>