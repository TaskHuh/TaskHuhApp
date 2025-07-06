<script lang="ts">
    // this component will display a list of commands that match the input
    import type { CommandDefinition } from "$lib/commands/Commands";
    import { commands } from "$lib/commands/index";
    import type { ReminderService } from "$lib/services/reminders/ReminderService";

    // this service should be generic later
    let { inputValue, service } = $props<{ inputValue: string, service: ReminderService }>()
    console.log('service: ', service)
    let listedCommands = $state<CommandDefinition[]>([])

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Figure out why context.reminderService is undefined
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    const registeredCommands: CommandDefinition[] = commands

    $effect(() => {
        if (inputValue) {
            const newListedCommands: CommandDefinition[] = []
            registeredCommands.forEach(command => {
                if (command.name.includes(inputValue)) {
                    newListedCommands.push(command)
                }
            });
            listedCommands = newListedCommands
        } else {
            listedCommands = []
        }
    })

    // create a reminder by providing just the title and time
    async function createReminderByTitleAndTime(title: string, time: Date) {
        if (service) {
            let newReminderId = await service.getReminderCount() + 1
            let reminder = {
                id: newReminderId.toString(),
                title: title,
                time: time
            }
            let newReminder = await service.createReminder(reminder)
            return newReminder
        }
    }

    async function createReminderWrapper(command: CommandDefinition) {
        console.log('creating reminder...')
        let context = { reminderService: service }
        command.execute(command.args, context)
    }

</script>

{#if inputValue}
    <div>
        <h1>Command Selector</h1>
        <p>Input Value: {inputValue}</p>
    </div>
    {#if listedCommands.length > 0}
        {#each listedCommands as command}
            <button class="w-[90%] p-2 text-base rounded-md bg-[#2a2a2a] border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500" onclick={() => {createReminderWrapper(command)}}>{command.name}</button>
        {/each}
    {/if}
{/if}