const { createApp } = Vue

createApp({
    data() {
        return {
            tabs: [
                {id: 1, name: "Покупки", isActive: true, todoItems: 
                    [{id: 1, text: "Это test todo!", isChecked: true}, 
                    {id: 2, text: "Это второй test todo!", isChecked: true}, 
                    {id: 3, text: "Третий todo!", isChecked: false}] }, 
                    
                {id: 2, name: "Фигма", isActive: false }, 
                {id: 3, name: "Ещё одна вкладка", isActive: false}] 
        }
    }
}).mount('#app')