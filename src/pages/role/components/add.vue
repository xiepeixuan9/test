<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed='closed'>
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="list"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expanded-keys="[2, 3]"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update(form)" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqRoleAdd, reqRoleOne, reqRoleEdit } from "../../../util/request";
import { confirm, cancel } from "../../../util/alert";

export default {
  props: ["info"],
  data() {
    return {
      isShow: true,
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
      width: "120px",
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/getList",
      getRoleList: "role/getRoleList",
    }),
  },
  watch: {},
  methods: {
    hide() {
      this.info.isShow = false;
    },
    empty() {
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      }
    },
    closed() {
         this.empty();
         this.$refs.tree.setCheckedKeys([], false);
    },
    // 添加
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        this.hide();
        this.empty();
        this.roleList();
        confirm(res.data.msg);
      });
    },
    ...mapActions({
      menuList: "menu/menuList",
      roleList: "role/roleList",
    }),
    // 获取修改的那条数据
    look(id) {
      reqRoleOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.menus = this.$refs.tree.setCheckedKeys(
          JSON.parse(res.data.list.menus)
        );
        this.form.id = id;
      });
    },
    // 修改
    update() {
      this.$confirm("此操作将修改数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
          // 修改操作
          reqRoleEdit(this.form).then((res) => {
            this.hide();
            this.roleList();
            this.empty();
            confirm(res.data.msg);
          });
        })
        .catch((err) => {
          cancel(err.data.msg);
        });
    },
  },
  mounted() {
    this.menuList();
  },
};
</script>

<style lang='' scoped>
</style>
