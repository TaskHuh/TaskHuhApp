import type { CommandDefinition } from "./Commands";
import { createReminderCommand } from "./CreateReminder";

// this register contains all the commands in the app
export const commands: CommandDefinition[] = [
    createReminderCommand
]