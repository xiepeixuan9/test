import Vue from 'vue'
let vm = new Vue()

export const confirm = (msg) => {
    vm.$message({
        type: 'success',
        message: msg
      });
}

export const cancel = (msg) => {
    vm.$message({
        type: 'info',
        message: msg
      });
}

export const warning = (msg) => {
  vm.$message({
    type: 'warning',
    message: msg
  });
}