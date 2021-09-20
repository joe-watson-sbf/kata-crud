package com.sofkau.todocrud.controller;

import com.sofkau.todocrud.domain.Todo;
import com.sofkau.todocrud.domain.TodoService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
public class TodoController {
    @Autowired
    private TodoService service;

    @GetMapping("/todos")
    public Iterable<Todo> list(){
        return service.list();
    }

    @PostMapping("/todo")
    public Todo save(@RequestBody Todo todo){
        return service.save(todo);
    }

    @PutMapping("/todo")
    public Todo update(@RequestBody Todo todo) throws NotFoundException {
        if(todo.getId()!=null){
            return service.save(todo);
        }
        throw new NotFoundException("No existe el id para actualizar!");
    }

    @DeleteMapping("/{id}/todo")
    public void deleteById(@PathVariable Long id){
        service.deleteById(id);
    }

    @GetMapping("/{id}/todo")
    public Todo getById(@PathVariable Long id){
        return service.getById(id);
    }
}

