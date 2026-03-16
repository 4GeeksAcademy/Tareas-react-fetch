const URL_API = 'https://playground.4geeks.com/todo';
const USUARIO = 'selen'; 

// Consulta si existe
export const existeUsuario = async (nombreUsuario) => {
    try {
        const response = await fetch(`${URL_API}/users`);
        if (!response.ok) throw new Error('Error al obtener la lista de usuarios');
        const data = await response.json();
        
        return data.users.some((user) => user.name === nombreUsuario);
    } catch (error) {
        console.error('Error al comprobar usuario:', error);
        return false;
    }
};

// Crear si no existe
export const postUser = async (nombreUsuario) => {
    try {
        const response = await fetch(`${URL_API}/users/${nombreUsuario}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        return response.ok;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return false;
    }
};

// consulta tareas
export const getTodos = async () => {
    try {
        const response = await fetch(`${URL_API}/users/${USUARIO}`);
        if (!response.ok) {            
            return [];
        }
        const data = await response.json();
        return data.todos; 
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        return [];
    }
};

// añadir tarea
export const postTodo = async (labelTarea) => {
    try {
        const response = await fetch(`${URL_API}/todos/${USUARIO}`, {
            method: 'POST',
            body: JSON.stringify({ 
                label: labelTarea, 
                is_done: false 
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Error al añadir tarea');
        return await response.json();
    } catch (error) {
        console.error('Error al añadir tarea:', error);
    }
};

// elimina tarea
export const deleteTodo = async (id) => {
    try {
        const response = await fetch(`${URL_API}/todos/${id}`, {
            method: 'DELETE',
        });
        return response.ok;
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        return false;
    }
};

// elimiar todas las tareas
export const deleteAllTodos = async () => {
    try {
        const todasLasTareas = await getTodos();       
        const promesasBorrado = todasLasTareas.map(tarea => 
            fetch(`${URL_API}/todos/${tarea.id}`, { method: 'DELETE' })
        );
        await Promise.all(promesasBorrado);
        return true;
    } catch (error) {
        console.error('Error al limpiar la lista:', error);
        return false;
    }
};
    