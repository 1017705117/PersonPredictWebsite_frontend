<template>
<div class="test_two_box">
  <div>
    <video id="myVideo" class="video-js" controls data-setup="{}" width="800" height="600">
      <source
        :src="videoSrc"
        type="video/mp4"
      >
    </video>
  </div>
  <br>
  <div class="mt-3">
    <el-upload action="" :before-upload="changeVideo" accept="mp4">
      <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </el-upload>
    <Layout>
      <br>
      <el-button align="center">刷新</el-button>
      <el-row :gutter="20">
        <el-col :span="15" :offset="5" ><el-table
          :data="data1"
          style="width: 100%"
          align="center">
          <el-table-column
            prop="video_path"
            label="路径"
            width="180">
          </el-table-column>
          <el-table-column
            prop="distance"
            label="视频ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="dic"
            label="行人ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="speed"
            label="是否偏转">
          </el-table-column>
        </el-table>
        </el-col>
      </el-row>
    </Layout>

  </div>

</div>
</template>

<script>
import GLOBAL from '../api/global.js'
import {getVideo,postVideo} from '../api/api.js'
import {getIllegalData} from '../api/api.js'
 // const data1  = [{
 //   date: '2016-05-02',
 //   name: '王小虎',
 //  address: '上海市普陀区金沙江路 1518 弄'
 // },];
const data1 = [100];
/* eslint-disable */
export default {
data() {
    return {
        // videoSrc:require("../assets/1.mp4"),
        // videoSrc1:require("../assets/video_result1.mp4"),
        videoSrc:'',
        fileName:'',
        data1: data1,
        };
},
mounted() {
    this.initVideo();
},
// created: function () {
//     this.loadVideo("1.mp4")
// },
methods: {
    download(){
        getVideo().then(response =>{
            // GLOBAL.videoId = Object.entries(response.data[0])[2][1]
            GLOBAL.videoId = 1
            console.log(GLOBAL.videoId)
            let path = Object.entries(response.data)
            // let path = "1.mp4"
            console.log(path[0][0])
            console.log(path[0][1])
        })
    },
    limit(){
        postVideo(this.fileName,this.speed).then(response =>{
            // console.log(response)
        })
        this.$nextTick(() => {
            setInterval(this.loadVideo(), 5000);
        })
    },
    loadVideo(){
        getVideo(this.fileName,this.speed).then(response =>{
            // GLOBAL.videoId = Object.entries(response.data[0])[2][1]
            GLOBAL.videoId = 1
            console.log(GLOBAL.videoId)
            // let path = Object.entries(response.data[0])[0][1]
            // let path = "1.mp4"
            this.data1=response.data;
            console.log(response.data);
            this.videoSrc = require('../assets/'+response.data[0].video_path)
            var player = this.$video('myVideo')
            player.src({
              src:this.videoSrc
            })
            // this.data1 = response.data
        })
    },
    changeVideo(file){
        // postVideo(file.name).then(response =>{
        // })
        // console.log("name"+file.name)
        // this.loadVideo(file.name);
        this.fileName = file.name
        this.limit()
        this.loaddata()
    },
    initVideo() {
        //初始化视频方法
        this.myPlayer = this.$video(myVideo, {
            //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
            controls: true,
            //自动播放属性,muted:静音播放
            // autoplay: "muted",
            autoplay: "false",
            //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
            preload: "auto",
            //设置视频播放器的显示宽度（以像素为单位）
            width: "960px",
            //设置视频播放器的显示高度（以像素为单位）
            height: "640px",
            //可选择的播放速度
            playbackRates : [ 0.5, 1.0, 1.5, 2.0 ],
            notSupportedMessage : '请上传视频'
        });
    },
    idJudge(){
    if(this.temp!=GLOBAL.videoId){
      this.loaddata()
      this.temp = GLOBAL.videoId
      // console.log(this.temp)
    }else{
      this.temp = GLOBAL.videoId
    }
    },
    loaddata(){
    getIllegalData(this.plate,GLOBAL.videoId,this.date,this.illegalMassage).then(response =>{
      this.data1 = response.data
      // console.log(GLOBAL.videoId)
      // console.log(this.date)
    })
    },
    search(){
    this.loaddata()
    },
    delete(index){
    alert("delete:"+index)
    this.data1.splice(index,1)
    },
    show(){
    alert("show")
    },
    getDate(date){
    this.date=date
    //alert(this.date)
    this.loaddata()
    // console.log(this.date)
    },
    getIllegal(){
    // alert(this.illegalMassage)
    this.loaddata()
    },
    clear(){
    this.date = ''
    this.plate = ''
    this.illegalMassage = ''
    this.loaddata()
    }
}};
</script>

<style scoped>
</style>
