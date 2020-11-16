<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户编号" width="120">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div>
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="2"
            >
            </el-switch>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="update(scope.row.uid)">修改</el-button>
            <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :page-size="2" :current-page='page' background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" @prev-click="handleCurrentChange" @next-click="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { confirm, cancel } from "../../../util/alert";
import {reqManagerDel} from '../../../util/request'

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      list: "manager/getManagerList",
      total: 'manager/getTotalPages',
      page: 'manager/getPage'
    }),
  },
  watch: {},
  methods: {
    ...mapActions({
      managerList: "manager/managerList",
      managerCount: 'manager/managerCount',
      currentPage: 'manager/getCurrentPage'
    }),
    // 删除
    del(id) {
      // console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除操作
          reqManagerDel({uid: id}).then(res => {
            this.managerCount();
            this.managerList();
            confirm(res.data.msg);
            // this.managerList();
            this.currentPage(1);

          })
        })
    },
    // 更新
    update(id) {
      this.$emit("edit", id);
    },
    handleCurrentChange(p) {
      this.currentPage(p);
    }
  },
  mounted() {
    this.managerList();
    this.managerCount();
    this.currentPage(1);
  },
};
</script>

<style lang='' scoped>
</style>
