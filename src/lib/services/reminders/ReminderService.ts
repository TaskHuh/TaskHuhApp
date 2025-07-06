// TODO: add more properties for options
export interface Reminder {
    id: string
    title: string
    time: Date
}
// this generic interface is used to create a reminder service
export interface ReminderService {
    createReminder(reminder: Reminder): Promise<Reminder | undefined>
    readReminder(id: string): Promise<Reminder | undefined>
    updateReminder(reminder: Reminder): Promise<Reminder | undefined>
    deleteReminder(id: string): Promise<void>
    getReminders(): Promise<Reminder[]>
    getReminderCount(): Promise<number>
}