package com.gestordetarefas.backend.controller;

import com.gestordetarefas.backend.model.Task;
import com.gestordetarefas.backend.model.TaskStatus;
import com.gestordetarefas.backend.repository.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "https://localhost:3000")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepository;

    // Injeção de Dependências via Construtor
    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // Endpoint para obter todas as tarefas
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Endpoint para obter tarefas por estado (status)
    // Ex: GET /api/tasks/filter?status=EM_PROGRESSO
    @GetMapping("/filter")
    public List<Task> getTasksByStatus(@RequestParam TaskStatus status) {
        return taskRepository.findTasksByStatus(status);
    }

    // Endpoint para criar uma nova tarefa
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task savedTask = taskRepository.save(task);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    // Endpoint para obter uma tarefa específica pelo seu ID
    // Ex: GET /api/tasks/1
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id)
                .map(task -> new ResponseEntity<>(task, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Endpoint para atualizar uma tarefa existente
    // Ex: PUT /api/tasks/1
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        return taskRepository.findById(id)
                .map(existingTask -> {
                    existingTask.setTitle(taskDetails.getTitle());
                    existingTask.setStatus(taskDetails.getStatus());
                    Task updatedTask = taskRepository.save(existingTask);
                    return new ResponseEntity<>(updatedTask, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Endpoint para apagar uma tarefa
    // Ex: DELETE /api/tasks/1
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTask(@PathVariable Long id) {
        try {
            taskRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}