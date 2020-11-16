import {reqMenuList} from '../../util/request'

const state = {
    list: []
}

const mutations = {
    getMenu (state, arr) {
        state.list = arr;
    }
}

const actions = {
    menuList(context) {
        reqMenuList({istree: true}).then(res => {
            context.commit('getMenu', res.data.list)
        })
    }
}

const getters = {
    getList(state) {
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