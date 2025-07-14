<script lang="ts">
    // this component will display a list of commands that match the input
    import type { CommandDefinition } from "$lib/commands/Commands";
    import { commands } from "$lib/commands/index";
    import type { ReminderService } from "$lib/services/reminders/ReminderService";

    // this service should be generic later
    let { inputValue, service } = $props<{ inputValue: string, service: ReminderService }>()
    let listedCommands = $state<CommandDefinition[]>([])

    const registeredCommands: CommandDefinition[] = commands

    $effect(() => {
        // search through the commands to find any that match the user's inputValue
        if (inputValue) {
            const newListedCommands: CommandDefinition[] = []
            registeredCommands.forEach(command => {
                const normalizedCommandName = command.name.replace(/\s/g, '').toLowerCase();
                const normalizedInput = inputValue.replace(/\s/g, '').toLowerCase();
                if (normalizedCommandName.startsWith(normalizedInput)) {
                    newListedCommands.push(command);
                }
            });
            listedCommands = newListedCommands
        } else {
            listedCommands = []
        }
    })

    async function createReminderWrapper(command: CommandDefinition) {
        console.log('creating reminder...') // leave for debug
        let context = { reminderService: service }
        command.execute(command.args, context)
    }

</script>

{#if inputValue}
    <div class ="m-4 gap-2">
        <h1 class="text-sm">Command Selector</h1>
        <h1 class="text-sm">Input Value: {inputValue}</h1>
    </div>
    {#if listedCommands.length > 0}
        <div class="flex flex-col items-center gap-4 mt-4">
        {#each listedCommands as command}
            <button class="w-[90%] p-2 text-base rounded-md bg-[#2a2a2a] border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
             onclick={() => {createReminderWrapper(command)}}>
                {command.name}
            </button>
        {/each}
        </div>
    {/if}
{/if}