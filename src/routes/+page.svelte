<script lang="ts">
	import type { CommandDefinition } from '$lib/commands/Commands';
	import { tick } from 'svelte';
	import CommandSelector from '../components/commandSelector.svelte';
	import Drawer from '../components/drawer.svelte';
	import type { PageProps } from './$types';

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

    // effect to list values in the console
    $effect(() => {
        console.log('commandDrawerOpen: ', commandDrawerOpen)
        console.log('inputValue: ', inputValue)
    })
    
    async function openDrawer() {
        commandDrawerOpen = true
        await tick() // wait for DOM to update
        drawerInput?.focus() // focus input after drawer is shown
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

  <!-- Floating Action Button -->
   {#if !commandDrawerOpen}
   <button
     class="fixed bottom-4 right-4 z-50 w-14 h-14 bg-sky-500 text-white rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-sky-700 active:scale-95 transition-transform cursor-pointer"
     aria-label="Add"
     onclick={openDrawer}
   >
     +
   </button>
    {/if}

   {#if inputValue}
        <CommandSelector inputValue={inputValue} {service} />
   {/if}

  <!-- Bottom Drawer -->
   <Drawer open={commandDrawerOpen} onClose={() => {commandDrawerOpen = false}} >
        <div class="p-4 text-center gap-2">
            <h1 class="text-2xl font-semibold mb-2">Commands</h1>
            <input
                bind:this={drawerInput}
                bind:value={inputValue}
                type="text"
                placeholder="Type here..."
                class="w-[90%] p-2 text-base rounded-md bg-[#2a2a2a] border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
        </div>
   </Drawer>
</main>
