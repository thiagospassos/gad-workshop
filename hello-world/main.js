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
        newTodoTitle: null,
        filters: ['All', 'Todo', 'Done'],
        activeFilter: 'All'
    },
    methods: {
        addTodo() {
            this.todos.push({
                id: this.nextId++,
                title: this.newTodoTitle,
                created: new Date(),
                done: false
            });
            this.newTodoTitle = ''
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