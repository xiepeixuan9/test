<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed='closed'>
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="width">
          <el-select v-model="form.pid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 循环添加的数据 -->
            <el-option :label="item.title" :value="item.id" v-for="item in list" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="width">
            <el-radio :label="1" v-model='form.type'>目录</el-radio>
            <el-radio :label="2" v-model='form.type'>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="width" v-if="form.type==1">
          <el-select v-model="form.icon">
            <el-option label="el-icon-setting" value="el-icon-setting">
                <i class="el-icon-setting"></i>
            </el-option>
            <el-option label="el-icon-user-solid" value="el-icon-user-solid">
                <i class="el-icon-user-solid"></i>
            </el-option>
            <el-option label="el-icon-goods" value="el-icon-goods">
                <i class="el-icon-goods"></i>
            </el-option>
            <el-option label="el-icon-message-solid" value="el-icon-message-solid">
                <i class="el-icon-message-solid"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="width" v-else>
          <el-select v-model="form.url">
            <el-option v-for="item in indexRouters" :key="item.path" :value="'/'+item.path" :label="item.name"></el-option>
          </el-select>
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
import {indexRouters} from '../../../router/index'

import {reqMenuAdd, reqMenuOne, reqMenuEdit} from '../../../util/request'
import {mapGetters, mapActions} from 'vuex'
import {confirm, cancel} from '../../../util/alert'

export default {
    props: ['info'],
  data() {
      return {
        isShow: true,
        form: {
          pid: 0,
          title: '',
          icon: '',
          type: 1,
          url: '',
          status: 1
        },
        width: '120px',
        indexRouters: indexRouters
      };
    },
  computed: {
      ...mapGetters({
        list: 'menu/getList'
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
          pid: 0,
          title: '',
          icon: '',
          type: 1,
          url: '',
          status: 1
        } 
      },
      closed() {
         this.empty();
      },
      // 添加按钮
      add() {
          reqMenuAdd(this.form).then(res => {
            this.hide();
            this.menuList();
            this.empty();
            confirm(res.data.msg);
          })
      },
      ...mapActions({
          menuList: 'menu/menuList'
      }),
      // 获取某一条数据
      look(id) {
          reqMenuOne({id:id}).then(res => {
              this.form = res.data.list
              this.form.id = id
          })
      },
      // 修改按钮
      update() {
          this.$confirm('此操作将修改数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.form.type ==1) {
            this.form.url = '';
          }else {
            this.form.icon = '';
          }
          // 修改操作
           reqMenuEdit(this.form).then(res => {
            this.hide();
            this.menuList();
            this.empty();
            confirm(res.data.msg);
          });
        })
      }
  },
};
</script>

<style lang='' scoped>
</style>
