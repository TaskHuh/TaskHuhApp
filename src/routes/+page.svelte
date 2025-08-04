<script lang="ts">
	import type { CommandDefinition } from '$lib/commands/Commands';
	import { tick } from 'svelte';
	import CommandSelector from '../components/commandSelector.svelte';
	import Drawer from '../components/drawer.svelte';
	import type { PageProps } from './$types';
    import InputSelector from '../components/inputSelector.svelte';

    // the input value is created inside the drawer,
    // the value is then passed to the command selector
    // the command selector will allow the user to select a command and various flags for the command
    // the command selector will execute the command based on the flags and the provided values
    // the command should be temporarily displayed in the console but we'll implement displaying it in the UI later

    // the state and logic for *creating* a service should be contained in the root layout
    // all the state and and logic for *selecting and using* a command is in the commandSelector component
    // the selected command will be passed to the parent service to use the command
    // we can think of the commandSelector component as the builder for the command value
    let { outputValue = $bindable(), data }: { outputValue: CommandDefinition, data: PageProps } = $props()
    // the services are in the data object, its just built at runtime, see +layout.ts for more info
    // @ts-ignore
    let service = data.services.reminderService
	let commandDrawerOpen = $state(false)
	let drawerInput = $state<HTMLInputElement>()
    let inputValue = $state('create')
    
    async function openDrawer() {
        commandDrawerOpen = true
        await tick()
        drawerInput?.focus()
    }

    async function closeDrawer() {
        commandDrawerOpen = false
        await tick();
    }

</script>

<main class="flex flex-col items-center w-dvw h-dvh bg-[#111111] text-neutral-200 text-3xl">
  <button class="flex flex-row justify-center m-2 px-[20vw] py-2 w-80vw border-3 rounded-xl border-sky-700 drop-shadow-lg shadow-slate-500 bg-[#1f1f1f]">
    Reminders
  </button>

  <!-- floating new command button -->
   {#if !commandDrawerOpen}
    <button
        class="fixed bottom-4 right-4 z-50 w-14 h-14 bg-sky-500 text-white rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-sky-700 active:scale-95 transition-transform cursor-pointer text-center align-text-middle"
        aria-label="Add"
        onclick={openDrawer}
    >
    <svg width="30" height="30" viewBox="0 0 450 450" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M68 0C85.6755 0 100 14.3245 100 32L100 418C100 435.676 85.6755 450 68 450L32 450C14.3245 450 0 435.676 0 418L0 32C0 14.3245 14.3245 0 32 0L68 0Z" fill="#ECECEC" transform="translate(175 0)" />
          <path d="M68 0C85.6755 0 100 14.3245 100 32L100 418C100 435.676 85.6755 450 68 450L32 450C14.3245 450 0 435.676 0 418L0 32C0 14.3245 14.3245 0 32 0L68 0Z" fill="#ECECEC" transform="matrix(0 1 -1 0 450 175)" />
        </g>
      </svg>
    </button>
    {/if}

    
    <!-- command drawer -->
    <Drawer open={commandDrawerOpen} onClose={() => {commandDrawerOpen = false}}>
        <div class="flex flex-col h-full">
            <!-- command selector displays any available commands that match the input -->
            {#if inputValue}
                <div class="flex-1 overflow-y-auto">
                   <InputSelector {inputValue} />
                </div>
            {/if}
            
            <!-- input section  -->
             <!-- attempts to scroll down when input is focused -->
            <div class="p-4 text-center gap-2 flex-shrink-0">
                <input
                    bind:this={drawerInput}
                    bind:value={inputValue}
                    onfocus={() => {
                        setTimeout(() => {
                            window.scrollTo(0, document.body.scrollHeight);
                        }, 500); 
                    }}
                    type="text"
                    placeholder="Type here..."
                    class="w-[90%] p-2 text-base rounded-md bg-[#2a2a2a] border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
            </div>
        </div>
   </Drawer>
</main>
