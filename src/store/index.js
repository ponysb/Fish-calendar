import { defineStore } from "pinia";
import axios from "axios";
export const useMainStore = defineStore('main', {
    state: () => {
        return {
            decrypt:{ // 解密
                text:'',
                answer:''
            },
            saying:'', // 打工人语录
            historyToday:'', // 历史上的今天

            today: {  // 今天日期
                day: '',  // 日期
                week: '',  // 星期
            },

            // 今天访问人数
            todayVisitors: 0,
        }
    },
    getters: {},
    actions: {
        // 获取今天访问人数
        async getDecrypt() {
            const res = await axios.get('https://root.zhuayuya.com:8325/today_visitor');
            console.log(res.data.count);
            this.todayVisitors = res.data.count + 1;
        },

        // 日历提交
        async submitCalendar() {
            const res = await axios.get('https://root.zhuayuya.com:8325/log');
            console.log(res.data);
        }
    }
})