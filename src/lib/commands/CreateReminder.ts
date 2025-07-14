import type { CommandDefinition } from "./Commands";

export const createReminderCommand: CommandDefinition = {
    name: 'Create Reminder',
    description: 'Create a new reminder',
    args: [
        { name: 'title', description: 'The title of the reminder', placeholder: 'Do chores', type: 'string', required: true },
        { name: 'time', description: 'The time of the reminder', placeholder: () => `${new Date(Date.now() + 5000)}`, type: 'datetime', required: true },
    ],
    async execute(options, context) {
        const { title, time } = options;
        // create the reminder using provided options, otherwise use default options provided by above placeholder values
        await context.reminderService.createReminder({
            id: String(await context.reminderService.getReminderCount().then(count => count + 1)),
            title: title || (createReminderCommand.args[0].placeholder as string),
            time: time ? new Date(time) : new Date((createReminderCommand.args[1].placeholder as () => string)())
        });
    }
}