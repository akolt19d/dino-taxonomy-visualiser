<script lang="ts">
    import { getSelectedDinosaur } from "$lib/stores/SelectedDinosaur.svelte";
    import { fly } from "svelte/transition";

    let dinosaur: Dinosaur | undefined = $state(undefined)

    $effect(() => {
        dinosaur = getSelectedDinosaur()
        if(dinosaur)
            dinosaur.name = dinosaur.name[0].toUpperCase() + dinosaur.name.slice(1)
    })
</script>

{#if dinosaur}
    <div id="dino-info-wrapper" class="absolute h-full top-0 right-0 p-2 overflow-hidden">
        <div transition:fly={{ x: 200, duration: 500 }} class="relative px-8 py-4 w-full h-full bg-emerald-950">
            <i>
                {dinosaur.name} {dinosaur.species}
            </i>
            <img src={dinosaur.imgLink} alt={dinosaur.name}>
            <ul>
                <li>diet: {dinosaur.diet}</li>
                <li>lived {dinosaur.period}</li>
            </ul>
        </div>
    </div>
{/if}