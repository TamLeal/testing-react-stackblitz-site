import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [filtro, setFiltro] = useState('todas');

  useEffect(() => {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
    setTarefas(tarefasSalvas);
  }, []);

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = (e) => {
    e.preventDefault();
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

  const tarefasFiltradas = tarefas.filter(tarefa => {
    if (filtro === 'ativas') return !tarefa.concluida;
    if (filtro === 'concluidas') return tarefa.concluida;
    return true;
  });

  return (
    <div className="app-background">
      <div className="app-container">
        <form className="input-container" onSubmit={adicionarTarefa}>
          <input 
            className="input"
            type="text" 
            value={novaTarefa} 
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="Nova tarefa"
          />
          <button type="submit" className="button add-button">Adicionar</button>
        </form>
        <h1 className="title">Lista de Tarefas</h1>
        <div className="filter-container">
          <button 
            className={`filter-button ${filtro === 'todas' ? 'active' : ''}`} 
            onClick={() => setFiltro('todas')}
          >
            Todas
          </button>
          <button 
            className={`filter-button ${filtro === 'ativas' ? 'active' : ''}`} 
            onClick={() => setFiltro('ativas')}
          >
            Ativas
          </button>
          <button 
            className={`filter-button ${filtro === 'concluidas' ? 'active' : ''}`} 
            onClick={() => setFiltro('concluidas')}
          >
            Concluídas
          </button>
        </div>
        <ul className="todo-list">
          {tarefasFiltradas.map(tarefa => (
            <li key={tarefa.id} className={`todo-item ${tarefa.concluida ? 'completed' : ''}`}>
              <span className="todo-text">{tarefa.texto}</span>
              <div className="button-group">
                <button 
                  className={`button status-button ${tarefa.concluida ? 'completed' : 'active'}`} 
                  onClick={() => alternarConcluida(tarefa.id)}
                >
                  {tarefa.concluida ? 'Reativar' : 'Concluir'}
                </button>
                <button className="button remove-button" onClick={() => removerTarefa(tarefa.id)}>Remover</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
