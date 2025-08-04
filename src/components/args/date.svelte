<script lang="ts">
    export let value: string;
    export let placeholder: string;
</script>

<input
    class="w-[90%] p-2 text-base rounded-md bg-[#333] border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
    type="datetime-local"
    placeholder={placeholder}
    bind:value
/>
  