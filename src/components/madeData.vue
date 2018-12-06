<template>
  <div class="made">
    <h3>数据制造</h3>
    <!-- <button @click="httpsAixos">click</button> -->
    <div class="upImg">
      <div>
        修改token
        <textarea  cols="40" rows="6" v-model="token"></textarea>
      </div>
      <input class="getfile" type="file" ref="mocover" @change="getFile">
      <img v-show="picUrl" :src="picUrl" alt="上传返回的图片地址">
      <textarea id="contents" cols="40" rows="3" v-model="picUrl"></textarea><br>
      <button @click="copyUrl">复制</button>
      <span v-show="tag">复制成功</span>
    </div>
    <div class="sel">
      <button @click="handUpload" :class="isshop ? 'resbut' : ''">上传店铺</button>
      <button @click="handUpload" :class="isshop ? '' : 'resbut'">上传商品</button>
    </div>
    <div class="shopcont" v-if="isshop">
      <ul>
        <li v-for="(item,key) in param" v-key="key">
          {{key}}:
          <textarea id="contents" cols="30" rows="2" v-model="param[key]"></textarea>
        </li>
      </ul>
      <button @click="over">输入完成提交</button>
    </div>
    <div class="shopcont" v-if="!isshop">
      <ul>
        <li v-for="(item,key) in param" v-key="key">
          {{key}}:
          <textarea id="contents" cols="30" rows="2" v-model="param[key]"></textarea>
        </li>
      </ul>
      <button @click="overdish">输入完成提交</button>
    </div>
  </div>
</template>
<script>
import qs from 'qs';
export default {
  name: "made",
  data() {
    return {
      token:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NDQ2ODY3NDYsImNyZWF0ZWQiOjE1NDQwODE5NDY5MDgsInN1YiI6IjEzMjk3OTMyOTgyIn0.r6joWLitjajsM618_gv7pTDoQP1jmeXZvp9Sh4B8eETqzKjTMupq-ZwM3A4fg8w2mi972KOLL9d2Np9V3SCxHw",
      picUrl: "",
      tag: "",
      param: {},
      isshop: true,
      shopdata: {
        address: "地址",
        city: "城市",
        doorPic: "门头照",
        healthPic: "健康许可证",
        licensePic: "营业执照",
        locationX: "",
        locationY: "",
        logoPic: "logo",
        doorPic: "门头照",
        mobile: " 电话（手机座机皆可）",
        otherService: "其他服务（wifi即可）",
        shopCate: "(1-5到1-18之间随机取几个)",
        shopHours:"营业时间(星期一至星期日,10:00至22:00)",
        shopName: "店铺名称",
        userName: " 联系人名称",
        userId: "商户id"
      },
      dishdata: {
        skuName: '',
        skuPic: '',
        sellPrice: '',
        goodsSkuSpecValue: {
          specValueId: 23
        },
        goodsSpuInVo: {
          goodsSpuSpec: {
            specId: 7
          },
          spuName: '', //@skuName
          spuType: 10,
          categoryId: '', // 二级类目id
          brandId: 1,
          goodsSpuDesc: {
            title: '', // @skuName+“描述”
            content:
              '<p style="padding:14px;color:#191919;font-size:14px;background:#fff;">鲜美可口</p>< img src="https://xq-1256079679.file.myqcloud.com/13971489895_1544080204_20181206151003826_0.8.jpg"/>' //描述+ img图片地址
          }
        },
        stockNum: '', // 库存
        miniNum: 1,
        expiryDate: 90,
        shopId: '', // @shopId
        sendType: 2,
        singleType: 1,
        actGoodsSkuInVos: [
          {
            shopId: '', //@shopId
            peopleNum: 2,
            ruleDesc: '每桌限量一份',
            stockNum: 15, //@stockNum
            goodsPromotionRules: {
              ruleDesc: '邀请好友秒杀',
              shopId: 35, //@shopId
              actAmount: '0.01',
              ruleType: 5
            },
            categoryId: '', //二级类目id
            actId: '44'
          },
          {
            shopId: 35, //@shopId
            peopleNum: 5,
            ruleDesc: '每桌限量一份',
            stockNum: 15, //@stockNum
            goodsPromotionRules: {
              ruleDesc: '邀请好友砍价',
              shopId: 35, //@shopId
              actAmount: '9.00', //砍价菜低价
              ruleType: 4
            },
            categoryId: '', //二级类目id
            actId: '41'
          }
        ]
      },
      dishdata2:{
        skuName:'商品名称',
        skuPic:'商品图片地址',
        sellPrice:'原价',
        categoryId:'二级类目id',
        stockNum:'库存',
        content:'商品描述',
        imgs:'',
        shopId:'商家ID',
      }
    };
  },
  methods: {
    //选择当前模式
    handUpload: function() {
      this.isshop = !this.isshop;
      this.param = {};
      console.log("isshop:", this.isshop);
      if (this.isshop) {
        this.param = this.shopdata;
      } else {
        this.param = this.dishdata2;
      }
    },
    //输入完成，点击提交  商品
    overdish:function(){
      let _this=this,data='';
      console.log('dishdata2',this.dishdata2)
      this.dishdata.skuName=this.dishdata2.skuName;
      this.dishdata.skuPic=this.dishdata2.skuPic;
      this.dishdata.sellPrice=this.dishdata2.sellPrice;
      this.dishdata.goodsSpuInVo.categoryId=this.dishdata2.categoryId;
      this.dishdata.goodsSpuInVo.goodsSpuDesc.title='清炒菠菜描述'+this.dishdata2.skuName+'描述';
      this.dishdata.goodsSpuInVo.goodsSpuDesc.content='<p style="padding:14px;color:#191919;font-size:14px;background:#fff;">'+this.dishdata2.content+'</p>'+this.dishdata2.imgs;
      this.dishdata.stockNum=this.dishdata2.stockNum;
      this.dishdata.shopId=this.dishdata2.shopId;
      this.dishdata.actGoodsSkuInVos[0].shopId=this.dishdata2.shopId;
      this.dishdata.actGoodsSkuInVos[0].stockNum=this.dishdata2.stockNum;
      this.dishdata.actGoodsSkuInVos[0].goodsPromotionRules.shopId=this.dishdata2.shopId;
      this.dishdata.actGoodsSkuInVos[0].categoryId=this.dishdata2.categoryId;

      this.dishdata.actGoodsSkuInVos[1].shopId=this.dishdata2.shopId;
      this.dishdata.actGoodsSkuInVos[1].stockNum=this.dishdata2.stockNum;
      this.dishdata.actGoodsSkuInVos[1].goodsPromotionRules.shopId=this.dishdata2.shopId;
      this.dishdata.actGoodsSkuInVos[1].categoryId=this.dishdata2.categoryId;

      // console.log("this.dishdata:",JSON.stringify(this.dishdata))
      // data = qs.stringify(this.dishdata);

     data=JSON.stringify(this.dishdata);
    //  data = qs.stringify(data);
console.log('data:',data)
this.$axios({
    method: 'post',
    url:'api/app/goodsSku/addGoodsSkuAndAct',
    data:data,
    headers: {
      Authorization: this.token,
      'Content-Type':'application/json'
    }
}).then((res)=>{
    console.log('res:',res)
}); 
return

      
      this.$axios.post('api/app/goodsSku/addGoodsSkuAndAct',data, {
        headers: {
          Authorization: this.token,
         'Content-Type':'application/json'
        }
      }).then(res => {
        console.log("res:", res);
        if(res.data.code==0){
          alert("上传成功");
          _this.param={};
          if (_this.isshop) {
            _this.param = _this.shopdata;
          } else {
            _this.param = _this.dishdata2;
          }
        }
      });
    },
    //输入完成，点击提交   店铺
    over: function() {
      console.log("param:", this.param,this.isshop);
      let _this=this,data='';

      data = qs.stringify(this.param);
      this.$axios.post('api/app/shopEnter/addWithUserId',data, {
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        console.log("res:", res);
        if(res.data.code==0){
          alert("上传成功");
          _this.param={};
          if (_this.isshop) {
            _this.param = _this.shopdata;
          } else {
            _this.param = _this.dishdata;
          }
        }
      });
    },
    //复制图片地址
    copyUrl: function() {
      let e = document.getElementById("contents"); //对象是contents
      e.select(); //选择对象
      this.tag = document.execCommand("Copy"); //执行浏览器复制命令
      console.log("tag:", this.tag);
    },
    // 获取文件
    getFile: function(e) {
      console.log("token:", this.token);
      this.picUrl = "";
      this.tag = false;
      let _text = "",
        _Url = "",
        reg = /\.(jpg|bmp|gif|png)$/,
        _this = this,
        inputDOM = {};
      // 1-文章  2-视频
      if (this.motype == 1) {
        _text = "图片上传中...";
      }
      inputDOM = this.$refs.mocover;
      // 通过DOM取文件数据
      this.file = inputDOM.files[0];

      if (!this.file) {
        return false;
      }

      if (this.file.size * 1 > 10485760) {
        Toast("文件过大，请重新10M以内的文件上传");
        return false;
      }

      // 触发这个组件对象的input事件
      this.$emit("input", this.file);
      // 这里就可以获取到文件的名字了
      this.uploadFile();
    },
    uploadFile: function() {
      //上传图片视频
      let _this = this,
        _text = "",
        _Url = "",
        timer = null;
      this.ispro = true;
      this.schedule = 0;
      timer = setInterval(getTotelNumber, 200);
      function getTotelNumber() {
        _this.schedule += 1;
        if (_this.coverImg) {
          _this.schedule = 100;
          clearInterval(timer);
          _this.ispro = false;
        } else if (_this.schedule < 99) {
          _this.schedule += 1;
        } else if (_this.schedule == 99) {
          clearInterval(timer);
        }
      }
      getTotelNumber();

      // 这里加个回调也是可以的
      this.onChange && this.onChange(this.file, inputDOM.value);
      // this.imgPreview(this.file);
      console.log("file:", this.file, this.file.name);
      let form = new FormData();
      form.append("file", this.file);
      form.append("userName", "13971489895");
      console.log("form:", form);
      this.$axios
        .post("api/img/uploadMp4", form, {
          headers: {
            Authorization: this.token
          }
        })
        .then(res => {
          console.log("res:", res);
          if (res.data.code == 0) {
            if (res.data.data.picUrl) {
              _this.picUrl = res.data.data.picUrl;
            }
          }
        });
    },
    httpsAixos: function() {
      this.$http
        .get("api/ranking/gender", {})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created(){
    this.param = this.shopdata;
  }
};
</script>
<style lang="less">
.made {
  .upImg {
    width: 450px;
    min-height: 300px;
    border: 1px solid red;
    float: left;
    img {
      width: 200px;
    }
  }
  .sel {
    float: left;
    width: 100px;
    border: 1px solid pink;
    .resbut {
      background: red;
      color: #fff;
    }
    button {
      margin: 10px 5px;
    }
  }
  .shopcont {
    width: 400px;
    min-height: 400px;
    float: left;
    border: 2px solid blueviolet;
    ul {
      float: left;
      li {
        text-align: left;
        list-style-type: none;
        height: 40px;
      }
    }
  }
}
</style>
