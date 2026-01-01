package com.queue.system.controller;

import com.queue.system.entity.Appointment;
import com.queue.system.repository.AppointmentRepository;
import com.queue.system.service.QueueService;
import com.queue.system.service.QueueNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private QueueService queueService;

    @Autowired
    private QueueNotificationService notificationService;

    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        appointment.setAppointmentTime(LocalDateTime.now());
        appointment.setStatus("QUEUED");

        Appointment saved = appointmentRepository.save(appointment);

        queueService.addToQueue(saved.getId());
        notificationService.sendQueueUpdate("Added: " + saved.getId());

        return saved;
    }

    @GetMapping("/all")
    public List<Appointment> getAll() {
        return appointmentRepository.findAll();   // <- ERROR FIXED HERE
    }
}
