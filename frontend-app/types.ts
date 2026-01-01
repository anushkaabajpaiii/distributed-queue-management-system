
export enum ServiceType {
  DOCTOR = 'Doctor',
  BANK = 'Bank',
  VISA = 'Visa'
}

export enum AppointmentStatus {
  QUEUED = 'QUEUED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Appointment {
  id: string;
  userName: string;
  service: ServiceType;
  status: AppointmentStatus;
  timestamp: string;
  estimatedWaitMinutes: number;
}

export interface QueueStats {
  time: string;
  count: number;
}

export interface ServiceDistribution {
  name: string;
  value: number;
  color: string;
}
