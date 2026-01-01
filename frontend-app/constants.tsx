
import { ServiceType, AppointmentStatus, Appointment } from './types';

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: '41fd3a54-0393-48c4-b0c0-45b030fb441d',
    userName: 'Anushka',
    service: ServiceType.DOCTOR,
    status: AppointmentStatus.QUEUED,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    estimatedWaitMinutes: 25
  },
  {
    id: 'b2a1c8d4-5567-4e3a-921d-33a55b22c1e2',
    userName: 'Aiden Smith',
    service: ServiceType.DOCTOR,
    status: AppointmentStatus.QUEUED,
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    estimatedWaitMinutes: 15
  }
];

export const SERVICE_COLORS = {
  [ServiceType.DOCTOR]: '#3b82f6', // Blue
  [ServiceType.BANK]: '#10b981',   // Green
  [ServiceType.VISA]: '#f97316'    // Orange
};
