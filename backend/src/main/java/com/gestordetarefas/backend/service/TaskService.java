package com.gestordetarefas.backend.service;

import com.gestordetarefas.backend.model.Task;
import com.gestordetarefas.backend.model.TaskStatus;
import java.util.List;

public interface TaskService {
    List<Task> getAllTasks();
    List<Task> getTasksByStatus(TaskStatus status);
    Task getTaskById(Long id);
    Task createTask(Task task);
    Task updateTask(Long id, Task taskDetails);
    void deleteTask(Long id);
}