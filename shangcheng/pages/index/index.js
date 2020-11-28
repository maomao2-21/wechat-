import { request } from "../../request/index.js";
Page({
    data: {
        //轮播图数组
        swiperList: [],
        cateList: [],
        floorList: []
    },
    onLoad: function(options) {
        // 发送异步请求获取轮播图数据 优化手段可以通过es6额promise手段解决
        // wx.request({
        //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //     success: (result) => {
        //         this.setData({
        //             swiperList: result.data.message
        //         })
        //     }
        // });
        //     },
        // }
        // request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
        // .then(result=>{
        //     this.setData({
        //     swiperList: result.data.message
        // })

        // })
        this.getSwiperList();
        this.getCateList();
        this.getFloorList();
    },
    getSwiperList() {
        request({ url: "/home/swiperdata" })
            .then(result => {
                this.setData({
                    swiperList: result
                })
            })
    },
    getCateList() {
        request({ url: "/home/catitems" })
            .then(result => {
                this.setData({
                    cateList: result
                })
            })
    },
    getFloorList() {
        request({ url: "/home/floordata" })
            .then(result => {
                this.setData({
                    floorList: result
                })
            })
    }
})