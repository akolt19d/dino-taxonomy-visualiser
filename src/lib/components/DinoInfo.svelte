<script lang="ts">
    import { getSelectedDinosaur } from "$lib/stores/SelectedDinosaur.svelte";

    let dinosaur: Dinosaur | undefined = $state(undefined)

    $effect(() => {
        dinosaur = getSelectedDinosaur()
    })
</script>

{#if dinosaur}
    <div class="absolute right-0 w-40 h-full bg-emerald-950">
        {dinosaur.name}
    </div>
{/if}