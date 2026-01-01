package com.queue.system.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

@Entity
@Data
public class QueueEntry {

    @Id
    @GeneratedValue
    private UUID id;

    private UUID appointmentId;
    private Long position;
    private String status;
}
