import { createRouter, createWebHistory } from 'vue-router';
import {
    PersonalData,
    IdentityConfirm,
    ConditionsList,
    AwaitCheck,
    SuccessPage,
    ErrorPage,
} from '../components/index.ts'

const routes = [
    {path: '/', component: PersonalData },
    {path: '/confirm', component: IdentityConfirm },
    {path: '/conditions', component: ConditionsList },
    {path: '/loading', component: AwaitCheck },
    {path: '/success', component: SuccessPage },
    {path: '/error', component: ErrorPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router