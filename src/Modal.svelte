<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
</script>


    <div class="modal-bg">
        <div class="modal">
            <button on:click={()=>{
                dispatch("close");
            }}>Close</button>
            <slot />
        </div>
    </div>

<style>
    .modal-bg {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        /* background-color: rgba(0, 0, 0, 0.5); */
        background: rgb(0, 0, 0, 0.8);
    }

    .modal {
        background: #fff;
        padding: 20px;
        border-radius: 15px;
    }
</style>
