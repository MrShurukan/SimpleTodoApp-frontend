const { createApp } = Vue
const baseUrl = "http://localhost:5092";

createApp({
    created() {
        fetch(`${baseUrl}/Todo/TodoList`)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++)
                    data.isActive = false;

                data[0].isActive = true;

                this.tabs = data;
            })

    },
    data() {
        return {
            tabs: [],/*[
                {id: 1, name: "Покупки", isActive: true, todoItems: 
                    [{id: 1, text: "Это test todo!", isChecked: true}, 
                    {id: 2, text: "Это второй test todo!", isChecked: true}, 
                    {id: 3, text: "Третий todo!", isChecked: false}] }, 
                    
                {id: 2, name: "Фигма", isActive: false, todoItems: []}, 
                {id: 3, name: "Ещё одна вкладка", isActive: false, todoItems: []}],*/

            newTodoItemText: ""
        }
    },
    methods: {
        selectTab(tabId) {
            this.tabs.forEach(tab => {
                tab.isActive = false;
                if (tab.id == tabId) tab.isActive = true;
            });
        },
        getSelectedTab() {
            if (this.tabs.length == 0) return null;

            for (let tab of this.tabs)
                if (tab.isActive) return tab;
            
            if (tabs[0]) {
                tabs[0].isActive = true;
                return tabs[0];
            }

            return null;
        },
        addNewTab() {
            fetch(`${baseUrl}/Todo/Category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: "[Новая вкладка]"})
            })
            .then(response => {
                if (response.ok) {
                    response.text().then(idString => {
                        this.tabs.forEach(tab => tab.isActive = false);
                        this.tabs.push({id: +idString, name: "[Новая вкладка]", isActive: true, todoItems: []})
                    });
                }
            });
        },
        changeTabName(tab, event) {
            fetch(`${baseUrl}/Todo/Category`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": tab.id,
                    "name": event.target.value
                })
            })
            .then(response => {
                if (response.ok) {
                    tab.name = event.target.value;;
                }
            });
        },
        changeTodoItemText(todoItem, event) {
            fetch(`${baseUrl}/Todo/TodoItem`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": todoItem.id,
                    "text": event.target.value
                })
            })
            .then(response => {
                if (response.ok) {
                    todoItem.text = event.target.value;
                }
            });
        },
        addTodoItem() {
            let tab = this.getSelectedTab();
            if (tab) {
                fetch(`${baseUrl}/Todo/TodoItem`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        categoryId: tab.id,
                        "text": this.newTodoItemText
                    })
                })
                .then(response => {
                    if (response.ok) {
                        response.text().then(idString => {
                            tab.todoItems.push({id: +idString, text: this.newTodoItemText, isChecked: false});
                            this.newTodoItemText = "";
                        });
                    }
                });
            }
        },
        deleteTodoItem(todoItem) {
            let tab = this.getSelectedTab();
            if (tab) {
                fetch(`${baseUrl}/Todo/TodoItem?todoItemId=${todoItem.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    if (response.ok) {
                        for (let i = tab.todoItems.length - 1; i >= 0; i--) {
                            let todoItemInArray = tab.todoItems[i];
                            if (todoItemInArray.id == todoItem.id) {
                                tab.todoItems.splice(i, 1);
                                break;
                            }
                        }
                    }
                });
            }
        },
        deleteTab(tab) {
            fetch(`${baseUrl}/Todo/Category?categoryId=${tab.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (response.ok) {
                    for (let i = this.tabs.length - 1; i >= 0; i--) {
                        let tabInArray = this.tabs[i];
                        if (tabInArray.id == tab.id) {
                            this.tabs.splice(i, 1);
                            break;
                        }
                    }
                }
            });
        },
        markTodoItem(todoItem) {
            fetch(`${baseUrl}/Todo/MarkTodoItem?todoItemId=${todoItem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (response.ok) {
                    todoItem.isChecked = !todoItem.isChecked;
                }
            });
        }
    }
}).mount('#app')