const app = new Vue({
    el: '#myvue',
    data: {
        message: 'Tyson\'s TODO List',
        todos: [
            {id: 1, title:"have breakfast",done:false,created: new Date(2010,1,1)},
            {id: 2, title:"go to work",done:false,created: new Date(2010,1,1)},
            {id: 3, title:"get lots of money",done:true,created: new Date(2010,1,1)},
            {id: 4, title:"kill all humans",done:false,created: new Date(2010,1,1)},
            {id: 5, title:"save the planet",done:false,created: new Date(2010,1,1)},
        ]
    }
})