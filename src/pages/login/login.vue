<template>
 <div class="login">
     <div class="con">
         <h2>登录</h2>
         <div>
             <input type="text" v-model="user.username">
         </div>
         <div>
             <input type="password" v-model="user.password">
         </div>
         <div>
             <input type="button" value="登录" @click="login">
         </div>
     </div>
 </div>
</template>

<script>
import {userLogin} from '../../util/request'
import {mapGetters, mapMutations} from 'vuex'
export default {
 data() {
 return {
     user: {
         username: '',
         password: ''
     }
 };
 },
 computed:{
 },
 watch:{
 },
 methods: {
     ...mapMutations({
         getUser: 'user/getUser'
     }),
     login() {
         userLogin(this.user).then(res => {
             console.log(res);
            this.getUser(res.data.list);
            this.$router.push('/index');
         })  
         
     }
 },
};
</script>

<style lang='' scoped>
.login {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right, pink,hotpink);
}
.con {
    width: 428px;
    height: 260px;
    text-align: center;
    background: white;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
h2 {
    margin-top: 30px;
}
.con div {
    margin-top: 15px;
}
input {
    width: 272px;
    height: 32px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
input[type='text'],
input[type='password'] {
    text-indent: 1em;
}
::-webkit-input-placeholder {
    color: #aaa;
    font-size: 20px;
}
input[type='button'] {
    background: #409eff;
    color: white;
    border: 1px solid #409eff;
}
</style>
