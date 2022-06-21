const { createApp } = Vue

createApp({
    data() {
        return {
            tabs: [{name: "Покупки", isActive: false }, {name: "Фигма", isActive: true }] 
        }
    }
}).mount('#app')