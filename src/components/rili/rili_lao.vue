<script setup>
    import html2canvas from "html2canvas"
    import { ref } from "vue";
    import { message } from 'ant-design-vue';
    const today = new Date();
    function insists(){
        let week = "周"+"天一二三四五六".charAt(new Date().getDay())
    
        if(week == '周一'){
            return '5'
        }
        if(week == '周二'){
            return '4'
        }
        if(week == '周三'){
            return '3'
        }
        if(week == '周四'){
            return '2'
        }
        if(week == '周五'){
            return '1'
        }
    }
    
    
    
    
    //生成图片
    const imageTofile1 = ref(null)
    function imageTofile_click(){
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
          // console.log('成功')
          message.success('摸鱼日历已复制到剪切板', 5);
        })
    }
    
    
    
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
    
    
    
    
    //get年月日
    function getday(){
        let date = new Date(); 
        let year = date.getFullYear(); 
        let month = date.getMonth() + 1;
        month = (month > 9) ? month : ("0" + month);
        let day = date.getDate();
        return year + "年" + month + "月" + day + "日";
    }
    
    //取当前月份
    function yue(e){
        let date = new Date(); 
        console.log(new Date().getDate(),e)
        if(new Date().getDate()<e){
            return  date.getMonth() + 1;
        }else{
            if(date.getMonth() + 2 > 12){
                return 1
            }else{
                return date.getMonth() + 2;
            }
            
        }
    
    }
    
    //距离xx日还剩多少天
    function calculate(e){
        console.log(e)
        var today=new Date();
        var endDay=new Date(e);
        var result=(endDay.getTime()-today.getTime())/1000;//不写getTime(),则调用valueOf
        // var result=(endDay-today)/1000;
        var day=parseInt(result/(24*60*60));
        //var hour=parseInt((result-day*24*60*60)/(60*60));
        //var minite=parseInt((result-day*24*60*60-hour*60*60)/60);
        //var sec=parseInt(result-day*24*60*60-hour*60*60-minite*60);
        // console.log("距离国庆放假还有："+day+"天"+hour+"小时"+minite+"分钟"+sec+"秒")
        return day
    }


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
    
    
    const random_words = [
        '早上好，摸鱼人！不要忘记摸鱼哦！有事没事起身去茶水间，去厕所，去廊道走走，别总在工位上坐着，钱是老板的，但健康是自己的。',
        '小时候老师告诉我“德智体美劳”要全面发展 长大后发现自己只发展了第五个 成了一个打工人',
        '生活里80%的痛苦来源于打工，但是我知道，如果不打工，就会有100%的痛苦来源于没钱。早安，打工人！',
        '没进厂之前我有梦，关于文学，关于爱情，关于穿越世界的旅行。而今我在厂里上着班，零件和零件碰到一起，都是梦破碎的声音。早安打工人！',
        '认认真真上班，这根本不叫赚钱，这是劳动换取报酬;只有偷懒，在上班的时候划水摸鱼，你才从你老板那赚到了钱。',
        '“雇主让我早点去安空调，我说：“能不能晚点安吗？”他说：“不能，打工人就是要早安！”',
        '早晨我把"早安打工人"发给了数位好友，无一人回复。后来我才意识到，打工的只有我一个，他们这些人上人还在睡觉。对不起，是我认真了。',
        '我带上了头盔，就无法吻你；摘下了头灰被交警罚款五十。早安，打工人',
        '不是，你们一个个有事儿就说事儿吧，为什么要打我们工人啊？我们工人做错什么了？',
        '你的朋友圈好久没提及星球、银河、宇宙、梦想、文学了 怎么 是不是跟我一样去打工了？',
        '当我打工的时候，不经意间，红了樱桃，绿了芭蕉。',
        '过安检的时候检测仪一直响，安检让我把所有的东西都掏出来还是一直响，她问我干什么的，我说我打工的，她说好家伙，难怪检测出了钢铁般的意志！早安，打工人！',
        '如果你分手了就去西藏 可以疗伤 如果你单身就去丽江 可以艳遇 如果你喜欢我 就来天城五金厂 可以跟我一起打工 我是三号车间 五百八十吨冲压机操作员 早上好 打工人',
        '最近已经降温了，别人都穿了长袖，我依然是短袖，因为我的打工之魂在熊熊燃烧！',
        '生活里80%的痛苦来源于打工 但是我知道 如果不打工 就会有100%的痛苦来源于没钱 所以在打工和没钱之间 我选择打工',
        '朋友说你打工这么多年，应该没有什么砖是你没搬过的吧？我笑了说，唯有通往成功的敲门砖我永远搬不起来。早安！打工人',
        '人常说“被需要，是一种幸福”，那打工人天天都生活在被工作需要的幸福中！加油，打工人！',
        '世界上有三种光芒最耀眼，一种是阳光，一种是绿光，一种是打工人钢铁意志的反光！早安！打工人！',
        '一定要努力赚钱，今天出门在KFC看到一男一女吃一根薯条，还嘴对嘴抢着吃，千万别活成他们那样，看着都难受！早安，打工人',
        '打，工人，要，赔钱，谁打谁是大猪猪',
        '放假？放什么假？只有对社会没有用处的人才会放假！像我这样的国家栋梁之才，怎么能放假？我就是来为人民服务的。干活！',
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
    ]
    
    
    const kfc_word = [
        '世上77亿人，有253亿只鸡，是人数量三倍。如果鸡与人类开战，你必须要对抗3只鸡，就算它死了，又会有同类补上，就算你一个朋友都没有，你还有三只鸡做敌。今天是肯德基疯狂星期四，V我50，我帮你杀敌',
        '蛮讽刺的，从凌晨开始等到现在，没有一个人和我说生日快乐。我的亲人没有说，朋友也没有说，我最在乎的人也没有说，直到现在我才明白：原来今天不是我生日。今天是肯德基疯狂星期四！',
        '无序的表演来压抑 来释放 是自私 是疯狂 是甜蜜 是幻想 是灵魂 是解放 是控制 是欲望 是意识 是躲藏 是游戏 是死亡 是音乐 是无知 它告诉我 是兄弟 就来KFC疯狂星期四 请我吃',
        '大家好，我是周杰伦，目前我的新专辑整体已经制作完成，很快将会与大家见面。目前有一首关于炸鸡奶茶的歌曲，文山说他在歌词创作上缺少一点想法，今天疯狂星期四，微信转我五十块，歌曲创作署名加上你。',
        '大家好，我是奥特曼，我正在外星和敌人战斗！没有能量了！听说今天肯德基疯狂星期四，我现在需要有人给我带29.9块钱4个的吮指原味鸡补充能量。恢复后我请你来外星做客。',
        '穿过挪威的森林，让我走进你的梦里，夕阳落在我的铠甲，王子不一定骑白马，现在是上午十一点二十七，你不必故作冷淡，我也不想做最后的纠缠。最后问一句，肯德基疯狂星期四，谁请我吃？',
        '疯狂星期四 活力周四激情四射️ ️想不想搞大我的肚子 ️️转我50吃肯德基',
        'bro，别他妈垂头丧气了，知道今天是什么日子吗？今天是肯德基fucking crazy Thursday！香辣热骨鸡20块钱15个，bro，给我200元，我要买185个汉堡，和我的身高一样',
        '我本是显赫世家的少爷，却被诡计多端的管家所害！家人弃我！师门逐我！甚至断我灵脉！重来一生，今天肯德基疯狂星期四！谁请我吃？',
        '肯德基给你们多少钱了，让你们周周给编段子，疯狂星期四真的那么有诱惑力？我偏不信，v我50，我去试试',
        '同事欺我，老板骂我，顾客打我，我流浪在街头，衣衫褴褛，身无分文，活得不如流浪狗。天地浩大，却没有我的容身之处。我想问一问苍天，今天肯德基疯狂星期四，谁请我吃？',
        '你的使命是每周四复制不同的肯德基疯狂星期四文案，直到有一天真的有人请你吃',
        '分手了，最近没有怎么哭了，我现在慢慢变好了吧！以前有多快乐，现在就有多难过。从人间烟火的日常，到红着眼睛告别，消失在彼此的世界里，很痛，也很难。今天是肯德基疯狂星期四，v我60，抚慰我支离破碎的心',
        '今日はKFC狂乱木曜日,支付宝転我30,慰撫我支離滅裂的心',
        '她本是豪门千金，在新婚前夜却发现未婚夫和闺蜜在喜床上翻滚，她深夜买醉却撞上醉酒的他，一夜痴缠他醒来后不见她的踪影，只见床头压着一张纸：今 天 肯 德 基 疯 狂 星 期 四 谁 请 我 吃',
        '你跟你女朋友奔现进房间以后，裤子一脱你女朋友花容失色的质问你:你不是说你有18cm吗?怎么这么小? 你说:因为今天是肯德基疯狂星期四活动满18减15'
    ]
    
    function one_day(){
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        return today.toLocaleDateString();
    }
    
    
    const myrl_loc = JSON.parse(localStorage.getItem('myrl'))
    const words_ = random_words[Math.floor(Math.random() * (random_words.length))]
    const kfc = kfc_word[Math.floor(Math.random()*15+1)]
    
    function random_word(){
        if(myrl_loc == null){
            
           if(new Date().getDay() == 4){
            localStorage.setItem('myrl',JSON.stringify({content:kfc,day:one_day()}))
            return kfc
           }else{
            localStorage.setItem('myrl',JSON.stringify({content:words_,day:one_day()}))
            return words_
           }
            
        }else{
            if(myrl_loc.day == one_day()){
                return myrl_loc.content
            }else{
                if(new Date().getDay() == 4){
                    localStorage.setItem('myrl',JSON.stringify({content:kfc,day:one_day()}))
                    return kfc
                }else{
                    localStorage.setItem('myrl',JSON.stringify({content:words_,day:one_day()}))
                    return words_
                }
            }
        }
    }
    

        //打开摸鱼鸭
    function open_zhuayuya(){
        window.open("https://www.zhuayuya.com")
    }
    </script>
    
    <template>
        <div>

            <!-- <div class="anniu">
                <span @click="imageTofile_click()">复制摸鱼日历</span>
                <span @click="open_zhuayuya()">去摸鱼鸭摸鱼</span>
            </div> -->

                <div ref="imageTofile1" class="m-box">
                    <div @click="imageTofile_click()" class="inside-box">
                        <div class="top-box">
                            <div class="top-left">
                                <img src="../../assets/logo.svg" alt="">
                                <h6>摸鱼鸭（www.zhuayuya.com）</h6>
                            </div>
                            <div class="top-right">
                                <h6>公众号：摸鱼鸭</h6>
                            </div>
                        </div>
                        <div class="title-box">
                            <span>
                                【摸鱼办】提醒您
                                <h3>今天是{{getday()}}，星期{{"周"+"天一二三四五六".charAt(new Date().getDay())}}（距周末还有{{insists()}}天）</h3>
                            </span>
                        </div>
                        <div class="holiday-box">
                            <h4>  
                                
                                距离【元旦】还有：<span>{{calculate('2025-01-02')}}</span> 天<br />
                                距离【除夕】还有：<span>{{calculate('2025-01-29')}}</span> 天<br />
                                距离【清明节】还有：<span>{{calculate('2025-04-06')}}</span> 天<br />
                                距离【劳动节】还有：<span>{{calculate('2025-05-02')}}</span> 天<br />
                            </h4>
                        </div>
                        <div class="wages-box">
                            <img src="../../assets/moyuban.png" alt="">
                            <div class="wages-right">
                                <!-- <h5 style="margin-left: -80px;" v-html="faxin(calculate('2024-'+yue(16)+'-16'),'15号')"></h5>
                                <h5 style="margin-left: 1px;" v-html="faxin(calculate('2024-'+yue(26)+'-26'),'25号')"></h5>
                                <h5 style="margin-left: -20px;" v-html="faxin(calculate('2023-'+yue(31)+'-31'),'月底')"></h5>
                                <h5 style="margin-left: -50px;" v-html="faxin(calculate('2024-'+yue(6)+'-06'),'5号')"></h5>
                                <h5 style="margin-left: -38px;" v-html="faxin(calculate('2024-'+yue(11)+'-11'),'10号')"></h5>
    -->

                                <h5 style="margin-left: -60px;">距离 【15号发工资】：{{faxin(15)}}天</h5>
                                <h5 style="margin-left: 10px;">距离 【25号发工资】：{{faxin(25)}}天</h5>
                                <h5 style="margin-left: -10px;">距离 【月底发工资】：{{faxin(benyuetianshu())}}天</h5>
                                <h5 style="margin-left: -20px;">距离 【05号发工资】：{{faxin(5)}}天</h5>
                                <h5 style="margin-left: -38px;">距离 【10号发工资】：{{faxin(10)}}天</h5>

                            </div>
                        </div>
                        <span style="color: #888888; display: block; margin-left: 18px; font-size: 12px;">插画来自站酷 @肥茜茜</span>
                        <div class="bottom-box">
                            <span>{{random_word()}}</span>
                        </div>
                    </div>
                </div>
            </div>
    </template>
    
    <style scoped>
    .anniu{
      width: 470px;
      display: flex;
      margin: 0 auto;
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

    .top-left{
        margin-left: 12px;
        display: flex;
    }
    .top-box img{
        width: 18px;
        height: 18px;
        margin-top: 7px;
    }
    .top-left h6{
        font-size: 13px;
        color: #767676;
        margin-top: 3px;
        margin-left: 5px;
        font-weight: 400;
        line-height: 26px;
    }
    .top-right h6{
        font-size: 13px;
        color: #767676;
        margin-top: 3px;
        margin-right: 12px;
        font-weight: 400;
        line-height: 28px;
    }
    .top-box{
        width: 475px;
        height: 32px;
        margin-left: -3px;
        margin-top: -3px;
        display: flex;
        border-bottom: 3px solid #424242;
        justify-content: space-between;
    }
    .bottom-box{
        width: 470px;
        height: 70px;
        margin-left: -3px;
        background: #F5F5F5;
        margin-top: 22px;
        border: 3px solid #424242;
        border-radius: 0px 0px 10px 10px;
    }
    .bottom-box span{
        display: block;
        font-size: 18px;
        line-height: 20px;
        width: 455px;
        margin: 0 auto;
        margin-top: 3px;
        color: #353535;
    }
    .wages-box{
        display: flex;
        margin-top: 10px;
    }
    .wages-right{
        margin-top: -8px;
    }
    .wages-box img{
        height: 250px;
        margin-top: 10px;
    }
    .wages-right h5{
        display: inline-block;
        height: 25px;
        padding-left: 5px;
        padding-right: 5px;
        line-height: 25px;
        border: 2px #F0F0F0 solid;
        font-size: 15px;
        margin-top: 30px;
        color: #545454;
    }
    .wages-right span{
        font-weight: 800;
    }
    .holiday-box h4{
        display: block;
        font-size: 18px;
        color: #616161;
        line-height: 45px;
        margin-left: 24px;
        margin-top: 20px;
    }
    .holiday-box span{
        font-weight: 800;
    }
    .title-box h3{
        font-size: 16px;
        margin-left: 26px;
        color: #fff;
        line-height: 26px;
    }
    .title-box span{
        display: block;
        width: 428px;
        height: 118px;
        margin-top: 12px;
        line-height: 82px;
        color: #fff;
        background: #313131;
        font-size: 50px;
        font-weight: 800;
    }
    .inside-box{
        width: 470px;
        height: 763px;
        margin: 0 auto;
        margin-top: 10px;
        border-radius: 12px;
        border: 3px solid #424242;
        background: rgba(255, 255, 255, 0.00);
    }
    .m-box{
        width: 500px;
        height: 788px;
        border-radius: 25px;
        border: 10px solid #757575;
        background: #FFF;
    }
    </style>