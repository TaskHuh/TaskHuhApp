<script lang="ts">
	import { tick } from 'svelte'
  import Drawer from '../components/drawer.svelte';
	let commandDrawerOpen = false
	let drawerInput: HTMLInputElement

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

  <!-- Bottom Drawer -->
   <Drawer open={commandDrawerOpen} onClose={() => {commandDrawerOpen = false}} >
        <div class="p-4 text-center">
      <h1 class="text-2xl font-semibold mb-2">Commands</h1>
      <input
        bind:this={drawerInput}
        type="text"
        placeholder="Type here..."
        class="w-[90%] p-2 text-base rounded-md bg-[#2a2a2a] border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    </div>
   </Drawer>
</main>
