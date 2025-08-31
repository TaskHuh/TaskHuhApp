import type { CommandDefinition } from "./Commands";

export const createReminderCommand: CommandDefinition = {
    name: 'Create Reminder',
    description: 'Create a new reminder',
    args: [
        { name: 'Title', description: 'The title of the reminder', placeholder: 'Do chores', type: 'text', required: true, value: '' },
        { name: 'Time', description: 'The time of the reminder', placeholder: () => `${new Date(Date.now() + 5000)}`, type: 'datetime-local', required: true, value: '' },
    ],
    async execute(args = createReminderCommand.args, context) {
        // create the reminder using provided options, otherwise use default options provided by above placeholder values
        await context.reminderService.createReminder({
            id: String(await context.reminderService.getReminderCount().then(count => count + 1)),
            title: args[0].value || (args[0].placeholder as string),
            time: args[1].value ? new Date(args[1].value) : new Date((args[1].placeholder as () => string)())
        });
    }
}