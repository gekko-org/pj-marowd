import Vue from 'vue'
import Router from 'vue-router'
import ShowCase from './components/ShowCase'
import TopPage from './components/pages/TopPage'
import DetailPage from './components/pages/DetailPage'
import NewOrEditPage from './components/pages/NewOrEditPage'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/toppage',
            name: 'toppage',
            component: TopPage
        },
        {
            path: '/',
            name: 'showcase',
            component: ShowCase
        },
        {
            path: '/detailpage',
            name: 'detailpage',
            component: DetailPage
        },
        {
            path: '/neworeditpage',
            name: 'neworeditpage',
            component: NewOrEditPage
        }
    ]
})