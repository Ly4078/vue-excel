<template>
  <div class="about">
    <div class="navleft">
      <ul>
        <li class="lis">
          <router-link to="/">类目一</router-link>
        </li>
        <li class="lis">
          <router-link to="/">类目二</router-link>
        </li>
        <li class="lis">
          <router-link to="/">类目三</router-link>
        </li>
        <li class="lis">
          <router-link to="/">类目四</router-link>
        </li>
        <li class="lis">
          <router-link to="/">类目五</router-link>
        </li>
      </ul>
    </div>
    <div class="page">
      <h1>点击导出按钮导出表格到本地</h1>
      <button @click="export2Excel">导出</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "about",
  data() {
    return {
      list: [
        {
          name: "韩版设计时尚风衣大",
          number: "MPM00112",
          salePrice: "￥999.00",
          stocknums: 3423,
          salesnums: 3423,
          sharenums: 3423
        },
        {
          name: "韩版设计时尚风衣大",
          number: "MPM00112",
          salePrice: "￥999.00",
          stocknums: 3423,
          salesnums: 3423,
          sharenums: 3423
        }
      ]
    };
  },
  methods: {
    formatJson(filterVal, jsonData) {
      console.log("filterVal:", filterVal);
      console.log("jsonData:", jsonData);
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    export2Excel() {
      console.log("export2Excel");
      require.ensure([], () => {
        const { export_json_to_excel } = require("../vendor/Export2Excel");
        const tHeader = [
          "商品名称",
          "商品货号",
          "售价",
          "库存",
          "销量",
          "分享"
        ];
        const filterVal = [
          "name",
          "number",
          "salePrice",
          "stocknums",
          "salesnums",
          "sharenums"
        ];
        console.log("filterVal:", filterVal);
        const list = this.list;
        console.log("list:", list);
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "商品管理列表");
      });
    }
  },
  props: {
    msg: String
  }
};
</script>
<style lang="less">
.about {
  .navleft{
    float: left;
    width: 15%;
    border: 1px solid red;
    ul{
      width: 100%;
      li{
        width: 60%;
        border-bottom: 1px solid #ebebeb;
        text-align: center;
        line-height: 40px;
        margin: 5px 0 ;
        a{
          display: block;
          width: 100%;
          height: 100%;
          background: red;
        }
      }
    }
  }
  .page{
    background: pink;
    float: left;
  }
  li {
    list-style: none;
  }
}
</style>
