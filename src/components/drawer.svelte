<script lang="ts">
    export let open = false
    export let onClose = () => {}

</script>
{#if open}
    <button class="fixed inset-0 z-40 bg-black/30" aria-label="close commands drawer" onclick={onClose}></button>
{/if}
<div
    class={`fixed bottom-0 left-0 w-full bg-[#1f1f1f] text-white rounded-t-2xl shadow-xl transition-transform duration-300 ease-out z-40 
      ${open ? 'translate-y-0' : 'translate-y-full'}
    `}
  >
  <slot />
</div>