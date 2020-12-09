Vue.component('add-item', {
    template: `
    <form class="mb-2" @submit.prevent="addTodo">
        <input type="text" class="form-control" v-model="newtodoTitle">
    </form>
    `,
    data() {
        return {
            newtodoTitle:''
        }
    },
    methods:{
        addTodo() {
            this.$emit('added', this.newtodoTitle)
            this.newtodoTitle = ''
        }
    }
})

Vue.component('remaining-items', {
    props: ['remaining'],
    template:`
    <div
            class="alert alert-danger"
            v-if="remaining>10">
            You've got a long day ahead of you!!!
          </div>
          <div
            class="alert alert-secondary"
            v-else-if="remaining>0"
          >
            {{ remaining }} item(s) remaining.
          </div>
          <div class="alert alert-success" v-else>
            Hooray!!! You're all done, go to the beach!!!
          </div>
    `
})

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
        ],
        filters: ['All', 'Todo', 'Done'],
        activeFilter: 'All'
    },
    computed: {
        filteredTodos() {
            if (this.activeFilter == 'Todo') {
                return this.todos.filter(x => !x.done);
            } else if (this.activeFilter == 'Done') {
                return this.todos.filter(x => x.done);
            }

            return this.todos;
        }
    },
    methods: {
        addTodo(newtodoTitle) {
            var nextId = this.todos.length + 1
            this.todos.push({
                id: nextId,
                title: newtodoTitle,
                done: false,
                created: new Date(2020,1,1)
            })
        }
    },
})