<script lang="ts">
    // this component will display a list of commands that match the input
    import type { CommandDefinition } from "$lib/commands/Commands";
    import { commands } from "$lib/commands/index";
    import type { ReminderService } from "$lib/services/reminders/ReminderService";
    import TextInput from "./argInput/text.svelte";
    import DateInput from "./argInput/date.svelte";
    import ChoiceInput from "./argInput/choice.svelte";

    // this service should be generic later
    let { inputValue, service, onCommandSelect } = $props<{ 
        inputValue: string, 
        service: ReminderService,
        onCommandSelect?: (command: CommandDefinition | null) => void
    }>()
    let listedCommands = $state<CommandDefinition[]>([])
    let selectedCommand = $state<CommandDefinition | null>(null)

    const registeredCommands: CommandDefinition[] = commands
    
    function selectCommand(command: CommandDefinition | null) {
        if (!command) {
            selectedCommand = null
            return
        }
        selectedCommand = command
        onCommandSelect?.(command)
    }

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

</script>

{#if inputValue}
    <div class ="m-4 gap-2">
        <!-- <h1 class="text-sm">Command Selector</h1> -->
        {#if selectedCommand == null}
            <h1 class="text-sm">Input Value: {inputValue}</h1>
        {:else}
            <div class="flex flex-row items-center justify-between w-full">
                <h1 class="text-sm m-1.5">Selected Command: {selectedCommand.name}</h1>
                <button class="m-1.5 p-1.5 bg-[#333] rounded-md cursor-pointer" aria-label="Clear selected command" onclick={() => {selectCommand(null)}}>
                    <!-- close icon -->
                    <svg width="24" height="24" viewBox="0 0 636.396 636.396" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g transform="matrix(0.707 0.707 -0.707 0.707 318.198 0)">
                            <path d="M68 0C85.6755 0 100 14.3245 100 32L100 418C100 435.676 85.6755 450 68 450L32 450C14.3245 450 0 435.676 0 418L0 32C0 14.3245 14.3245 0 32 0L68 0Z" fill="#FB2C36" transform="translate(175 0)" />
                            <path d="M68 0C85.6755 0 100 14.3245 100 32L100 418C100 435.676 85.6755 450 68 450L32 450C14.3245 450 0 435.676 0 418L0 32C0 14.3245 14.3245 0 32 0L68 0Z" fill="#FB2C36" transform="matrix(0 1 -1 0 450 175)" />
                        </g>
                    </svg>
                </button>
            </div>
        {/if}
    </div>
    {#if listedCommands.length > 0 && selectedCommand == null }
        <div class="flex flex-col items-center gap-4 mb-4 pt-2 overflow-y-auto max-h-[20vh]">
        {#each listedCommands as command}
            <button class="w-[90%] p-2 text-base rounded-md bg-[#2a2a2a] border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
             onclick={() => {selectCommand(command)}}>
                {command.name}
            </button>
        {/each}
        </div>
    {/if}
    <!-- this allows users to select command arguments -->
    {#if selectedCommand && selectedCommand.args.length > 0}
        <div class="flex flex-col z-50 items-center gap-4 mb-4 pt-2 overflow-y-auto max-h-[20vh]">
            <!-- list command args here -->
             <!-- should show name on left, description on right, and placeholder as a bg -->
              <!-- also have a X button to remove the arg/clear arg input -->
               <!-- also add a X button to clear the selected command -->
            {#each selectedCommand.args as arg}
                <div class="flex flex-row items-center gap-1 bg-[#2a2a2a] w-[95%] rounded-md">
                    <h1 class="text-sm m-2">{arg.name}</h1> 
                    <!-- set input arg type -->
                    {#if arg.type === 'text'}
                        <TextInput bind:value={arg.placeholder as string} placeholder={arg.placeholder as string} />
                    {:else if arg.type === 'datetime-local'}
                        <DateInput bind:value={arg.placeholder as string} placeholder={arg.placeholder as string} />
                    {:else if arg.type === 'radio'}
                        <ChoiceInput bind:value={arg.placeholder as string} options={arg.options as string[]} />
                    {:else}
                        <!-- fallback -->
                        <input type="text" class="w-[90%] p-2 text-base rounded-md bg-[#333] border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500" bind:value={arg.placeholder as string} />
                    {/if} 
                    <button class="m-2 p-3 bg-[#333] rounded-md cursor-pointer hover:bg-neutral-700 hover:ring-2 hover:ring-sky-500" aria-label="Edit argument value" onclick={() => {arg.placeholder = undefined}}>
                        <h1 class="text-sm">Edit</h1>
                    </button>
                </div>
            {/each}
        </div>
    {/if}
{/if}