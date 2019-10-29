<template>
  <div class="member-wrapper">
    <el-form ref="searchForm" :inline="true" :model="searchMap" class="search-form-inline">
      <el-form-item prop="cardNum">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="会员名字"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="searchMap.payType" placeholder="支付类型">
          <el-option v-for="option in payTypeOption" :key="option.type" :label="option.name" :value="option.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchMap.birthday"
          type="date"
          placeholder="出生日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getListData">查询</el-button>
        <el-button type="primary" @click="dialogTableVisible = true">新增</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 98%"
      class="member-table"
    >
      <!-- type="index"获取索引值，从1开始 ，label显示标题，prop 数据字段名，width列宽 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
      <el-table-column prop="name" label="会员姓名" width="90"></el-table-column>
      <el-table-column prop="birthday" label="会员生日" ></el-table-column>
      <el-table-column prop="phone" label="手机号码" ></el-table-column>
      <el-table-column prop="integral" label="可用积分" ></el-table-column>
      <el-table-column prop="money" label="开卡金额" ></el-table-column>
      <el-table-column prop="payType" label="支付类型" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.payType | payTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" ></el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total=total>
      </el-pagination>
    </div>
    <!--会员新增--弹框 -->
    <el-dialog title="新增会员" :visible.sync="dialogTableVisible" class="addDialog" width="30%">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="会员卡号" width="25%">
          <el-input v-model="formData.cardNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" width="25%">
         <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" width="25%">
         <el-input v-model="formData.birthday"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" width="25%">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" width="25%">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" width="25%">
          <el-select v-model="formData.payType" placeholder="点击青选择">
            <el-option v-for="payOption in payTypeOption" :key="payOption.type" :label="payOption.name" :value="payOption.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" width="81%">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import memberApi from "./../../api/member.js";
// 支付类型
const payTypeOption = [
  {type: '1', name: '现金'},
  {type: '2', name: '微信'},
  {type: '3', name: '支付宝'},
  {type: '4', name: '银行卡'}
]
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchMap: {
        cardNum: '',
        name: '',
        payType: '',
        birthday: ''
      },
      payTypeOption: payTypeOption,
      dialogTableVisible: false, // 弹框默认隐藏
      formData: {}, // 提交的数据
      textarea: ''
    }
  },
  mounted() {
    // 初始化列表数据
    this.getListData()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getListData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getListData();
    },
    getListData() {
      memberApi.search(this.currentPage, this.pageSize, this.searchMap).then(res => {
        const resData = res.data.data;
        this.tableData = resData.rows
        this.total = resData.total
        console.log(resData);
      });
    },
    handleEdit() {},
    resetForm(formName) {
      // 重置会看el-form-item 组件元素的prop上是否指定了字段名，指定了才会重置生效
      this.$refs[formName].resetFields()
    },
    addMember() {
      this.dialogTableVisible = true
    }
  },
  filters: {
    payTypeFilter(type) {
      /// *****在过滤器中不能引用当前实例this this.payTypeOption是错误的
      const payObj = payTypeOption.find(obj => obj.type === type) // 判断payObj的类型相同的时候过滤出来
      return payObj ? payObj.name : null // 如果存在payObj的话，则返回name没有则为null
    }
  }
};
</script>
<style scoped>
  .search-form-inline {
    margin-top: 20px;
    float: right;
    margin-right: 13px;
  }
  .member-table {
    margin: 0 10px;
  }
  .pagination-wrapper {
    float: right;
    margin-top: 10px;
    margin-right: 13px;
  }
  .el-input {
    width: 88%;
  }
  .el-textarea {
    width: 88%;
  }
</style>
