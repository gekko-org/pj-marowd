import Vue from 'vue'
import Router from 'vue-router'
import ShowCase from './components/ShowCase'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'showcase',
            component: ShowCase
        }
    ]
})