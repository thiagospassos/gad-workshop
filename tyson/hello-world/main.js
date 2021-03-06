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
            <slot name="danger">You've got a long day ahead of you!!!</slot>
          </div>
          <div
            class="alert alert-secondary"
            v-else-if="remaining>0"
          >
            {{ remaining }} item(s) remaining.
          </div>
          <div class="alert alert-success" v-else>
            <slot name="success">Hooray!!! You're all done, go to the beach!!!</slot>
          </div>
    `
})

Vue.filter("friendly-date", (date, params) => {
    console.log('params', params)
    var diff = new Date() - date;
    if (diff < 1000) return "Just now";
    if (diff < 60000) return `${Math.floor(diff / 1000)} seconds ago`;
    if (diff < 60000 * 60) return `${Math.floor(diff / 60000)} minutes ago`;
    return "Too long ago";
});

const app = new Vue({
    el: '#myvue',
    data: {
        message: 'Tyson\'s TODO List',
        todos: [],
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
    filters: {
        formatDate(value, blah) {
            return value.getYear() + blah;
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
    created() {
        this.todos = [
            {id: 1, title:"have breakfast",done:false,created: new Date()},
            {id: 2, title:"go to work",done:false,created: new Date()},
            {id: 3, title:"get lots of money",done:true,created: new Date()},
            {id: 4, title:"kill all humans",done:false,created: new Date()},
            {id: 5, title:"save the planet",done:false,created: new Date(2010,1,1)},
        ];
    },
    mounted() {

    }
})