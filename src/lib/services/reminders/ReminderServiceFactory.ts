import { browser } from '$app/environment'
import { browserReminderService } from './BrowserReminderService'
import type { ReminderService } from './ReminderService'

// this factory is used to create a reminder service depending on the environment
export function createReminderService(): ReminderService | undefined {
    if (browser) {
        if ('__TAURI__' in window) {
            // TODO: implement tauri reminder service
            // For now, fall back to browser service
            console.log('Using browser reminder service as fallback for Tauri environment')
            return browserReminderService
        }

        return browserReminderService
    }

    throw new Error('Reminder service not available in this environment');
}