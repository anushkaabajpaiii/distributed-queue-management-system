package com.queue.system.repository;

import com.queue.system.entity.QueueEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface QueueRepository extends JpaRepository<QueueEntry, UUID> {
}
