<!-- inputSelector.svelte -->
<script lang="ts">
    import { commands } from "$lib/commands";
    import { 
        type AnySelectableOption,
        type StringOption,
        createCommandOption,
        createArgumentOption,
        createStringOption,
        isCommandOption,
        isArgumentOption,
        isStringOption
    } from "$lib/selectableOption";
    let currentSelectableOption = $state<AnySelectableOption | null>(null);
    let registeredOptions = $state<AnySelectableOption[]>([]);
    let listedOptions = $state<AnySelectableOption[]>([]);

    // Initialize with commands
    $effect(() => {
        const newOptions = commands.map(createCommandOption);
        registeredOptions = newOptions;
        listedOptions = [...newOptions];
    });

    function selectOption(option: AnySelectableOption) {
        currentSelectableOption = option;
        
        // If a command is selected, update options to show its arguments
        if (isCommandOption(option)) {
            const newOptions = option.value.args.map(createArgumentOption);
            registeredOptions = newOptions;
            listedOptions = [...newOptions];
            inputValue = '';
        }
    }

    function getOptionName(option: AnySelectableOption): string {
        if (isCommandOption(option) || isArgumentOption(option)) {
            return option.value.name;
        } else if (isStringOption(option)) {
            return option.value;
        }
        return '';
    }
    
    function getOptionType(option: AnySelectableOption): string {
        if (isCommandOption(option)) {
            return 'Command';
        } else if (isArgumentOption(option)) {
            return 'Argument';
        } else if (isStringOption(option)) {
            return 'String';
        }
        return '';
    }

    let { inputValue } = $props<{ 
        inputValue: string 
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

<div class="m-4 gap-2">
    {#if listedOptions.length > 0}
        <div class="flex flex-col items-center gap-4 mb-4 pt-2 overflow-y-auto max-h-[20vh]">
            <h1 class="text-2xl font-semibold mb-2">{getOptionType(listedOptions[0])}</h1>
            {#each listedOptions as option}
                <button 
                    class="w-[90%] p-2 last:mb-2 text-base rounded-md bg-[#2a2a2a] border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    onclick={() => selectOption(option)}
                >
                    {getOptionName(option)}
                </button>
            {/each}
        </div>
    {:else}
        <h1 class="text-sm">Input Value: {inputValue}</h1>
    {/if}
</div>
