import './Formulario.css';
import React, { useState, useEffect } from "react";
import * as api from '../services/App'; 

const Formulario = () => {
  const [inputValue, setInputValue] = useState("");
  const [lista, setLista] = useState([]);
  const USUARIO = "selen";

    useEffect(() => {
    const inicializar = async () => {
      const existe = await api.existeUsuario(USUARIO);
      if (!existe) {
        await api.postUser(USUARIO);
      }
      obtenerYActualizarTareas();
    };
    inicializar();
  }, []);

  const obtenerYActualizarTareas = async () => {
    const tareasServidor = await api.getTodos();
    setLista(tareasServidor);
  };

  // POST y GET tareas
  const añadirTarea = async () => {
    if (inputValue.trim() !== "") {
      const resultado = await api.postTodo(inputValue);
      if (resultado) {
        await obtenerYActualizarTareas(); 
        setInputValue("");
      }
    }
  };

  //DELETE y GET tarea
  const eliminarTarea = async (id) => {
    const exito = await api.deleteTodo(id);
    if (exito) {
      await obtenerYActualizarTareas(); 
    }
  };

  //Limpiar tareas
  const eliminarTodasTareas = async () => {
    const exito = await api.deleteAllTodos();
    if (exito) {
      setLista([]);
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <label htmlFor="nombreInput" className="form-label">
          Crea tu lista debajo 
        </label>

        <ul className="list-group mb-3">          
          <li className="list-group-item p-0">
            <input
              type="text"
              className="form-control border-0"
              id="nombreInput"
              placeholder={lista.length === 0 ? "No hay tareas, añadir tareas" : "Ingrese una nueva tarea"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") añadirTarea();
              }}
            />
          </li>

          {lista.map((tarea) => (
            <li
              key={tarea.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {tarea.label}
              <i
                className="fa-solid fa-trash text-secondary delete-icon"
                style={{ cursor: 'pointer' }}
                onClick={() => eliminarTarea(tarea.id)}
              ></i>
            </li>
          ))}
        </ul>
        
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-success" onClick={añadirTarea}>
            Añadir Tarea
          </button>
          <button type="button" className="btn btn-danger" onClick={eliminarTodasTareas}>
            Eliminar Todas
          </button>
        </div>
        
        <div className="mt-3 text-muted small">
          {lista.length} {lista.length === 1 ? 'tarea pendiente' : 'tareas pendientes'}
        </div>
      </div>
    </div>
  );
};

export default Formulario;






