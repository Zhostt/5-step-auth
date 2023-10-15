import { createRouter, createWebHistory } from 'vue-router';
import {
    PersonalData,
    IdentityConfirm,
    ConditionsList,
    AwaitCheck,
    SuccessPage,
} from '../components/index.ts'

const routes = [
    {path: '/login', component: PersonalData },
    {path: '/confirm', component: IdentityConfirm },
    {path: '/conditions', component: ConditionsList },
    {path: '/loading', component: AwaitCheck },
    {path: '/success', component: SuccessPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router