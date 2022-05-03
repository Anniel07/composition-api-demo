// using routes

import { createWebHistory, createRouter } from "vue-router";


const routes = [
    {
        path: "/",
        name: "hello-world",
        component: () => import("../components/HelloWorld"),
        props: {msg: 'Welcome to Your Vue.js App'}
    },

    {
        path: "/todo",
        name: "todo",
        component: () => import("../components/todo/TodoCmp")
    },
    {
        path: "/movies",
        name: "movies.index",
        component: () => import("../components/movies/MoviesIndex")
    },
    {
        path: "/movies/create",
        name: "movies.create",
        component: () => import("../components/movies/MoviesCreate")
    },
    {
        path: "/movies/:id/edit",
        name: "movies.edit",
        component: () => import("../components/movies/MoviesEdit"),
        props: true
    },

    {
        path: "/stories",
        name: "stories.index",
        component: () => import("../components/stories/StoriesIndex")
    },
    {
        path: "/stories/create",
        name: "stories.create",
        component: () => import("../components/stories/StoriesCreate")
    },
    {
        path: "/stories/:id/edit",
        name: "stories.edit",
        component: () => import("../components/stories/StoriesEdit"),
        props: true
    },
    {
        path: "/stories/:id/details",
        name: "stories.details",
        component: () => import("../components/stories/StoriesDetails"),
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
