<script setup>
import { ref, reactive } from "vue";
import html2canvas from 'html2canvas';
import axios from 'axios'
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import { message } from 'ant-design-vue';
import { useMainStore } from '../../store/index'
const stores = useMainStore()


const today = new Date();
const data = reactive({
    qrcode: '',
    a: [
        { content: '周一周一天打雷劈', img: '' },
        { content: '周二摆烂啥也不干', img: '' },
        { content: '周三摸鱼干活多余', img: '' },
        { content: '周四躺平量力而行', img: '' },
        { content: '周五周五敲锣打鼓', img: '' },
        { content: '周六加班作恶多端', img: '' },
        { content: '周日周日死期将至', img: '' }
    ],
    b: [
        { name: '元旦', date: '2025-01-01' },
        { name: '春节', date: '2025-01-29' },
        { name: '清明', date: '2024-04-04' },
        { name: '劳动', date: '2024-05-01' },
        { name: '端午', date: '2024-06-10' },
        { name: '中秋', date: '2024-09-17' },
        { name: '国庆', date: '2024-10-01' }
    ],
    c: [],
    d: [],
    e: '',
    z: ['3', '05', '三', 0],
    f: [
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
    g: [
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
    h: [
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
    i: [
        { Riddle: '什么东西别人请你吃,但你自己还是要付钱', answer: '吃官司' },
        { Riddle: '如果诸葛亮活着,世界现在会有什么不同', answer: '会多一个人' },
        { Riddle: '一只十分饥饿的猫,看见一只老鼠后为什么立刻跑了', answer: '去追老鼠了' },
        { Riddle: '印度人为什么用手抓饭吃', answer: '因为手比脚干净' },
        { Riddle: '陈老太太得的并不是绝症,为什么医生却说她无药可救', answer: '她没钱买药' },
        { Riddle: '跳伞时,怎样才能分的出老兵和新兵', answer: '新兵的屁股上有鞋印' },
        { Riddle: '什么鞋子,你绝不会穿着它去逛街', answer: '溜冰鞋' },
        { Riddle: '一年四季都盛开的花是什么花', answer: '塑料花' },
        { Riddle: '你知道什么东西天气越热,它爬得越高', answer: '温度计' },
        { Riddle: '什么饼不能吃', answer: '铁饼' },
        { Riddle: '什么数字减去一半等于零', answer: '0' },
        { Riddle: '个人吃8份快餐需10分钟,16个人吃16份快餐需几分钟', answer: '还是10分钟' },
        { Riddle: '什么东西制造期和有效日期是同一天的', answer: '日报' },
        { Riddle: '块糖分给10个小朋友,数目不同,不可把糖块截断,能不能分', answer: '“1+2+3.....+10”=55' },
        { Riddle: '当你向别人夸耀你的长处的同时,别人还会知道你的什么', answer: '知道你不是个哑巴' },
        { Riddle: '打狗要看主人,打虎要看什么', answer: '要看你有没有病' },
        { Riddle: 'Dongdong养的鸽子在mingming家下了一个蛋,请问这个蛋应属于谁的', answer: '鸽子的' },
        { Riddle: '什么门永远关不上', answer: '球门' },
        { Riddle: '哪项比赛是比谁往后跑得快的', answer: '拔河' },
        { Riddle: '笨拙者的敏捷,用一个什么样的词形容比较恰当', answer: '仓促' },
        { Riddle: '芳芳在学校门口将学生证掉了,它该怎么办', answer: '捡起来' },
        { Riddle: '什么桥下没水答案', answer: '立交桥' },
        { Riddle: '什么样的强者千万别当答案', answer: '强盗' },
        { Riddle: '一位司机上了他驾驶的汽车后,做的第一个动作是什么', answer: '第一个动作是坐下' },
        { Riddle: '小明画了好大一个圆,你知道画圆时是从什么地方开始的吗', answer: '从笔尖开始' },
    ],

    miyu: {
        Riddle: '',
        answer: '',
        url: ''
    },

    gongzi: [ // 任意时间距离发工资
        0,
        1,
        2,
        3,
        4,
        5,
    ],

    jiaqi: [ // 任意时间距离假期
        {
            "name": "春节",
            "daysUntil": 34
        },
        {
            "name": "清明节",
            "daysUntil": 93
        },
        {
            "name": "劳动节",
            "daysUntil": 119
        },
        {
            "name": "端午节",
            "daysUntil": 155
        },
        {
            "name": "中秋节",
            "daysUntil": 256
        },
        {
            "name": "国庆节",
            "daysUntil": 270
        },
        {
            "name": "元旦",
            "daysUntil": 364
        },
        {
            "name": "春节",
            "daysUntil": 399
        },
        {
            "name": "清明节",
            "daysUntil": 458
        },
        {
            "name": "劳动节",
            "daysUntil": 484
        },
        {
            "name": "端午节",
            "daysUntil": 520
        }
    ]
})


//随机文案
function suijiwenan(e) {
    if (e == "f") {
        return data.f[Math.floor(Math.random() * (data.f.length))]
    }

    if (e == "g") {
        let saying_data = data.g[Math.floor(Math.random() * (data.g.length))]
        stores.saying = saying_data
        return saying_data
    }

    if (e == "i") {
        let Riddle_data = data.i[Math.floor(Math.random() * (data.i.length))]
        data.miyu.Riddle = Riddle_data.Riddle
        stores.decrypt = { // 解密
            text: Riddle_data.Riddle,
            answer:Riddle_data.answer
        },
        data.miyu.url = 'https://rili.zhuayuya.com?Riddle=' + Riddle_data.Riddle + '&answer=' + Riddle_data.answer
    }
}
suijiwenan('i')

//图片给qrcode组件
function test(dataUrl, id) {
    // console.log(dataUrl)
    data.qrcode = dataUrl
}


// 新功能-------------------------------------------------------------------------------


//生成图片
const imageTofile1 = ref(null)
function imageTofile_click() {
    // console.log('请等待')
    message.warning('复制中请勿离开本页面', 5);
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
        //   set_img(url)
        // console.log('成功')
        message.success('摸鱼日历已复制到剪切板', 5);
    })
}

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


//请求历史上的今天
function get_http_lishi() {
    axios.get('https://api.leafone.cn/api/lishi')
        .then(function (response) {
            // 处理成功情况
            // console.log(response.data.data.info[0].title);
            data.e = response.data.data.list[0].title
            stores.historyToday = data.e
            localStorage.setItem(
                'lishi', JSON.stringify({ content: response.data.data.list[0].title, date: today.toISOString().split('T')[0] })
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


//历史上的今天
function lishi() {
    let get_lishi = localStorage.getItem('lishi')
    if (get_lishi != null) {
        if (JSON.parse(get_lishi).date == today.toISOString().split('T')[0]) {
            data.e = JSON.parse(get_lishi).content
            stores.historyToday = data.e
        } else {
            get_http_lishi()
        }
    } else {
        get_http_lishi()
    }
}


// 计算任意日期是周几
function getDayOfWeek(date) {
    
    const daysOfWeek = ['天','一', '二', '三', '四', '五', '六' ];
    const day = new Date(date).getDay();
    return daysOfWeek[day];
}

// 计算任意日期距离周末还有多少天
function getDaysUntilWeekend(date) {
    const daysOfWeek = ['天', '一', '二', '三', '四', '五', '六'];
    const day = new Date(date).getDay();
    const daysUntilWeekend = 4 - day + 1;
    return daysUntilWeekend;
}

// 计算距离指定日期还有多少天, 计算发工资用
function getDaysUntilDate(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    // 如果是负数计算距离下一个月的
    if (daysDifference < 0) {
        const firstDayOfNextMonth = new Date(start.getFullYear(), start.getMonth() + 1, 1);
        const daysInMonth = Math.floor((firstDayOfNextMonth - start) / (1000 * 60 * 60 * 24));
        return daysInMonth + daysDifference;
    }
    return daysDifference;
}

// 传入任意时间，计算距离以下假期分别还有多少天，排除掉已经过去的假期
function getDaysUntilHoliday(date) {
    const holidays = [
        { name: '元旦', date: '2025-01-01' },
        { name: '春节', date: '2025-02-05' },
        { name: '清明节', date: '2025-04-05' },
        { name: '劳动节', date: '2025-05-01' },
        { name: '端午节', date: '2025-06-06' },
        { name: '中秋节', date: '2025-09-15' },
        { name: '国庆节', date: '2025-09-29' },
        { name: '元旦', date: '2026-01-01' },
        { name: '春节', date: '2026-02-05' },
        { name: '清明节', date: '2026-04-05' },
        { name: '劳动节', date: '2026-05-01' },
        { name: '端午节', date: '2026-06-06' }
    ];

    const currentDate = new Date(date);
    const daysUntilHolidays = [];

    holidays.forEach(holiday => {
        const holidayDateObj = new Date(holiday.date);
        const daysUntilHoliday = Math.ceil((holidayDateObj - currentDate) / (1000 * 60 * 60 * 24));

        if (daysUntilHoliday > 0) { // 排除已经过去的假期
            daysUntilHolidays.push({ name: holiday.name, daysUntil: daysUntilHoliday });
        }
    });

    return daysUntilHolidays;
}

//周几文案
function zhouji() {
    if (today.getDay() == 0) {
        return data.a[6].content
    } else {
        return data.a[today.getDay() - 1].content
    }
}

// 初始化日历 计算渲染
function jisuan() {
    // 获取路由参数  http://localhost:5173/?date=2025-01-10
    let path = window.location.search
    let pathDate = path.split('=')[1]

    // 如果
    if (pathDate == undefined) {
        // 获取今天日期
        let year = today.getFullYear()
        let month = today.getMonth() + 1
        let day = today.getDate()
        pathDate = `${year}-${month}-${day}`
    }

    data.z[0] = new Date(pathDate).getMonth() + 1  // 今天是几月
    data.z[1] = new Date(pathDate).getDate()  // 今天是几日

    data.z[2] = getDayOfWeek(pathDate)  // 计算今天是周几

    stores.today.day = pathDate  // 今天是几年几月几日
    stores.today.week = data.z[2]  // 今天是周几
    data.z[3] = getDaysUntilWeekend(pathDate)  // 计算距离周末还有多少天

    // 距离发工资
    let month = new Date(pathDate).getMonth() + 1  // 计算当前传入的日期是几月
    let day = new Date(new Date(pathDate).getFullYear(), new Date(pathDate).getMonth() + 1, 0).getDate()  // 计算当前传入的日期有多少天
    data.gongzi = [
        getDaysUntilDate(pathDate, `2024-${month}-15`),
        getDaysUntilDate(pathDate, `2024-${month}-25`),
        getDaysUntilDate(pathDate, `2024-${month}-${day}`),
        getDaysUntilDate(pathDate, `2024-${month + 1}-05`),
        getDaysUntilDate(pathDate, `2024-${month + 1}-10`),
    ]

    data.jiaqi = getDaysUntilHoliday(pathDate)  // 距离假期

    lishi()  // 历史上的今天
}
jisuan()



</script>

<template>
    <div>


        <!-- <div class="anniu">
          <span @click="imageTofile_click()">复制摸鱼日历</span>
          <span @click="open_zhuayuya()">去抓鱼鸭摸鱼</span>
        </div> -->
        <div ref="imageTofile1" class="kuang">
            <div @click="imageTofile_click()" class="nei-kuang">
                <div class="top">

                    <div class="top-left">
                        <img src="../../assets/moyu-emoji.png" alt="">
                        <h3>摸鱼哲学：「摸鱼不是放纵，是实力的积蓄」</h3>
                    </div>

                    <h4>公众号：抓鱼鸭</h4>
                </div>

                <div class="rili">
                    <div class="riqi">
                        <div class="rili-1">
                            <h3>{{ data.z[0] }} /</h3>
                            <h4>周{{ data.z[2] }}</h4>
                        </div>

                        <div class="rili-2">
                            <h1>{{ data.z[1] }}</h1>
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
                        <div v-if="data.z[3] > 0" class="xiaorili-2">
                            <h3>{{ data.z[3] }}</h3>
                            <h4>天</h4>
                        </div>

                        <div v-else class="xiaorili-2">
                            <p style="font-size: 14px; letter-spacing: 1px;">就是今天</p>
                        </div>
                    </div>
                </div>

                <div class="hexin">
                    <div class="hexin-zuo">
                        <div class="hexin-zuo-1">
                            <img src="../../assets/liekai.svg" alt="">
                            <h3>{{ zhouji() }}</h3>
                        </div>
                        <div class="hexin-zuo-2">
                            <div>历史上的今天</div>
                            <h3>{{ data.e }}</h3>
                        </div>
                        <div class="hexin-zuo-3">
                            {{ suijiwenan('f') }}
                        </div>
                    </div>

                    <div class="hexin-you">
                        <img class="hexin-you-1" src="../../assets/Rectangle 1684.svg" alt="">
                        <div>
                            <h3>距离 【15号发工资】：{{ data.gongzi[0] }}天</h3>
                            <h3>距离 【25号发工资】：{{ data.gongzi[1] }}天</h3>
                            <h3>距离 【月底发工资】：{{ data.gongzi[2] }}天</h3>
                            <h3>距离 【05号发工资】：{{ data.gongzi[3] }}天</h3>
                            <h3>距离 【10号发工资】：{{ data.gongzi[4] }}天</h3>
                        </div>
                        <img class="hexin-you-2" src="../../assets/Rectangle 1683.svg" alt="">
                    </div>
                </div>

                <div class="cihexin">
                    <div class="biaoqing">
                        <img src="../../assets/tangping.png" alt="">
                    </div>


                    <div class="jiaqi">
                        <span class="jiaqi-item">{{ `距离「${data.jiaqi[0].name}」 ${data.jiaqi[0].daysUntil}` }} 天</span>
                        <span style="margin-left: 30px;" class="jiaqi-item">{{ `距离「${data.jiaqi[1].name}」
                            ${data.jiaqi[1].daysUntil}`}} 天</span>
                        <span style="margin-left: 56px;" class="jiaqi-item">{{ `距离「${data.jiaqi[2].name}」
                            ${data.jiaqi[2].daysUntil}`}} 天</span>
                        <span style="margin-left: 10px;" class="jiaqi-item">{{ `距离「${data.jiaqi[3].name}」
                            ${data.jiaqi[3].daysUntil}`}} 天</span>
                    </div>

                </div>

                <div class="zimi-gognzi">
                    <div class="zimi">
                        <h3>{{ data.miyu.Riddle }}</h3>
                    </div>

                    <div class="gongzi">微信扫码看答案</div>
                </div>

                <div class="dibu">
                    <h3>{{ suijiwenan('g') }}</h3>

                    <img :src="data.qrcode" alt="">
                    <div v-show="false">
                        <vue-qr :callback="test" :text="data.miyu.url" :size="280"></vue-qr>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.jiaqi-item {
    display: inline-block;
    padding-left: 8px;
    padding-right: 8px;
    height: 36px;
    line-height: 28px;
    color: #232323;
    font-weight: 600;
    text-align: center;
    font-size: 14px;
    border: 4px solid #313131;
    box-sizing: border-box;
    border-radius: 5px;
    margin-top: 15px;
}

.jiaqi {
    margin-top: -68px;
}

.anniu {
    width: 470px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    margin-top: 68px;
    margin-bottom: 20px;
}

.anniu span {
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

.anniu span:hover {
    background: #151515;
}

.anniu span:active {
    background: #4e4e4e;
}

.dibu img {
    width: 62px;
    height: 62px;
    margin-right: 12px;
    margin-top: 12px;
    border: 3.5px solid #2D2D2D;
    box-sizing: border-box;
    border-radius: 10px;

}

.dibu h3 {
    font-size: 18px;
    line-height: 32px;
    margin-left: 15px;
    margin-top: 10px;
    margin-right: 15px;
}

.dibu {
    width: 473px;
    height: 87px;
    margin-top: 20px;
    border-radius: 15px;
    margin-left: -2px;
    border: 3px solid #2D2D2D;
    background: #F5F5F5;
    display: flex;
}

.zimi h3 {
    width: 310px;
}

.zimi {
    width: 330px;
    height: 48px;
    font-size: 13px;
    line-height: 20px;
    color: #fff;
    text-align: left;
    padding-left: 10px;
    border-radius: 12px;
    background: #313131;
    display: flex;
    align-items: center;
}

.gongzi {
    width: 130px;
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

.zimi-gognzi {
    width: 450px;
    margin: 0 auto;
    margin-top: 14px;
    display: flex;
}

.biaoqing img {
    width: 230px;
    margin-left: 10px;
}

.cihexin {
    margin-top: 20px;
    display: flex;
}

.hexin-you h3 {
    color: #616161;
    font-size: 16px;
    font-weight: 600;
    margin-top: 26px;
}

.hexin-you div {
    margin-top: -50px;
}

.hexin-you-1 {
    width: 42px;
    margin-left: -20px;
}

.hexin-you-2 {
    width: 42px;
    float: right;
    margin-right: -20px;
    margin-top: -20px;
}

.hexin-you {
    margin-right: 22px;
    margin-top: 15px;
}

.hexin-zuo-3 {
    height: 85px;
    margin-top: 25px;
    font-weight: 500;
    font-size: 18px;
    width: 162px;
    line-height: 28px;
}

.hexin-zuo-2 h3 {
    width: 142px;
    margin: 0 auto;
    margin-top: 5px;
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
}

.hexin-zuo-2 div {
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

.hexin-zuo-2 {
    width: 150px;
    min-height: 98px;
    margin-top: 20px;
    border-radius: 15px;
    border: 4px solid #313131;
    background: #FFF;
}

.hexin-zuo-1 img {
    width: 50px;
    height: 50px;
}

.hexin-zuo-1 h3 {
    width: 108px;
    margin-left: 12px;
    line-height: 25px;
    font-size: 18px;
    letter-spacing: 6px;
}

.hexin-zuo-1 {
    display: flex;
}

.hexin {
    width: 450px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}

.xiaorili-2 h4 {
    font-size: 12px;
    margin-top: 13px;
}

.xiaorili-2 h3 {
    font-size: 28px;
    font-weight: 700;
}

.xiaorili-2 {
    width: 30px;
    display: flex;
    margin: 0 auto;
    margin-top: 3px;
}

.xiaorili-1 {
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

.rili-4 {
    width: 180px;
    margin-left: 20px;
    margin-top: 8px;
    line-height: 52px;
    font-size: 50px;
    font-weight: 600;
    letter-spacing: 10px;
}

.rili-3 {
    width: 8px;
    height: 46px;
    margin-top: 15px;
    margin-left: 20px;
    border-radius: 10px 0px 0px 10px;
    background: #FFF;
}

.rili-2 h1 {
    font-size: 50px;
    font-weight: 700;
}

.rili-2 {
    margin-top: 11px;
    margin-left: 2px;
}

.rili-1 h4 {
    font-size: 14px;
    margin-top: 5px;
}

.rili-1 h3 {
    width: 42px;
    font-size: 20px;
    font-weight: 700;
}

.rili-1 {
    width: 38px;
    margin-left: 20px;
    margin-top: 16px;
}

.xiaorili {
    width: 75px;
    height: 75px;
    border-radius: 15px;
    margin-right: 13px;
    border: 4px solid #313131;
    box-sizing: border-box;
    background: #FFF;
}

.riqi {
    width: 360px;
    height: 75px;
    display: flex;
    border-radius: 0px 15px 15px 0px;
    background: #313131;
    color: #fff;
}

.rili {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}

.top h4 {
    font-size: 14px;
    margin-top: 9px;
    margin-right: 10px;
    color: #767676;
}

.top-left h3 {
    font-size: 14px;
    margin-top: 9px;
    margin-left: 3px;
    color: #767676;
}

.top-left img {
    width: 28px;
    height: 28px;
    margin-top: 2px;
    margin-left: 5px;
}

.top-left {
    display: flex;

}

.top {
    width: 100%;
    height: 32px;
    border-bottom: 2px solid #424242;
    display: flex;
    justify-content: space-between;
}

.nei-kuang {
    width: 472px;
    height: 763px;
    margin: 0 auto;
    margin-top: 10px;
    border-radius: 13px;
    border: 3px solid #424242;
    background: rgba(255, 255, 255, 0.00);
}

.kuang {
    width: 500px;
    height: 788px;
    margin: 0 auto;
    border-radius: 25px;
    border: 10px solid #757575;
    background: #FFF;
}
</style>