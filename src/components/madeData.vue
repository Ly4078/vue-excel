<template>
  <div class="made">
    <!-- <h3>数据制造</h3> -->
    <button @click="httpsAixos">click</button>
    <div class="sel">
      <button @click="handUpload" :class="isshop ? 'resbut' : ''">上传店铺</button>
      <button @click="handUpload" :class="isshop ? '' : 'resbut'">上传商品</button>
    </div>
    <div class="upImg">
      <div>
        修改token
        <textarea cols="40" rows="6" v-model="token"></textarea>
      </div>
      <input class="getfile" type="file" ref="mocover" @change="getFile">
      <img v-show="picUrl" :src="picUrl" alt="上传返回的图片地址">
      <textarea id="contents" cols="40" rows="3" v-model="picUrl"></textarea>
      <br>
      <button @click="copyUrl">复制</button>
      <span v-show="tag">复制成功</span>
    </div>
    <!--  -->
<div class="shopcont">
      商品说明：<textarea id="contents" cols="30" rows="4" v-model="ptitle"></textarea>
      <ul>
        <li v-for="(item,key) in ppimgs" :key="key">
          {{key}}:
          <textarea id="contents" cols="30" rows="2" v-model="ppimgs[key].url"></textarea>
        </li><button @click="addimgurl">+</button>
         <button @click="wancheng">完成</button>
      </ul>
      
      <textarea id="contents" cols="40" rows="6" v-model="htmlyu"></textarea>
    
    </div>







    <!--  -->
    <div class="shopcont" v-show="false" v-if="isshop">
      <ul>
        <li v-for="(item,key) in param" :key="key">
          {{key}}:
          <textarea id="contents" cols="30" rows="2" v-model="param[key]"></textarea>
        </li>
      </ul>
      <button @click="overshop">输入完成提交</button>
    </div>
    <div class="shopcont" v-show="false" v-if="!isshop">
      <ul >
        <li v-for="(item,key) in param" :key="key">
          {{key}}:
          <textarea id="contents" cols="30" rows="2" v-model="param[key]"></textarea>
        </li>
        <button @click="addimgs">+</button>
        <li v-for="(item,index) in imgarr" :key="index">
          商品描述图片{{index+1}}
          <textarea cols="30" rows="2" v-model="item.url" placeholder="图片链接地址"></textarea>
        </li>
      </ul>

      <button @click="overdish">输入完成提交</button>
    </div>

    <div class="shopright" v-show="false">
      <img v-if="dishdata2.skuPic" :src="dishdata2.skuPic" alt="">
      <img v-if="shopdata.doorPic!='门头照(图片地址)'" :src="shopdata.doorPic" alt="门头照图片地址错误"><br><br><br>
      <img v-if="shopdata.logoPic!='logo(图片地址)'" :src="shopdata.logoPic" alt="logo图片地址错误">
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "made",
  data() {
    return {
      token:'Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NDU3MTY0NTEsImNyZWF0ZWQiOjE1NDUxMTE2NTEzMTAsInN1YiI6IjEzMjk3OTMyOTgyIn0.d4ga0eZozB3haIOsXAbAcS_Ko6mUv_26Lmit7IB_KnSUN4TF2jGlWkuE1q6I25i35TGOR33sPA-EmFKHhYUCQw',
      picUrl: '',
      tag: '',
      param: {},
      ptitle:'',
      ppimgs:[{
        url:''
      }],
      htmlyu:'',
      isshop: false,
      isclick: true,
      imgarr: [
        {
          url: ''
        }
      ],
      shopdata: {
        address: "湖北省-武汉市-江汉区-",
        doorPic: "门头照(图片地址)",
        logoPic: "logo(图片地址)",
        shopCate: "1-",
        shopHours: "星期一至星期日,10:00至22:00",
        shopName: "店铺名称",
        userName: "联系人名称",
        userId: "商户userid",
        mobile: " 电话（手机座机皆可）",
        city: "武汉市",
        otherService: "wifi",
        healthPic:
          "https://xqmp4-1256079679.file.myqcloud.com/13297932982_2018120713312321718.jpg",
        licensePic:
          "https://xqmp4-1256079679.file.myqcloud.com/13297932982_12321_20181207133727.jpg",
        locationX: "",
        locationY: "",
        businessCate: "其它美食/聚会"
      },
      dishdata: {
        skuName: "",
        skuPic: "",
        sellPrice: "",
        goodsSkuSpecValue: {
          specValueId: 23
        },
        goodsSpuInVo: {
          goodsSpuSpec: {
            specId: 7
          },
          spuName: "", //@skuName
          spuType: 10,
          categoryId: "", // 二级类目id
          brandId: 1,
          goodsSpuDesc: {
            title: "", // @skuName+“描述”
            content:
              '<p style="padding:14px;color:#191919;font-size:14px;background:#fff;">鲜美可口</p>< img src="https://xq-1256079679.file.myqcloud.com/13971489895_1544080204_20181206151003826_0.8.jpg"/>' //描述+ img图片地址
          }
        },
        stockNum: "", // 库存
        miniNum: 1,
        expiryDate: 90,
        shopId: "", // @shopId
        sendType: 2,
        singleType: 1,
        actGoodsSkuInVos: [
          {
            shopId: "", //@shopId
            peopleNum: 2,
            ruleDesc: "每桌限量一份",
            stockNum: 15, //@stockNum
            goodsPromotionRules: {
              ruleDesc: "邀请好友秒杀",
              shopId: 35, //@shopId
              actAmount: "0.01",
              ruleType: 5
            },
            categoryId: "", //二级类目id
            actId: "44"
          },
          {
            shopId: 35, //@shopId
            peopleNum: 5,
            ruleDesc: "每桌限量一份",
            stockNum: 15, //@stockNum
            goodsPromotionRules: {
              ruleDesc: "邀请好友砍价",
              shopId: 35, //@shopId
              actAmount: "", //砍价菜低价
              ruleType: 4
            },
            categoryId: "", //二级类目id
            actId: "41"
          }
        ]
      },
      dishdata2: {
        skuName: "商品名称",
        skuPic: "商品图片地址",
        sellPrice: "原价(数字 N>1.5)",
        categoryId: "二级类目id(数字 见二级类目表)",
        stockNum: "库存(数字 200<N<9999)",
        shopId: "商家ID(数字 见ID表)",
        actAmount: "商品底价(1.5<N<原价(sellPrice))",
        content: "商品描述(文字，商品简介或商品名称)"
      }
    };
  },
  methods: {
    addimgurl:function(){
      let obj={
        url:''
      }
      this.ppimgs.push(obj)
    },
        wancheng:function(){
      let strimg='',strp='';
      if(this.ptitle){
        strp='<p style="padding:14px;color:#191919;font-size:14px;background:#fff;">'+this.ptitle+'</p>';
      }else{
        strp='<p style="padding:14px;color:#191919;font-size:14px;background:#fff;"></p>';
      }
      if(this.ppimgs && this.ppimgs.length>0){
        for(let i in this.ppimgs){
          console.log("urlLL：",this.ppimgs[i])
          if(this.ppimgs[i].url){
            let url ='<img src="'+this.ppimgs[i].url+'"/>';
            strimg+=url;
          }else{
            alert("图片地址错误")
          }
        }
        this.htmlyu=strp+strimg;
      }else{
        alert("请输入图片地址")
      }
    },
    phone: function() {
      let prefixArray = new Array(
        "130",
        "131",
        "132",
        "133",
        "135",
        "134",
        "137",
        "138",
        "170",
        "187",
        "189",
        "139"
      );
      let i = parseInt(10 * Math.random());
      let prefix = prefixArray[i];
      for (let j = 0; j < 8; j++) {
        prefix = prefix + Math.floor(Math.random() * 10);
      }
      return prefix;
    },
    //选择当前模式
    handUpload: function() {
      this.param = {};
      this.isshop = !this.isshop;
      console.log("isshop:", this.isshop);
      if (this.isshop) {
        
        this.param = this.shopdata;
        let _locationX = "",
          _locationY = "";
        for (var i = 0; i < 6; i++) {
          _locationX += Math.floor(Math.random() * 10);
          _locationY += Math.floor(Math.random() * 10);
        }
        _locationX = "114." + _locationX;
        _locationY = "30." + _locationY;
        this.param.locationX = _locationX;
        this.param.locationY = _locationY;
        

        this.param.mobile = this.phone();
        // return
      } else {
        this.param = this.dishdata2;
      }
    },
    addimgs: function() {
      let obj = {
        url: ""
      };
      this.imgarr.push(obj);
    },
    //商品信息输入完成，点击提交  商品
    overdish: function() {
      let _this = this,
        data = "",
        _imgUrl = "";

      if (!this.isclick) {
        alert("数据正在上传中，请等待成功或失败提示后再点提交");
        return;
      }
      this.isclick = false;

      if (this.imgarr[0].url) {
        let _imgarr = this.imgarr;
        for (let i in _imgarr) {
          let _img = '<img src="' + _imgarr[i].url + '">';
          _imgUrl += _img;
        }
      }
      this.dishdata.skuName = this.dishdata2.skuName;
      this.dishdata.skuPic = this.dishdata2.skuPic;
      this.dishdata.sellPrice = this.dishdata2.sellPrice;
      this.dishdata.goodsSpuInVo.categoryId = this.dishdata2.categoryId;
      this.dishdata.goodsSpuInVo.spuName = this.dishdata2.skuName;
      this.dishdata.goodsSpuInVo.goodsSpuDesc.title =
         this.dishdata2.skuName + "描述";
      this.dishdata.goodsSpuInVo.goodsSpuDesc.content =
        '<p style="padding:14px;color:#191919;font-size:14px;background:#fff;">' +
        this.dishdata2.content +
        "</p>" +
        _imgUrl;
      this.dishdata.stockNum = this.dishdata2.stockNum;
      this.dishdata.shopId = this.dishdata2.shopId;
      this.dishdata.actGoodsSkuInVos[0].shopId = this.dishdata2.shopId;
      this.dishdata.actGoodsSkuInVos[0].stockNum = this.dishdata2.stockNum;
      this.dishdata.actGoodsSkuInVos[0].goodsPromotionRules.shopId = this.dishdata2.shopId;
      this.dishdata.actGoodsSkuInVos[0].categoryId = this.dishdata2.categoryId;

      this.dishdata.actGoodsSkuInVos[1].shopId = this.dishdata2.shopId;
      this.dishdata.actGoodsSkuInVos[1].stockNum = this.dishdata2.stockNum;
      this.dishdata.actGoodsSkuInVos[1].goodsPromotionRules.shopId = this.dishdata2.shopId;
      this.dishdata.actGoodsSkuInVos[1].categoryId = this.dishdata2.categoryId;
      this.dishdata.actGoodsSkuInVos[1].goodsPromotionRules.actAmount = this.dishdata2.actAmount;

      data = JSON.stringify(this.dishdata);

      this.$axios({
        method: "post",
        url: "api/app/goodsSku/addGoodsSkuAndAct",
        data: data,
        headers: {
          Authorization: this.token,
          "Content-Type": "application/json"
        }
      }).then(res => {
        _this.isclick = true;
        if (res.data.code == 0) {
          alert("上传成功");
          _this.param = {};
          _this.param = _this.dishdata2;
        } else {
          alert("上传失败");
          alert(res.data.message);
        }
      });
    },
    //店铺信息输入完成，点击提交   店铺
    overshop: function() {
      let _this = this,
        params = "";
      if (!this.isclick) {
        alert("数据正在上传中，请等待成功或失败提示后再点提交");
        return;
      }
      this.isclick = false;
      params = qs.stringify(this.param);
      this.$axios.post("api/app/shopEnter/addWithUserId", params, {
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        console.log("res:", res);
        _this.isclick = true;
        if (res.data.code == 0) {
          alert("上传成功");
          _this.param = {};
          _this.param = _this.shopdata;
        } else {
          alert("上传失败");
          alert(res.data.message);
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
  created() {
    // this.param = this.shopdata;
    if (this.isshop) {
      let Service = new Array('包间','停车场'),_service='';
        let i = parseInt(2 * Math.random());
          console.log('Service:',Service)
        console.log('i:',i)
        _service ='wifi,'+ Service[i];
         console.log('_service:',_service)
        this.shopdata.otherService=_service;
         console.log('_service:',this.shopdata.otherService)
      let _locationX = "",
        _locationY = "";
      for (var i = 0; i < 6; i++) {
        _locationX += Math.floor(Math.random() * 10);
        _locationY += Math.floor(Math.random() * 10);
      }
      _locationX = "114." + _locationX;
      _locationY = "30." + _locationY;
      this.shopdata.locationX = _locationX;
      this.shopdata.locationY = _locationY;
      this.shopdata.mobile = this.phone();
      this.param = this.shopdata;
    } else {
      this.param = this.dishdata2;
    }
  }
};
</script>
<style lang="less">
.made {
  .upImg {
    width: 400px;
    min-height: 300px;
    border: 1px solid red;
    float: left;
    margin-right: 10px;
    img {
      width: 200px;
    }
  }
  .sel {
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
    margin-right: 10px;
    ul {
      float: left;
      li {
        text-align: left;
        list-style-type: none;
        height: 40px;
      }
    }
  }
  .shopright{
    float: left;
    img{
       width: 200px;
    }
  }

}
</style>
