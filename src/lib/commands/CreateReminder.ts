import type { CommandDefinition } from "./Commands";

export const createReminderCommand: CommandDefinition = {
    name: 'Create Reminder',
    description: 'Create a new reminder',
    args: [
        { name: 'Title', description: 'The title of the reminder', placeholder: 'Do chores', type: 'text', required: true },
        { name: 'Time', description: 'The time of the reminder', placeholder: () => `${new Date(Date.now() + 5000)}`, type: 'datetime-local', required: true },
    ],
    async execute(options, context) {
        const { Title, Time } = options;
        // create the reminder using provided options, otherwise use default options provided by above placeholder values
        await context.reminderService.createReminder({
            id: String(await context.reminderService.getReminderCount().then(count => count + 1)),
            title: Title || (createReminderCommand.args[0].placeholder as string),
            time: Time ? new Date(Time) : new Date((createReminderCommand.args[1].placeholder as () => string)())
        });
    }
}