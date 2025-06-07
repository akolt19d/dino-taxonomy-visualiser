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
    <div id="dino-info-wrapper" class="absolute top-0 right-0 p-2 overflow-hidden">
        <div transition:fly={{ x: 200, duration: 500 }} class="relative px-8 py-8 w-full h-full bg-neutral-900 border border-neutral-800 rounded-2xl">
            <button class="absolute right-4 top-2 text-xl cursor-pointer" onclick={handleClose}>X</button>
            <h1 class="italic text-2xl text-center">
                {dinosaur.name} {dinosaur.species}
            </h1>
            <img src={dinosaur.imgLink} alt={dinosaur.name} class="mb-8 mt-6 mx-auto">
            <table class="w-full text-center mb-4">
                <tbody>
                    <tr>
                        <th>Type</th>
                        <td>{dinosaur.type}</td>
                    </tr>
                    <tr>
                        <th>Diet</th>
                        <td>{dinosaur.diet}</td>
                    </tr>
                    <tr>
                        <th>Length</th>
                        <td>{dinosaur.length}</td>
                    </tr>
                    <tr>
                        <th>Time period</th>
                        <td>{dinosaur.period}</td>
                    </tr>
                    <tr>
                        <th>Lived in</th>
                        <td>{dinosaur.livedIn}</td>
                    </tr>
                    <tr>
                        <th>Named by</th>
                        <td>{dinosaur.namedBy}</td>
                    </tr>
                </tbody>
            </table>
            <span>
                Reference: 
                <a href={dinosaur.link} class=" text-sky-600 underline">{dinosaur.link}</a>
            </span>
        </div>
    </div>
{/if}

<style>
    th, td {
        border: 1px solid white;
    }
</style>