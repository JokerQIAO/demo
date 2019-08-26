<template>
  <div>
    <Row>
      <Col span="6">申报类型
      <Select v-model="objtyp" :disabled='show_objtyp' style="width:160px;margin-left:30px;" > 
          <Option v-for="item in code_objtyp" :value="item.value" :key="item.value" >{{ item.label }}
        </Option>  </Select>
      </Col>
      <Col span="6">检核状态<Select v-model="sndflg"  style="width:160px;margin-left:31px;" > 
          <Option v-for="item in code_sndflg" :value="item.value" :key="item.value" >{{ item.label }}
        </Option>  </Select></Col>

      <Col span="8">起止时间 
            <DatePicker v-model="beg_time" type="date" placeholder="Select date" style="width: 120px;margin-left:42px;"></DatePicker>
            <DatePicker v-model="end_time" type="date" placement="bottom-end" placeholder="Select date" style=";margin-left:20px;width: 120px"></DatePicker>
      </Col>
      <Col span="4"></Col>
    </Row>
    <br>
    <Row>
      <Col span="6">基础信息状态<Select v-model="bassta" style="width:160px;margin-left:5px;" > 
          <Option v-for="item in code_bassta" :value="item.value" :key="item.value" >{{ item.label }}
        </Option>  </Select></Col>
      <Col span="6">申报信息状态<Select v-model="dclsta" style="width:160px;margin-left:4px;" > 
          <Option v-for="item in code_dclsta" :value="item.value" :key="item.value" >{{ item.label }}
        </Option>  </Select></Col>
      <Col span="6">管理信息状态<Select v-model="vrfsta" style="width:160px;margin-left:18px;" > 
          <Option v-for="item in code_dclsta" :value="item.value" :key="item.value" >{{ item.label }}
        </Option>  </Select></Col>
      <Col span="4" offset="2"><Button type="primary" @click="search">查询</Button></Col>
    </Row>
    <br>
    <Row>
      <Col span="6">申报号码<Input v-model="rptno" @on-keyup="checkRptno" placeholder="Enter something..." style="width: 160px;margin-left:31px;" /></Col>
      <Col span="6">业务号码<Input v-model="extinf" @on-keyup="checkExtinf"  placeholder="Enter something..." style="width: 160px;margin-left:30px;" /></Col>
      <Col span="6">金融机构标识码<Input v-model="decnum" @on-keyup="checkDecnum" placeholder="Enter something..." style="width: 160px;margin-left:5px;" /></Col>
      <Col span="4" offset="2"><Button type="primary" @click="reset">重置</Button></Col>
    </Row>
    <br>
  </div>

</template>


<script>
export default {
    props:{
        show_objtyp:{
            type:Boolean,
            default:false
        },
        query_objtyp:{
            type:String,
            default:''
        }
    },
    data(){
        return {
            code_objtyp:[{
                label:'ALL',
                value:"all"
            },{
                label:'涉外收入申报单',
                value:'dba'
            },{
                label:'境外汇款申请书',
                value:'dbb'
            },{
                label:'对外付款承兑通知书',
                value:'dbc'
            },{
                label:'境内收入申报单',
                value:'dbd'
            },{
                label:'境内汇款申请书',
                value:'dbe'
            },{
                label:'境内付款承兑通知书',
                value:'dbf'
            }],
            code_sndflg:[{
                label:'待确认',
                value:'W'
            },{
                label:'已确认',
                value:'C'
            },{
                label:'丢弃',
                value:'G'
            }],
            code_bassta:[{
                label:'已确认',
                value:'C'
            },{
                label:'待发送',
                value:'W'
            },{
                label:'已生成等待反馈',
                value:'X'
            },{
                label:'反馈成功',
                value:'F'
            },{
                label:'反馈失败',
                value:'E'
            },{
                label:'丢弃',
                value:'G'
            }],
            code_dclsta:[{
                label:'ALL',
                value:''
            },{
                label:'待发送',
                value:'W'
            },{
                label:'已生成等待反馈',
                value:'X'
            },{
                label:'反馈成功',
                value:'F'
            },{
                label:'反馈失败',
                value:'E'
            },{
                label:'丢弃',
                value:'G'
            },{
                label:'无',
                value:'N'
            }],
            objtyp:'',
            sndflg:'',
            beg_time:null,
            end_time:null,
            bassta:'',
            dclsta:'',
            vrfsta:'',
            rptno:'',
            extinf:'',
            decnum:''
        }
    },
    watch:{
        query_objtyp(newVlue, oldValue){
            this.objtyp = newVlue;
            this.search();
        }
    },
    methods:{
        checkRptno:function(){
            //非单词字符,i不区分大小写，g全局
            this.rptno = this.rptno.replace(/[^\w]/ig,'');
        },
        checkExtinf:function(){
            //非单词字符,i不区分大小写，g全局
            this.extinf = this.extinf.replace(/[^\w]/ig,'');
        },
        checkDecnum:function(){
            //非单词字符,i不区分大小写，g全局
            this.decnum = this.decnum.replace(/[^\w]/ig,'');
        },
        search:function(){
            //参数都要传递，后台判断是否作为查询条件，不然后台不知参数个数
            this.$emit('search',[this.objtyp, this.sndflg,this.beg_time,this.end_time,this.bassta,this.dclsta,this.vrfsta,this.rptno,this.extinf,this.decnum ])
        },
        reset:function(){
           this.objtyp = '';
           this.sndflg = '';
           this.beg_time = null;
           this.end_time = null;
           this.bassta = '';
           this.dclsta = '';
           this.vrfsta = '';
           this.rptno = '';
           this.extinf = '';
           this.decnum = '';
        }
    }
}
</script>
<style scoped>
    div {
        font-size: 14px;
        line-height: 12px;
        /**
            <br> 高度为父级行高 
        **/
    }
</style>
