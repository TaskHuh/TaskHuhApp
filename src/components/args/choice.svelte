<script lang="ts">
    export let value: string;
    export let options: string[] = [];
</script>

<select class="w-[90%] p-2 text-base rounded-md bg-[#333] border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500" bind:value>
    {#each options as opt}
      <option value={opt}>{opt}</option>
    {/each}
</select>