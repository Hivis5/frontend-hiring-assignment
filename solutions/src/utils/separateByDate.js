export function separateByDate(appointments) {
    const appointmentsByDate = {};
    
    appointments.forEach(appointment => {
        const startTime = new Date(appointment.startTime);
        const dateKey = startTime.toDateString();
        
        if (!appointmentsByDate[dateKey]) {
            appointmentsByDate[dateKey] = [];
        }
        
        appointmentsByDate[dateKey].push(appointment);
    });
    
    return appointmentsByDate;
}