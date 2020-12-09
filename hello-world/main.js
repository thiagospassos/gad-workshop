Vue.component('remaining-items', {
    props: ["remaining"],
    template: `
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

Vue.component('add-item', {
    template: `
    <form class="mb-2" @submit.prevent="addTodo">
        <input type="text" class="form-control" v-model="newTodoTitle" />
      </form>
    `,
    data() {
        return {
            newTodoTitle: undefined
        }
    },
    methods: {
        addTodo() {
            this.$emit('added', this.newTodoTitle)
            this.newTodoTitle = undefined
        }
    }
})

var app = new Vue({
    el: "#app",
    data: {
        title: "GAD Solutions",
        todos: [
            { id: 1, title: 'Do this thing', done: true, created: new Date(2020, 12, 1) },
            { id: 2, title: 'Have Coffee', done: false, created: new Date() },
            { id: 3, title: 'Have Lunch', done: false, created: new Date() },
            { id: 4, title: 'Have a drink', done: false, created: new Date() }
        ],
        nextId: 5,
        filters: ['All', 'Todo', 'Done'],
        activeFilter: 'All'
    },
    methods: {
        addTodo(title) {
            this.todos.push({
                id: this.nextId++,
                title: title,
                created: new Date(),
                done: false
            });
        }
    },
    computed: {
        filteredTodos() {
            console.log('calculated')
            if (this.activeFilter == 'All') {
                return this.todos
            }
            if (this.activeFilter == 'Todo') {
                return this.todos.filter(d => !d.done)
            }
            if (this.activeFilter == 'Done') {
                return this.todos.filter(d => d.done)
            }

        }
    },
    created() {},
});