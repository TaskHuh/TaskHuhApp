import type { Reminder, ReminderService } from "./ReminderService";

// this browser reminder service is used to create reminders in the browser
// it implements the ReminderService interface
export const browserReminderService: ReminderService = {
    // create a new reminder
    async createReminder(reminder: Reminder): Promise<Reminder | undefined> {
        const delay = reminder.time.getTime() - Date.now()

        if (delay < 0) {
            console.warn("Reminder time is in the past")
            return undefined
        }

        setTimeout(() => {
            new Notification(`Reminder: ${reminder.title}`)
            console.log('Reminder completed: ', reminder)
        }, delay)
        // set the reminder in local storage
        localStorage.setItem(reminder.id, JSON.stringify(reminder))

        return reminder
    },

    // get a reminder from local storage
    async readReminder(id: string): Promise<Reminder | undefined> {
        const reminder = localStorage.getItem(id)
        console.log('Reading reminder... ', reminder)
        return reminder ? JSON.parse(reminder) : undefined
    },

    // update the reminder in local storage
    async updateReminder(reminder: Reminder): Promise<Reminder | undefined> {
        localStorage.setItem(reminder.id, JSON.stringify(reminder))
        return reminder
    },

    // delete the reminder from local storage
    async deleteReminder(id: string): Promise<void> {
        localStorage.removeItem(id)
    },

    // get all reminders from local storage
    async getReminders(): Promise<Reminder[]> {
        const reminders = localStorage.getItem('reminders')
        return reminders ? JSON.parse(reminders) : []
    },

    // get the number of reminders in local storage
    async getReminderCount(): Promise<number> {
        return localStorage.length
    }
}