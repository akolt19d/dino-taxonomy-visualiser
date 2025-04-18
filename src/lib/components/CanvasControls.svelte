<script lang="ts">
    import { increaseZoom, decreaseZoom, isMinZoom, isMaxZoom } from "$lib/stores/Zoom.svelte";

    const btnClasses = "rounded bg-white px-3 aspect-square text-black transition hover:bg-gray-200 cursor-pointer"

    let isMax = $state(isMaxZoom())
    let isMin = $state(isMinZoom())

    $effect(() => {
        isMax = isMaxZoom()
        isMin = isMinZoom()
    })
</script>

<div class="absolute bottom-3 left-3 p-2 rounded z-10 flex items-center justify-center bg-black/30">
  <div class="flex flex-col items-center gap-2">
    <button
        class="{btnClasses}"
    >
      S
    </button>
    <button
        class="{btnClasses}"
    >
      G
    </button>
    <button
        class="{btnClasses} disabled:brightness-50"
        onclick={increaseZoom}
        disabled={isMax}
    >
      +
    </button>
    <button
        class="{btnClasses} disabled:brightness-50"
        onclick={decreaseZoom}
        disabled={isMin}
    >
      -
    </button>
  </div>

</div>