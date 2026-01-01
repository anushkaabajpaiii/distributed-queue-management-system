package com.queue.system.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
public class Appointment {

    @Id
    @GeneratedValue
    private UUID id;

    private String userName;
    private String serviceType;
    private LocalDateTime appointmentTime;
    private String status;
}
