<script>

    import {score} from "./store.js";

    export let question;

    export let nextQuestion;
    export let addScore;

    let isCorrect;
    let isAnswered = false;

    let answers = question.incorrect_answers.map((answer) => {
        return {
            answer,
            correct: false,
        };
    });

    let allAnswers = [
        ...answers,
        {
            answer: question.correct_answer,
            correct: true,
        },
    ];

    shuffle(allAnswers);

    //  数组随机排序
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    //  判断答案
    function checkQuestion(correct) {
        if (!isAnswered) {
            isAnswered = true;
            isCorrect = correct;
            // 答对加分
            if (correct) {
                score.update((n) => n + 1);
            }
        }
    }
</script>

<h3>{@html question.question}</h3>

<!-- 答案提示对、错 -->
{#if isAnswered}
    <h5 class:isCorrect>
        {#if isCorrect} Correct! {:else} Wrong! {/if}
    </h5>
{/if}

<!-- 展示所有的答案 -->
{#each allAnswers as answer}
    <button disabled={isAnswered} on:click={() => checkQuestion(answer.correct)}>
        {@html answer.answer}
    </button>
{/each}

<!-- 下一题按钮 -->
{#if isAnswered}
    <button on:click={nextQuestion}> Next Question </button>
{/if}

<style>
    h4 {
        color: #00ff37;
        text-transform: uppercase;
        font-size: 2em;
        font-weight: 100;
    }

    h5 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 2em;
        font-weight: 100;
    }

    h5.isCorrect {
        color: #00ff37;
    }
</style>
