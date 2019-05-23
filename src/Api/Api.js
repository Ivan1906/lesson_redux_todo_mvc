import uuid from 'uuid/v4';

const ERROR_MESSAGE = {
    ADD_TODO: 'Виникла помилка при добавлені todo',
    CHANGE_TYPE_TODO: 'Виникла помилка при зміні типу todo',
    DELETE_TODO: 'Виникла помилка при видалені todo'
}

export const Todos = {
    _todos: [],

    get Todos() {
        return this._todos;
    },

    addTodo(todo) {
        return new Promise((resolve, reject) => {
            let timeout = 1 + Math.round().toFixed(1)*10;
            
            setTimeout(() => {
                if (Boolean(+Math.random().toFixed())) {
                    todo.id = uuid();
                    this._todos.push();
                    resolve(todo);
                } else {
                    reject(new Error(ERROR_MESSAGE.ADD_TODO))
                }
            }, timeout);
        })
    },

    deleteTodo(id) {
        return new Promise((resolve, reject) => {
            let timeout = 1 + Math.round().toFixed(1)*10;
            
            setTimeout(() => {
                if (Boolean(+Math.random().toFixed())) {
                    todo.id = uuid();
                    this._todos.push();
                    resolve(todo);
                } else {
                    reject(new Error(ERROR_MESSAGE.ADD_TODO))
                }
            }, timeout);
        })
    },
}