import { exit } from '@tauri-apps/plugin-process';
import type { ReminderService } from '../lib/services/reminders/ReminderService';
import { createReminderService } from '../lib/services/reminders/ReminderServiceFactory';
import type { LayoutLoad } from './$types';
import "./app.css";
// Tauri doesn't have a Node.js server to do proper SSR
// so we will use adapter-static to prerender the app (SSG)
// See: https://v2.tauri.app/start/frontend/sveltekit/ for more info
export const prerender = true;
export const ssr = false;

// init the reminder service for the app
let reminderService: ReminderService | undefined

// ensure its created or panic
try {
    // create the reminder service
    reminderService = createReminderService()
    if (!reminderService) {
        throw new Error('Failed to create reminder service - got undefined')
    }
} catch (error) {
    console.error('Error creating reminder service:', error);
    exit(1)
}

// export the service to the app
// this is done at runtime, we load the above data and pass it to all the children pages to use as a data prop
export const load: LayoutLoad = () => {
    return {
        services: {
            reminderService: reminderService as ReminderService,
            myVal: "Hello, World!"
        }
    }
};
