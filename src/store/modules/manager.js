import {reqManagerList, reqManagerCount} from '../../util/request'

const state = {
    list: [],
    size: 2,
    page: 2,
    total: 0
}

const mutations = {
    getManager(state, arr) {
        state.list = arr;
    },
    getTotal(state, page) {
        state.total = page;
    },
    getPage(state, page) {
        state.page = page;
    }
}

const actions = {
    managerList(context) {
        reqManagerList({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            // console.log(res);
            context.commit('getManager', res.data.list)
        })
    },
    // 请求总数
    managerCount(context) {
        reqManagerCount().then(res => {
            context.commit('getTotal', res.data.list[0].total)
        })
    },
    // 改变当前页
    getCurrentPage(context, page) {
        context.commit('getPage', page);
        context.dispatch('managerList');
    }
}

const getters = {
    getManagerList(state) {
        return state.list;
    },
    getTotalPages(state) {
        return state.total;
    },
    getPage(state) {
        return state.page;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
} 