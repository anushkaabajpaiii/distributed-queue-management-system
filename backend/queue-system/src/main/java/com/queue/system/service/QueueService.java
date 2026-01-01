package com.queue.system.service;

import com.queue.system.entity.QueueEntry;
import com.queue.system.repository.QueueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class QueueService {

    @Autowired
    private QueueRepository queueRepository;

    public Long addToQueue(UUID appointmentId) {

        long size = queueRepository.count();

        QueueEntry entry = new QueueEntry();
        entry.setAppointmentId(appointmentId);
        entry.setStatus("WAITING");
        entry.setPosition(size + 1);

        QueueEntry saved = queueRepository.save(entry);

        return saved.getPosition();
    }

    public String nextInQueue() {
        List<QueueEntry> all = queueRepository.findAll();

        if (all.isEmpty()) return null;

        QueueEntry first = all.get(0);
        queueRepository.delete(first);

        return first.getAppointmentId().toString();
    }

    public List<String> getQueueList() {
        return queueRepository.findAll()
                .stream()
                .map(e -> e.getAppointmentId().toString())
                .toList();
    }

    public Long queueSize() {
        return queueRepository.count();
    }

    public void clearQueue() {
        queueRepository.deleteAll();
    }
}
