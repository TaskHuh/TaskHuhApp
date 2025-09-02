<!-- inputSelector.svelte -->
<script lang="ts">
    import { commands } from "$lib/commands";
    import Date from "./args/date.svelte";
    import Text from "./args/text.svelte";
    import Choice from "./args/choice.svelte";
    
    function scrollOnFocus(node: HTMLElement) {
        const scroll = () => {
            setTimeout(() => {
                node.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 175); // this might need adjusting
        };

        scroll();

        node.addEventListener('focus', scroll);

        return {
            update() {
                scroll();
            },
            destroy() {
                node.removeEventListener('focus', scroll);
            }
        };
    }

    import { 
        type AnySelectableOption,
        type StringOption,
        createCommandOption,
        createArgumentOption,
        createStringOption,
        isCommandOption,
        isArgumentOption,
        isStringOption,

        type CommandContextOption,
    } from "$lib/selectableOption";
    import type { ReminderService } from "$lib/services/reminders/ReminderService";
    let currentSelectableOption = $state<AnySelectableOption | null>(null);
    let registeredOptions = $state<AnySelectableOption[]>([]);
    let listedOptions = $state<AnySelectableOption[]>([]);
    let lastSelectedOptions = $state<AnySelectableOption[]>([]);
    let commandContext = $state<CommandContextOption | null>(null);
    
    // Initialize command context
    const loadOptions = () => {
        const newOptions: CommandContextOption[] = commands.map(cmd => ({
            command: createCommandOption(cmd),
            arguments: cmd.args.map(arg => createArgumentOption(arg)) 
        }));

        registeredOptions = newOptions.map(ctx => ctx.command);
        listedOptions = [...registeredOptions];
        lastSelectedOptions = registeredOptions;
    }
    // init
    loadOptions()
    

    function selectOption(option: AnySelectableOption) {
        lastSelectedOptions = [...listedOptions];
        currentSelectableOption = option;

        if (isCommandOption(option)) {
            commandContext = { command: option, arguments: option.value.args.map(arg => createArgumentOption(arg)) }
            if (commandContext) {
                registeredOptions = commandContext.arguments;
                listedOptions = [...commandContext.arguments];
                inputValue = '';
            }
        }

        if (isArgumentOption(option)) {
            const parent = commandContext?.command
            console.log("Selected argument belongs to command:", parent?.value.name);

            registeredOptions = [];
            listedOptions = [];
            inputValue = '';
        }
    }


    function getOptionName(option: AnySelectableOption): string {
        if (isStringOption(option)) {
            return option.value;
        }
        return option.value.name
    }

    
    function getOptionType(option: AnySelectableOption): string {
        if (isCommandOption(option)) {
            return 'Command';
        } else if (isArgumentOption(option)) {
            return 'Argument';
        }
        return 'String';
    }

    function setOptionValue(option: AnySelectableOption, value: string) {
        console.log('current option:', currentSelectableOption?.value)
        if (value == '' && isArgumentOption(option)) {
            option!.value.value = '';
            listedOptions = lastSelectedOptions;
            currentSelectableOption = commandContext?.command!;
            return;
        }
        if (isArgumentOption(option)) {
            option.value.value = value;
            listedOptions = lastSelectedOptions;
            currentSelectableOption = commandContext?.command!;
        }
    }

    let { inputValue, serviceContext } = $props<{ 
        inputValue: string 
        serviceContext: ReminderService
    }>();

    $effect(() => {
        if (!inputValue) {
            listedOptions = [...registeredOptions];
            return;
        }

        const normalizedInput = inputValue.replace(/\s/g, '').toLowerCase();
        listedOptions = registeredOptions.filter(option => {
            const name = getOptionName(option).replace(/\s/g, '').toLowerCase();
            return name.includes(normalizedInput);
        });
    });
</script>

<div class="p-4 text-center gap-2 flex-shrink-0">
    {#if listedOptions.length > 0}
        <div class="flex flex-col items-center gap-4 mb-4 pt-2 overflow-y-auto max-h-[30vh]">
            <!-- display title -->
            {#if listedOptions.length > 1}
                <h1 class="text-2xl font-semibold mb-2"> 
                    {isCommandOption(listedOptions[0]) ? `${getOptionType(listedOptions[0])}s` : `Set ${getOptionName(commandContext?.command!)} Arguments`} 
                </h1>
            {/if}
            <!-- display selection options, these are usually commands or arguments for commands -->
            {#each listedOptions as option}
                <div class="flex flex-row items-center justify-center w-[90%] gap-2">
                    {#if isArgumentOption(option) && option.value.value}
                        <h1 class="text-sm"> {getOptionName(option)}: {option.value.value}</h1>
                        <button 
                            class="w-[40%] p-2 last:mb-2 text-base rounded-md bg-[#2a2a2a] border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            onclick={() => selectOption(option)}
                        >
                            Modify {getOptionName(option)}
                        </button>
                        <button
                            aria-label="Clear {getOptionName(option)}"
                            onclick={() => {setOptionValue(option, '')}}
                            class="cursor-pointer hover:bg-neutral-700 hover:rounded-lg p-2 hover:ring-2 hover:ring-red-700"
                        >
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="#666666" xmlns="http://www.w3.org/2000/svg" color="#666666" stroke-width="1.5" style="--darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color=""><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" fill="#666666" style="--darkreader-inline-fill: #666666;" data-darkreader-inline-fill=""></path><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9H20Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="--darkreader-inline-stroke: #666666;" data-darkreader-inline-stroke=""></path><path d="M21 6H15.375M3 6H8.625M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6H15.375" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="--darkreader-inline-stroke: #666666;" data-darkreader-inline-stroke=""></path></svg>
                        </button>
                    {:else}
                        <button 
                            class="w-full p-2 last:mb-2 text-base rounded-md bg-[#2a2a2a] border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500 "
                            onclick={() => selectOption(option)}
                        >
                            {isArgumentOption(option) && !option.value.value ? 'Set ' : ''} {getOptionName(option)}
                        </button>
                    {/if}
                </div>
            {/each}
            <!-- run command button -->
            {#if commandContext && listedOptions.length > 1 && isArgumentOption(listedOptions[0])}
                <button onclick={() => (commandContext!.command.value.execute(commandContext!.command.value.args,  {reminderService: serviceContext} ))} class="w-[70%] p-2 last:mb-2 text-base rounded-md bg-[#3a3a3a] border border-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-500"> Run {getOptionName(commandContext!.command)} </button>
            {/if}
        </div>
    {:else if listedOptions.length === 0 && currentSelectableOption}
    <!-- set option value, this is usually a command argument or string option -->
        <h1 class="text-xl mb-2">Set {getOptionName(currentSelectableOption)} Value</h1>
        <!-- if the option is an argument, display the appropriate input -->
        {#if isArgumentOption(currentSelectableOption)}
            {#if currentSelectableOption?.value.type === 'text'}
                <Text value={inputValue} placeholder="Type here..." />
            {/if}
            {#if currentSelectableOption?.value.type === 'radio'}
                <Choice value={inputValue} options={currentSelectableOption?.value.options!} />
            {/if}
            {#if currentSelectableOption?.value.type === 'datetime-local'}
                <Date value={inputValue} placeholder="Type here..." />
            {/if}
        {/if}
        <!-- fix this -->
        <button type="button" class="w-[90%] p-2 mt-4 text-base rounded-md bg-[#2a2a2a] border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500" onclick={() => setOptionValue(currentSelectableOption!, inputValue)}>Set Value</button>
    {:else}
        <h1 class="text-sm">Input Value: {inputValue}</h1>
    {/if}
</div>
