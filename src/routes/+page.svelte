<script lang="ts">
let name = $state('')
</script>

<main class="flex flex-col justify-center items-center w-dvw h-dvh bg-[#111111] text-white text-3xl">
  <h1>Welcome to Tauri + Svelte</h1>

  <div class="flex flex-row align-middle items-center gap-2 m-4">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="size-40" alt="Vite Logo" />
    </a>
    <a href="https://tauri.app" target="_blank">
      <img src="/tauri.svg" class="size-40" alt="Tauri Logo" />
    </a>
    <a href="https://kit.svelte.dev" target="_blank">
      <img src="/svelte.svg" class="size-40" alt="SvelteKit Logo" />
    </a>
  </div>
  <p>Click on the Tauri, Vite, and SvelteKit logos to learn more.</p>

  <form class="m-2 p-2 border-2 border-sky-400 rounded-xl" >
    <input class="focus:outline-none" placeholder="Enter a name..." bind:value={name}/>
  </form>
  <p>Hello {name}!</p>
</main>