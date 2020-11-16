<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed='closed'>
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="width">
          <el-select v-model="form.roleid">
            <el-option label="请选择" :value="0" disabled></el-option>
            <!-- 循环添加的数据 -->
            <el-option :label="item.rolename" :value="item.id" v-for="item in list" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
            <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2">
            </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update(form)" v-else
          >修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import {confirm, cancel} from '../../../util/alert'
import {reqManagerAdd, reqManagerOne, reqManagerEdit} from '../../../util/request'

export default {
    props: ['info'],
  data() {
      return {
        isShow: true,
        form: {
          roleid: 0,
          username: '',
          password: '',
          status: 1
        },
        width: '120px',
      };
    },
  computed: {
      ...mapGetters({
        list: 'role/getRoleList',
        total: 'manager/getTotalPages',
        page: 'manager/getPage'
      })
  },
  watch: {},
  methods: {
     // 弹出框隐藏
      hide() {
          this.info.isShow = false;
      },
      // 表单置空
      empty() {
        this.form = {
          roleid: 0,
          username: '',
          password: '',
          status: 1
        }
      },
      closed() {
         this.empty();
      },
      // 添加按钮
      add() {
          reqManagerAdd(this.form).then(res => {
            this.hide();
            this.managerCount();
            this.managerList();
            this.empty();
            confirm(res.data.msg);
          })
      },
      ...mapActions({
          roleList: 'role/roleList',
          managerList: 'manager/managerList',
          managerCount: 'manager/managerCount',
          currentPage: 'manager/getCurrentPage'
      }),
      // 获取某一条数据
      look(id) {
          reqManagerOne({uid: id}).then(res => {
            this.form = res.data.list;
            this.form.uid = id;
            console.log(res);
          })
      },
      // 修改按钮
      update() {
          this.$confirm('此操作将修改数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 修改操作
           reqManagerEdit(this.form).then(res => {
              this.hide();
              this.managerList();
              this.empty();
              confirm(res.data.msg);
           })
        })
      }
  },
  mounted() {
    this.roleList();
  }
};
</script>

<style lang='' scoped>
</style>
