<script lang="ts">
    import { getSelectedDinosaur, clearSelectedDinosaur } from "$lib/stores/SelectedDinosaur.svelte";
    import { clearSelectedNode } from "$lib/DrawContent";
    import { fly } from "svelte/transition";

    let dinosaur: Dinosaur | undefined = $state(undefined)

    $effect(() => {
        dinosaur = getSelectedDinosaur()
        if(dinosaur)
            dinosaur.name = dinosaur.name[0].toUpperCase() + dinosaur.name.slice(1)
    })

    function handleClose() {
        clearSelectedDinosaur()
        clearSelectedNode()
    }
</script>

{#if dinosaur}
    <div id="dino-info-wrapper" class="absolute h-full top-0 right-0 p-2 overflow-hidden">
        <div transition:fly={{ x: 200, duration: 500 }} class="relative px-8 py-4 w-full h-full bg-neutral-900 border border-neutral-800 rounded-2xl">
            <button class="absolute right-4 top-1 text-xl cursor-pointer" onclick={handleClose}>X</button>
            <h1 class="italic text-2xl text-center">
                {dinosaur.name} {dinosaur.species}
            </h1>
            <img src={dinosaur.imgLink} alt={dinosaur.name} class="my-4">
            <ul>
                <li>diet: {dinosaur.diet}</li>
                <li>lived {dinosaur.period}</li>
            </ul>
        </div>
    </div>
{/if}