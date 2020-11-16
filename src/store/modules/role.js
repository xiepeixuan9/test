import {reqRoleList} from '../../util/request'

const state = {
    list: []
}

const mutations = {
    getRole (state, arr) {
        state.list = arr;
    }
}

const actions = {
    roleList(context) {
        reqRoleList().then(res => {
            context.commit('getRole', res.data.list)
        })
    }
}

const getters = {
    getRoleList(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}