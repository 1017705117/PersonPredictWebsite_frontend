<template>
        <Layout>
            <br>
          <el-button align="center">刷新</el-button>
          <el-row :gutter="20">
            <el-col :span="15" :offset="5" ><el-table
              :data="data1"
              style="width: 100%"
              align="center">
              <el-table-column
                prop="date"
                label="视频ID"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="行人ID"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="是否偏转">
              </el-table-column>
            </el-table>
            </el-col>
          </el-row>
        </Layout>

</template>
<script>
import GLOBAL from '../api/global.js'
// console.log("id"+ GLOBAL.videoId)
import {getIllegalData} from '../api/api.js'
    const data1  = [{
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    },];
    export default {
        methods:{
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
                // ! 测试参数传递的函数，正式使用前删除
                getData(mydata){
                    // console.log(mydata)
                    this.loaddata()

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
        },
        created: function () {
            this.loaddata()
        },
        mounted() {
                this.$nextTick(() => {
                    setInterval(this.idJudge, 500);
                })
        },
        data () {
            return {
                temp:'',
                date:'', // *  日期数据
                plate:'',  // * 搜索输入框数据
                illegalMassage: '', // * 违规行为
                columns1: [
                    {
                        title: '视频ID',
                        key: 'videoId'
                    },
                    {
                        title: '行人ID',
                        key: 'plate'
                    },
                    {
                        title: '是否偏转',
                        key:''
                    }
                ],
                data1: data1,
            }
        }
    }
</script>
