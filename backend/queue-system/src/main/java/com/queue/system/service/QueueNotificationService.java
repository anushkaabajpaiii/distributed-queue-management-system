package com.queue.system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class QueueNotificationService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendQueueUpdate(Object payload) {
        System.out.println("🔥 Sending WebSocket Message: " + payload);
        messagingTemplate.convertAndSend("/topic/queue", payload);
    }
}
