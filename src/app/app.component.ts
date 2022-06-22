import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  todos: Todo[] = [];

  form: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  constructor(
    private service: TodoService
  ){}

  ngOnInit(): void {
  }
  
  list(){
    this.service.list().subscribe(todoList => this.todos = todoList);
  }

  submit(){
    console.log(this.form.value)
    const todo: Todo = { ...this.form.value }
    this.service
      .save(todo)
      .subscribe(savedTodo => {
        this.todos.push(savedTodo);
        this.form.reset();
      });
  }

  delete(todo: Todo){
    this.service.delete(todo.id).subscribe({
      next: (response) => this.list()
    })
  }

  done(todo: Todo){
    this.service.done(todo.id).subscribe({
      next: (response) => {
        todo.done = response.done
        todo.doneDate = response.doneDate
      }
    })
  }

}
