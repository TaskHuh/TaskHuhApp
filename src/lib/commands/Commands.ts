// a command is used to execute a function
// the main usecase is to build and execute a command to create a reminder
import type { ReminderService } from '$lib/services/reminders/ReminderService';

export interface CommandContext {
    reminderService: ReminderService;
    // list additional services here as necessary
}

// a single user filled option for a command
export interface CommandOption {
    name: string;
    description: string;
    required?: boolean;
    placeholder?: string | (() => string);
    type: 'string' | 'number' | 'boolean' | 'datetime';
}

// represents a complete command definition
export interface CommandDefinition {
    name: string;
    description: string;
    args: CommandOption[];

    // context allows switching service implementations
    execute: (
        options: Record<string, any>,
        context: CommandContext
    ) => Promise<void>
}
