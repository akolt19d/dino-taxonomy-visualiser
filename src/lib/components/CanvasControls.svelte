<script lang="ts">
    import { increaseZoom, decreaseZoom, isMinZoom, isMaxZoom } from "$lib/stores/Zoom.svelte";
    import { isMoveMode, isSelectMode, setSelectMode, setMoveMode } from "$lib/stores/MouseMode.svelte";

    const btnClasses = "rounded bg-white aspect-square text-black transition hover:bg-gray-200 cursor-pointer"

    let isMove = $derived(isMoveMode())
    let isSelect = $derived(isSelectMode())

    let isMax = $derived(isMaxZoom())
    let isMin = $derived(isMinZoom())

    $effect(() => {
      window.onkeydown = watchKeys
      window.onwheel = watchWheel
    })

    function watchKeys(e: KeyboardEvent) {
      const { key, shiftKey } = e

      switch (key) {
        case "s":
          setSelectMode()
          break;
        case "m":
          setMoveMode()
          break;
        case "+":
          if (shiftKey)
            increaseZoom()
          break;
        case "-":
          if (shiftKey)
            decreaseZoom()
          break;
      }
    }

    function watchWheel(e: WheelEvent) {
      const { deltaY, shiftKey } = e

      if (!shiftKey)
        return

      switch (Math.sign(deltaY)) {
        case -1:
          increaseZoom()
          break;
        case 1:
          decreaseZoom()
          break;
        default:
          break;
      }
    }
</script>

<div class="absolute bottom-3 left-3 p-2 rounded z-10 flex items-center justify-center bg-black/30">
  <div class="flex flex-col items-center gap-2">
    <button
        class="{btnClasses} after:icon-[tabler--pointer] after:w-6 after:block after:m-auto {isSelect ? "btn-active" : ""}"
        aria-label="Select"
        onclick={setSelectMode}
        title="Select (S)"
    ></button>
    <button
        class="{btnClasses} after:icon-[tabler--arrows-move] after:w-6 after:block after:m-auto  {isMove ? "btn-active" : ""}"
        aria-label="Move"
        onclick={setMoveMode}
        title="Move (M)"
    ></button>
    <button
        class="{btnClasses} disabled:brightness-50"
        onclick={increaseZoom}
        disabled={isMax}
        title="Zoom In (Shift + Scroll up)"
    >
      +
    </button>
    <button
        class="{btnClasses} disabled:brightness-50"
        onclick={decreaseZoom}
        disabled={isMin}
        title="Zoom Out (Shift + Scroll down)"
    >
      -
    </button>
  </div>
</div>

<style>
  .btn-active {
    background-color: var(--color-teal-300) !important
  }
</style>