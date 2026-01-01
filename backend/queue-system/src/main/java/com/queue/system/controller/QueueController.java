package com.queue.system.controller;

import com.queue.system.service.QueueNotificationService;
import com.queue.system.service.QueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/queue")
public class QueueController {

    @Autowired
    private QueueService queueService;

    @Autowired
    private QueueNotificationService notificationService;

    @PostMapping("/add/{appointmentId}")
    public Long addToQueue(@PathVariable UUID appointmentId) {
        Long pos = queueService.addToQueue(appointmentId);
        notificationService.sendQueueUpdate("Added: " + appointmentId);
        return pos;
    }

    @GetMapping("/next")
    public String next() {
        String next = queueService.nextInQueue();
        notificationService.sendQueueUpdate("Next: " + next);
        return next;
    }

    @GetMapping("/size")
    public Long size() {
        return queueService.queueSize();
    }

    @GetMapping("/all")
    public List<String> all() {
        return queueService.getQueueList();
    }

    @DeleteMapping("/clear")
    public String clearQueue() {
        queueService.clearQueue();
        notificationService.sendQueueUpdate("Queue Cleared");
        return "Queue cleared";
    }
}
