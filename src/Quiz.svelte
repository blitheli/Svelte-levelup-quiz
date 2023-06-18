<script>
    import Modal from "./Modal.svelte";
    import { fade, fly } from "svelte/transition";
    import Question from "./Question.svelte";
    import { onMount, beforeUpdate, afterUpdate } from "svelte";
    import {Score, score} from './store.js';

    onMount(() => {
        console.log("onMount");
    });

    beforeUpdate(() => {
        console.log("beforeUpdate");
    });

    afterUpdate(() => {
        console.log("afterUpdate");
    });

    let activeQuestion = 0;

    let isModalOpen = false;

    let quiz = getQuiz();

    async function getQuiz() {
        const res = await fetch(
            "https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple"
        );
        const data = await res.json();
        //debugger;
        console.log(data);
        return data;
    }

    //  下一题
    function nextQuestion() {
        activeQuestion++;
    }

    //  重置
    function resetQuiz() {
        isModalOpen = false;
        activeQuestion = 0;
        score.set(0);
        quiz = getQuiz();
    }

    $: if ($score > 1) {
        isModalOpen = true;
    }
</script>

<div>
    <button on:click|once={resetQuiz}>Start New Questions</button>

    <h3>My Score: {$score}</h3>
    <h4>Question# {activeQuestion + 1}</h4>

    <!-- 展示所有的问题 -->
    {#await quiz}
        Loading...
    {:then data}
        {#each data.results as question, index}
            {#if index === activeQuestion}
                <!-- fly in , out: -->
                <div in:fly={{ x: 100 }} out:fly={{ x: -200 }}>
                    <Question {nextQuestion} {question} />
                </div>
            {/if}
        {/each}
    {/await}

    <!-- 成功时，弹出覆盖页面, 关闭时，重新设置 -->
    {#if isModalOpen}
        <Modal on:close={resetQuiz}>    
            <h2>You Won!</h2>
            <p>Congratulations!</p>
            <button on:click={resetQuiz}>Start Over</button>
        </Modal>
    {/if}
</div>

<style>
    h4 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 2em;
        font-weight: 100;
    }
</style>
