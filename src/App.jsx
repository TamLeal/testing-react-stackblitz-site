import React, { useState } from 'react';

function TodoApp() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      setTarefas([...tarefas, { id: Date.now(), texto: novaTarefa, concluida: false }]);
      setNovaTarefa('');
    }
  };

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  };

  const alternarConcluida = (id) => {
    setTarefas(tarefas.map(tarefa => 
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <div>
        <input 
          type="text" 
          value={novaTarefa} 
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id} style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}>
            <span onClick={() => alternarConcluida(tarefa.id)}>{tarefa.texto}</span>
            <button onClick={() => removerTarefa(tarefa.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;