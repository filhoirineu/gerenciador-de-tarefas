import { Injectable } from '@angular/core';
import { Tarefa } from './';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private varLocalStorage: string = "tarefas";

  constructor() { }

  listarTodos(): Tarefa[] {
    const tarefas = localStorage[this.varLocalStorage];
    return tarefas ? JSON.parse(tarefas) : [];
  }

  cadastrar(tarefa: Tarefa): void {
    const tarefas = this.listarTodos();
    tarefa.id = new Date().getTime();
    tarefas.push(tarefa);
    localStorage[this.varLocalStorage] = JSON.stringify(tarefas);
  }

  buscarPorId(id: number): Tarefa {
    const tarefas: Tarefa[] = this.listarTodos();
    return tarefas.find(tarefa => tarefa.id === id);
  }

  atualizar(tarefa: Tarefa): void {

    const tarefas: Tarefa[] = this.listarTodos();
    tarefas.forEach(
      (obj, index, objs) => {
        if (tarefa.id === obj.id) {
          objs[index] = tarefa;
        }
      });
    localStorage.setItem(this.varLocalStorage, JSON.stringify(tarefas));

  }

  remover(id: number): void {
    let tarefas: Tarefa[] = this.listarTodos();
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    localStorage.setItem(this.varLocalStorage, JSON.stringify(tarefas));

  }

  alteraStatus(id: number): void {

    const tarefas: Tarefa[] = this.listarTodos();
    tarefas.forEach(
      (obj, index, objs) => {
        if (id === obj.id) {
          objs[index].concluida = !obj.concluida;
        }
      });
    localStorage.setItem(this.varLocalStorage, JSON.stringify(tarefas));

  }

}