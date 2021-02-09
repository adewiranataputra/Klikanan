import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import AM from '@/views/AM.vue'
import Presales from '@/views/Presales.vue'
import DashboardAM from '@/views/AM/Dashboard.vue'
import ServiceActivation from '@/views/AM/Request/ServiceActivation.vue'
import Trial from '@/views/AM/Request/Trial.vue'
import VVIP from '@/views/AM/Request/VVIP.vue'
import NewCalculatePresales from '@/views/AM/Request/NewCalculatePresales.vue'
import InternalUsage from '@/views/AM/Report/InternalUsage.vue'
import DashboardPresales from '@/views/Presales/Dashboard.vue'
import axios from "axios";

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        component: Login,
        beforeEnter(to, from, next) {
            if(localStorage.length > 0) {
                console.log(localStorage.getItem('level'))
                if(localStorage.getItem('level') === "1") {

                } else if(localStorage.getItem('level') === '2') {
                    next({
                        path: '/am/dashboardAM',
                        params: {
                            nextUrl: to.fullPath
                        }
                    })
                }
            } else {
                localStorage.clear();
                next()
            }
        }
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: Login,
        beforeEnter(to, from, next) {
            if(localStorage.length > 0) {
                console.log(localStorage.getItem('level'))
                if(localStorage.getItem('level') === "1") {

                } else if(localStorage.getItem('level') === '2') {
                    next({
                        path: '/am/dashboardAM',
                        params: {
                            nextUrl: to.fullPath
                        }
                    })
                }
            } else {
                localStorage.clear();
                next()
            }
        }
    },
    {
        path: '/presales',
        name: 'Presales',
        component: Presales,
        children: [{
            path: 'dashboardPresales',
            name: 'DashboardPresales',
            component: DashboardPresales,
            beforeEnter(to, from, next) {
                if (localStorage.getItem('token') === null) {
                    next({
                        path: '/',
                        params: {
                            nextUrl: to.fullPath
                        }
                    })
                } else {
                    if (localStorage.getItem('level') !== "2") {
                        localStorage.clear();
                        next({
                            path: '/',
                            params: {
                                nextUrl: to.fullPath
                            }
                        })
                    } else {
                        axios
                            .get(
                                "https://www.api-fab-cds.rumahcomp.com/fab/api/auth/rolecheck", {
                                    headers: {
                                        token: localStorage.getItem('token'),
                                        nik: localStorage.getItem('nik')
                                    }
                                }
                            )
                            .then(function(response) {
                                if (response.data.status !== 1) {
                                    localStorage.clear();
                                    next({
                                        path: '/',
                                        params: {
                                            nextUrl: to.fullPath
                                        }
                                    })
                                } else {
                                    if (response.data.data.level !== localStorage.getItem('level')) {
                                        localStorage.clear();
                                        next({
                                            path: '/',
                                            params: {
                                                nextUrl: to.fullPath
                                            }
                                        })
                                    } else if (response.data.data.nik !== localStorage.getItem('nik')) {
                                        localStorage.clear();
                                        next({
                                            path: '/',
                                            params: {
                                                nextUrl: to.fullPath
                                            }
                                        })
                                    } else {
                                        next()
                                    }
                                }
                            })
                            .catch(function(error) {
                                localStorage.clear();
                                next({
                                    path: '/',
                                    params: {
                                        nextUrl: to.fullPath
                                    }
                                })
                            });
                    }
                }
            }
        }],
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token') === null) {
                next({
                    path: '/',
                    params: {
                        nextUrl: to.fullPath
                    }
                })
            } else {
                if (localStorage.getItem('level') !== "2") {
                    localStorage.clear();
                    next({
                        path: '/',
                        params: {
                            nextUrl: to.fullPath
                        }
                    })
                } else {
                    axios
                        .get(
                            "https://www.api-fab-cds.rumahcomp.com/fab/api/auth/rolecheck", {
                                headers: {
                                    token: localStorage.getItem('token'),
                                    nik: localStorage.getItem('nik')
                                }
                            }
                        )
                        .then(function(response) {
                            if (response.data.status !== 1) {
                                localStorage.clear();
                                next({
                                    path: '/',
                                    params: {
                                        nextUrl: to.fullPath
                                    }
                                })
                            } else {
                                if (response.data.data.level !== localStorage.getItem('level')) {
                                    localStorage.clear();
                                    next({
                                        path: '/',
                                        params: {
                                            nextUrl: to.fullPath
                                        }
                                    })
                                } else if (response.data.data.nik !== localStorage.getItem('nik')) {
                                    localStorage.clear();
                                    next({
                                        path: '/',
                                        params: {
                                            nextUrl: to.fullPath
                                        }
                                    })
                                } else {
                                    next()
                                }
                            }
                        })
                        .catch(function(error) {
                            localStorage.clear();
                            next({
                                path: '/',
                                params: {
                                    nextUrl: to.fullPath
                                }
                            })
                        });
                }
            }
        }
    },
    {
        path: '/am',
        name: 'AM',
        component: AM,
        children: [{
            path: 'dashboardAM',
            name: 'DashboardAM',
            component: DashboardAM,
            beforeEnter(to, from, next) {
                if (localStorage.getItem('token') === null) {
                    next({
                        path: '/',
                        params: {
                            nextUrl: to.fullPath
                        }
                    })
                } else {
                    if (localStorage.getItem('level') !== "2") {
                        localStorage.clear();
                        next({
                            path: '/',
                            params: {
                                nextUrl: to.fullPath
                            }
                        })
                    } else {
                        axios
                            .get(
                                "https://www.api-fab-cds.rumahcomp.com/fab/api/auth/rolecheck", {
                                    headers: {
                                        token: localStorage.getItem('token'),
                                        nik: localStorage.getItem('nik')
                                    }
                                }
                            )
                            .then(function(response) {
                                if (response.data.status !== 1) {
                                    localStorage.clear();
                                    next({
                                        path: '/',
                                        params: {
                                            nextUrl: to.fullPath
                                        }
                                    })
                                } else {
                                    if (response.data.data.level !== localStorage.getItem('level')) {
                                        localStorage.clear();
                                        next({
                                            path: '/',
                                            params: {
                                                nextUrl: to.fullPath
                                            }
                                        })
                                    } else if (response.data.data.nik !== localStorage.getItem('nik')) {
                                        localStorage.clear();
                                        next({
                                            path: '/',
                                            params: {
                                                nextUrl: to.fullPath
                                            }
                                        })
                                    } else {
                                        next()
                                    }
                                }
                            })
                            .catch(function(error) {
                                localStorage.clear();
                                next({
                                    path: '/',
                                    params: {
                                        nextUrl: to.fullPath
                                    }
                                })
                            });
                    }
                }
            }
        },
            {
                path: 'newcalculatepresales',
                name: 'NewCalculatePresales',
                component: NewCalculatePresales,
                beforeEnter(to, from, next) {
                    if (localStorage.getItem('token') === null) {
                        next({
                            path: '/',
                            params: {
                                nextUrl: to.fullPath
                            }
                        })
                    } else {
                        if (localStorage.getItem('level') !== "2") {
                            localStorage.clear();
                            next({
                                path: '/',
                                params: {
                                    nextUrl: to.fullPath
                                }
                            })
                        } else {
                            axios
                                .get(
                                    "https://www.api-fab-cds.rumahcomp.com/fab/api/auth/rolecheck", {
                                        headers: {
                                            token: localStorage.getItem('token'),
                                            nik: localStorage.getItem('nik')
                                        }
                                    }
                                )
                                .then(function(response) {
                                    if (response.data.status !== 1) {
                                        localStorage.clear();
                                        next({
                                            path: '/',
                                            params: {
                                                nextUrl: to.fullPath
                                            }
                                        })
                                    } else {
                                        if (response.data.data.level !== localStorage.getItem('level')) {
                                            localStorage.clear();
                                            next({
                                                path: '/',
                                                params: {
                                                    nextUrl: to.fullPath
                                                }
                                            })
                                        } else if (response.data.data.nik !== localStorage.getItem('nik')) {
                                            localStorage.clear();
                                            next({
                                                path: '/',
                                                params: {
                                                    nextUrl: to.fullPath
                                                }
                                            })
                                        } else {
                                            next()
                                        }
                                    }
                                })
                                .catch(function(error) {
                                    localStorage.clear();
                                    next({
                                        path: '/',
                                        params: {
                                            nextUrl: to.fullPath
                                        }
                                    })
                                });
                        }
                    }
                }
            },
            {
                path: 'serviceActivation',
                name: 'ServiceActivation',
                component: ServiceActivation,
                beforeEnter(to, from, next) {
                    if (localStorage.getItem('token') === null) {
                        next({
                            path: '/',
                            params: {
                                nextUrl: to.fullPath
                            }
                        })
                    } else {
                        if (localStorage.getItem('level') !== "2") {
                            localStorage.clear();
                            next({
                                path: '/',
                                params: {
                                    nextUrl: to.fullPath
                                }
                            })
                        } else {
                            axios
                                .get(
                                    "https://www.api-fab-cds.rumahcomp.com/fab/api/auth/rolecheck", {
                                        headers: {
                                            token: localStorage.getItem('token'),
                                            nik: localStorage.getItem('nik')
                                        }
                                    }
                                )
                                .then(function(response) {
                                    if (response.data.status !== 1) {
                                        localStorage.clear();
                                        next({
                                            path: '/',
                                            params: {
                                                nextUrl: to.fullPath
                                            }
                                        })
                                    } else {
                                        if (response.data.data.level !== localStorage.getItem('level')) {
                                            localStorage.clear();
                                            next({
                                                path: '/',
                                                params: {
                                                    nextUrl: to.fullPath
                                                }
                                            })
                                        } else if (response.data.data.nik !== localStorage.getItem('nik')) {
                                            localStorage.clear();
                                            next({
                                                path: '/',
                                                params: {
                                                    nextUrl: to.fullPath
                                                }
                                            })
                                        } else {
                                            next()
                                        }
                                    }
                                })
                                .catch(function(error) {
                                    localStorage.clear();
                                    next({
                                        path: '/',
                                        params: {
                                            nextUrl: to.fullPath
                                        }
                                    })
                                });
                        }
                    }
                }
            },
            {
                path: 'trial',
                name: 'Trial',
                component: Trial,
                beforeEnter(to, from, next) {
                    if (localStorage.getItem('token') === null) {
                        next({
                            path: '/',
                            params: {
                                nextUrl: to.fullPath
                            }
                        })
                    } else {
                        if (localStorage.getItem('level') !== "2") {
                            localStorage.clear();
                            next({
                                path: '/',
                                params: {
                                    nextUrl: to.fullPath
                                }
                            })
                        } else {
                            axios
                                .get(
                                    "https://www.api-fab-cds.rumahcomp.com/fab/api/auth/rolecheck", {
                                        headers: {
                                            token: localStorage.getItem('token'),
                                            nik: localStorage.getItem('nik')
                                        }
                                    }
                                )
                                .then(function(response) {
                                    if (response.data.status !== 1) {
                                        localStorage.clear();
                                        next({
                                            path: '/',
                                            params: {
                                                nextUrl: to.fullPath
                                            }
                                        })
                                    } else {
                                        if (response.data.data.level !== localStorage.getItem('level')) {
                                            localStorage.clear();
                                            next({
                                                path: '/',
                                                params: {
                                                    nextUrl: to.fullPath
                                                }
                                            })
                                        } else if (response.data.data.nik !== localStorage.getItem('nik')) {
                                            localStorage.clear();
                                            next({
                                                path: '/',
                                                params: {
                                                    nextUrl: to.fullPath
                                                }
                                            })
                                        } else {
                                            next()
                                        }
                                    }
                                })
                                .catch(function(error) {
                                    localStorage.clear();
                                    next({
                                        path: '/',
                                        params: {
                                            nextUrl: to.fullPath
                                        }
                                    })
                                });
                        }
                    }
                }
            },
            {
                path: 'vvip',
                name: 'VVIP',
                component: VVIP,
                beforeEnter(to, from, next) {
                    if (localStorage.getItem('token') === null) {
                        next({
                            path: '/',
                            params: {
                                nextUrl: to.fullPath
                            }
                        })
                    } else {
                        if (localStorage.getItem('level') !== "2") {
                            localStorage.clear();
                            next({
                                path: '/',
                                params: {
                                    nextUrl: to.fullPath
                                }
                            })
                        } else {
                            axios
                                .get(
                                    "https://www.api-fab-cds.rumahcomp.com/fab/api/auth/rolecheck", {
                                        headers: {
                                            token: localStorage.getItem('token'),
                                            nik: localStorage.getItem('nik')
                                        }
                                    }
                                )
                                .then(function(response) {
                                    if (response.data.status !== 1) {
                                        localStorage.clear();
                                        next({
                                            path: '/',
                                            params: {
                                                nextUrl: to.fullPath
                                            }
                                        })
                                    } else {
                                        if (response.data.data.level !== localStorage.getItem('level')) {
                                            localStorage.clear();
                                            next({
                                                path: '/',
                                                params: {
                                                    nextUrl: to.fullPath
                                                }
                                            })
                                        } else if (response.data.data.nik !== localStorage.getItem('nik')) {
                                            localStorage.clear();
                                            next({
                                                path: '/',
                                                params: {
                                                    nextUrl: to.fullPath
                                                }
                                            })
                                        } else {
                                            next()
                                        }
                                    }
                                })
                                .catch(function(error) {
                                    localStorage.clear();
                                    next({
                                        path: '/',
                                        params: {
                                            nextUrl: to.fullPath
                                        }
                                    })
                                });
                        }
                    }
                }
            }, {
                path: 'internalUsage',
                name: 'InternalUsage',
                component: InternalUsage,
                beforeEnter(to, from, next) {
                    if (localStorage.getItem('token') === null) {
                        next({
                            path: '/',
                            params: {
                                nextUrl: to.fullPath
                            }
                        })
                    } else {
                        if (localStorage.getItem('level') !== "2") {
                            localStorage.clear();
                            next({
                                path: '/',
                                params: {
                                    nextUrl: to.fullPath
                                }
                            })
                        } else {
                            axios
                                .get(
                                    "https://www.api-fab-cds.rumahcomp.com/fab/api/auth/rolecheck", {
                                        headers: {
                                            token: localStorage.getItem('token'),
                                            nik: localStorage.getItem('nik')
                                        }
                                    }
                                )
                                .then(function(response) {
                                    if (response.data.status !== 1) {
                                        localStorage.clear();
                                        next({
                                            path: '/',
                                            params: {
                                                nextUrl: to.fullPath
                                            }
                                        })
                                    } else {
                                        if (response.data.data.level !== localStorage.getItem('level')) {
                                            localStorage.clear();
                                            next({
                                                path: '/',
                                                params: {
                                                    nextUrl: to.fullPath
                                                }
                                            })
                                        } else if (response.data.data.nik !== localStorage.getItem('nik')) {
                                            localStorage.clear();
                                            next({
                                                path: '/',
                                                params: {
                                                    nextUrl: to.fullPath
                                                }
                                            })
                                        } else {
                                            next()
                                        }
                                    }
                                })
                                .catch(function(error) {
                                    localStorage.clear();
                                    next({
                                        path: '/',
                                        params: {
                                            nextUrl: to.fullPath
                                        }
                                    })
                                });
                        }
                    }
                }
            }
        ],
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token') === null) {
                next({
                    path: '/',
                    params: {
                        nextUrl: to.fullPath
                    }
                })
            } else {
                if (localStorage.getItem('level') !== "2") {
                    localStorage.clear();
                    next({
                        path: '/',
                        params: {
                            nextUrl: to.fullPath
                        }
                    })
                } else {
                    axios
                        .get(
                            "https://www.api-fab-cds.rumahcomp.com/fab/api/auth/rolecheck", {
                                headers: {
                                    token: localStorage.getItem('token'),
                                    nik: localStorage.getItem('nik')
                                }
                            }
                        )
                        .then(function(response) {
                            if (response.data.status !== 1) {
                                localStorage.clear();
                                next({
                                    path: '/',
                                    params: {
                                        nextUrl: to.fullPath
                                    }
                                })
                            } else {
                                if (response.data.data.level !== localStorage.getItem('level')) {
                                    localStorage.clear();
                                    next({
                                        path: '/',
                                        params: {
                                            nextUrl: to.fullPath
                                        }
                                    })
                                } else if (response.data.data.nik !== localStorage.getItem('nik')) {
                                    localStorage.clear();
                                    next({
                                        path: '/',
                                        params: {
                                            nextUrl: to.fullPath
                                        }
                                    })
                                } else {
                                    next()
                                }
                            }
                        })
                        .catch(function(error) {
                            localStorage.clear();
                            next({
                                path: '/',
                                params: {
                                    nextUrl: to.fullPath
                                }
                            })
                        });
                }
            }
        }
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue')
    },
    {
        path: '*',
        redirect: '/404'
    }
]

const session = Vue.prototype.$session;

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router