const { createApp } = Vue

createApp({
    data() {
        return {
            tabs: [
                {id: 1, name: "Покупки", isActive: true, todoItems: 
                    [{id: 1, text: "Это test todo!", isChecked: true}, 
                    {id: 2, text: "Это второй test todo!", isChecked: true}, 
                    {id: 3, text: "Третий todo!", isChecked: false}] }, 
                    
                {id: 2, name: "Фигма", isActive: false, todoItems: []}, 
                {id: 3, name: "Ещё одна вкладка", isActive: false, todoItems: []}],

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
            this.tabs.forEach(tab => tab.isActive = false);
            this.tabs.push({id: 0, name: "[Новая вкладка]", isActive: true, todoItems: []})
        },
        changeTabName(tab, event) {
            tab.name = event.target.value;
        },
        changeTodoItemText(todoItem, newText) {
            todoItem.text = newText;
        },
        addTodoItem() {
            let tab = this.getSelectedTab();
            if (tab) {
                tab.todoItems.push({id: 0, text: this.newTodoItemText, isChecked: false});
                this.newTodoItemText = "";
            }
        },
        deleteTodoItem() {

        },
        deleteTab(tab) {
            for (let i = this.tabs.length - 1; i >= 0; i--) {
                let tabInArray = this.tabs[i];
                if (tabInArray.id == tab.id) {
                    this.tabs.splice(i, 1);
                    break;
                }
            }
        },
        markTodoItem(todoItem) {
            todoItem.isChecked = !todoItem.isChecked;
        }
    }
}).mount('#app')