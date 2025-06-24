package com.gestordetarefas.backend.repository;

import com.gestordetarefas.backend.model.Task;
import com.gestordetarefas.backend.model.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM Task t WHERE t.status = :status")
    List<Task> findTasksByStatus(@Param("status") TaskStatus status);
}
