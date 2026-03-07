<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import Squares from './Squares/Squares.vue';
    import SplitText from "./SplitText/SplitText.vue";
    import BlurText from './BlurText/BlurText.vue';
    import Button from './Button/Button.vue';
    import ShinyText from './ShinyText/ShinyText.vue';
    import { useHeader } from '../composables/useStrapiData';

    const { config: headerConfig } = useHeader();
    const router = useRouter();

    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };

    const scrollToContact = () => router.push('/#contato');
    const scrollToAbout = () => router.push('/#sobre');
</script>

<template>
    <div class="header-container">
        <div class="squares-background">
            <Squares 
                direction="diagonal"
                :speed="0.5"
                :squareSize="50"
                borderColor="rgb(30,30,30)"
                hoverFillColor="#0F4C5C"
            />
        </div>
        <div class="header-content">
            <div class="text-block">
                <div class="name-container">
                    <BlurText
                        :text="headerConfig.fullName"
                        class-name="name-paragraph"
                        :delay="100"
                        :threshold="0.1"
                        root-margin="0px"
                        :step-duration="0.35"
                        animate-by="words"
                        direction="top"
                        @animation-complete="handleAnimationComplete"
                    />
                    <BlurText
                        v-if="headerConfig.rotatingTexts.length"
                        :texts="headerConfig.rotatingTexts"
                        :delay="200"
                        :rotation-interval="4000"
                        :auto="true"
                        :loop="true"
                        class-name="text-2xl font-semibold text-left padding-0"
                        animate-by="words"
                        direction="top"
                        :threshold="0.1"
                        root-margin="0px"
                        :step-duration="0.35"
                        @animation-complete="handleAnimationComplete"
                        class="name-paragraph"
                    />
                </div>
                <SplitText
                    :text="headerConfig.mainTitle"
                    class-name="text-5xl font-bold"
                    :delay="40"
                    :duration="0.6"
                    ease="power3.out"
                    split-type="chars"
                    :from="{ opacity: 0, y: 40 }"
                    :to="{ opacity: 1, y: 0 }"
                    :threshold="0.1"
                    root-margin="-100px"
                    text-align="left"
                    @animation-complete="handleAnimationComplete"
                />
            </div>
            <SplitText
                v-if="headerConfig.subTitle"
                :text="headerConfig.subTitle"
                class-name="text-5xl font-semibold"
                :delay="80"
                :duration="0.6"
                ease="power3.out"
                split-type="chars"
                :from="{ opacity: 0, y: 40 }"
                :to="{ opacity: 1, y: 0 }"
                :threshold="0.1"
                root-margin="-100px"
                text-align="left"
                @animation-complete="handleAnimationComplete"
            />
            <SplitText
                :text="headerConfig.tagline"
                class-name="name-paragraph-split"
                :delay="20"
                :duration="0.6"
                ease="power3.out"
                split-type="chars"
                :from="{ opacity: 0, y: 40 }"
                :to="{ opacity: 1, y: 0 }"
                :threshold="0.1"
                root-margin="-100px"
                text-align="left"
                @animation-complete="handleAnimationComplete"
            />
            <div class="buttons-container">
                <template v-for="(btn, i) in headerConfig.buttons" :key="i">
                    <Button
                        v-if="btn.label.toUpperCase() === 'SAIBA MAIS'"
                        type="transparent"
                        shape="round"
                        class="header-button"
                        @click="scrollToAbout"
                    >
                        <ShinyText :disabled="false" :speed="5" :text="btn.label" />
                    </Button>
                    <Button
                        v-else-if="btn.label.toUpperCase().includes('CONTATO')"
                        type="color"
                        color="#0F4C5C"
                        shape="round"
                        class="header-button"
                        @click="scrollToContact"
                    >
                        {{ btn.label }}
                    </Button>
                    <Button
                        v-else
                        type="light"
                        shape="round"
                        class="header-button"
                    >
                        {{ btn.label }}
                    </Button>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header-container {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    min-height: 100vh;
    padding: 3em 5em 3em 5em;
    box-sizing: border-box;
    align-items: center;
    justify-content: flex-start;
    display: flex;
    z-index: 1;
    overflow: hidden;
    pointer-events: none;
}

.header-container > * {
    pointer-events: auto;
}

.squares-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
    pointer-events: auto;
}

.squares-background :deep(canvas) {
    width: 100% !important;
    height: 100% !important;
    min-width: 100% !important;
    min-height: 100% !important;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: auto;
}

.header-content {
    position: relative;
    z-index: 2;
    pointer-events: none;
    padding-left: 3em;
    padding-right: 3em;
    max-width: 100%;
    width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.header-content > * {
    pointer-events: auto;
    position: relative;
}

.text-block {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
}

.name-container {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: baseline;
    padding-bottom: 0.7rem;
    width: 100%;
    max-width: 100%;
}

.name-paragraph {
    font-size: 1.3rem;
    font-weight: 700;
    text-align: left;
    margin: 0;
    padding: 0;
    line-height: 1.5;
}

.name-container :deep(.blur-text) {
    margin: 0;
    padding: 0;
    line-height: 1.5;
    display: inline-flex;
    align-items: baseline;
    color: white;
}

.name-container :deep(.name-paragraph.blur-text) {
    color: white;
    font-size: 1.3rem;
    font-weight: 700;
    word-spacing: 0.01em;
    gap: 0.2em;
}

.name-container :deep(.name-paragraph.blur-text span) {
    margin-right: 0;
}

.name-container :deep(.name-paragraph-split.split-parent) {
    padding-top: 0;
}

.name-container :deep(.name-paragraph-split.split-parent > div),
.name-container :deep(.name-paragraph-split.split-parent .split-char),
.name-container :deep(.name-paragraph-split.split-parent .split-word),
.name-container :deep(.name-paragraph-split.split-parent .split-line) {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0;
    padding: 0;
    display: inline-block;
    vertical-align: baseline;
    word-spacing: 0.1px;
    color: white;
}

.name-paragraph-split {
    font-size: 1.3rem;
    font-weight: 700;
    text-align: left;
    margin: 0;
    padding: 0;
    padding-top: 0.7rem;
    line-height: 1.5;
}

.buttons-container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-top: 2rem;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    max-width: 100%;
}

.header-button {
    pointer-events: auto;
}

.header-content :deep(.name-paragraph-split.split-parent) {
    font-size: 0;
    line-height: 1.5;
    word-spacing: 0.5px;
    width: 100%;
    max-width: 100%;
}

.header-content :deep(.name-paragraph-split.split-parent > div),
.header-content :deep(.name-paragraph-split.split-parent .split-char),
.header-content :deep(.name-paragraph-split.split-parent .split-word),
.header-content :deep(.name-paragraph-split.split-parent .split-line) {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
    padding: 0;
    display: inline-block;
    vertical-align: baseline;
    word-spacing: 0.5px;

}
.header-content :deep(.split-parent) {
    font-size: 0;
    line-height: 1;
    font-weight: 700;
    letter-spacing: 10px;
    word-spacing: 10px;
    width: 100%;
    max-width: 100%;
}

.header-content :deep(.split-parent > div),
.header-content :deep(.split-parent .split-char),
.header-content :deep(.split-parent .split-word),
.header-content :deep(.split-parent .split-line) {
    font-size: 7rem;
    margin: 0;
    padding: 0;
    display: inline-block;
    vertical-align: baseline;
    letter-spacing: -0.01em;
    word-spacing: 0.3em;
    word-break: break-word;
    overflow-wrap: break-word;
}

.text-block :deep(.split-parent),
.text-block :deep(.split-parent > div),
.text-block :deep(.split-parent .split-char),
.text-block :deep(.split-parent .split-word),
.text-block :deep(.split-parent .split-line) {
    color: #0F4C5C;
}


@media (max-width: 1024px) {
    .header-container {
        padding: 5em 3em 2em 5em;
        align-items: flex-start;
        padding-top: 8em;
        min-height: 100vh;
        height: 100vh;
    }

    .header-content {
        padding-left: 3em !important;
        padding-right: 3em !important;
        width: 100%;
    }

    .name-paragraph {
        font-size: 1.1rem;
    }

    .name-container :deep(.blur-text) {
        font-size: 1.1rem !important;
    }

    .name-paragraph-split {
        font-size: 1.1rem;
    }

    .header-content :deep(.name-paragraph-split.split-parent > div),
    .header-content :deep(.name-paragraph-split.split-parent .split-char),
    .header-content :deep(.name-paragraph-split.split-parent .split-word),
    .header-content :deep(.name-paragraph-split.split-parent .split-line) {
        font-size: 1.1rem;
    }

    .header-content :deep(.split-parent > div),
    .header-content :deep(.split-parent .split-char),
    .header-content :deep(.split-parent .split-word),
    .header-content :deep(.split-parent .split-line) {
        font-size: 4rem;
    }

    .buttons-container {
        gap: 0.75rem;
        margin-top: 1.5rem;
    }

    .header-button {
        font-size: 0.9rem;
        padding: 0.65rem 1.3rem;
    }
}

@media (max-width: 768px) {
    .header-container {
        padding: 5em 2em 2em 4em;
        align-items: flex-start;
        padding-top: 7em;
        min-height: 100vh;
        height: 100vh;
    }

    .header-content {
        padding-left: 2.5em !important;
        padding-right: 2.5em !important;
        width: 100%;
    }

    .name-paragraph {
        font-size: 0.95rem;
    }

    .name-container :deep(.blur-text) {
        font-size: 0.95rem !important;
    }

    .name-paragraph-split {
        font-size: 0.95rem;
    }

    .header-content :deep(.name-paragraph-split.split-parent > div),
    .header-content :deep(.name-paragraph-split.split-parent .split-char),
    .header-content :deep(.name-paragraph-split.split-parent .split-word),
    .header-content :deep(.name-paragraph-split.split-parent .split-line) {
        font-size: 0.95rem;
    }

    .header-content :deep(.split-parent > div),
    .header-content :deep(.split-parent .split-char),
    .header-content :deep(.split-parent .split-word),
    .header-content :deep(.split-parent .split-line) {
        font-size: 3rem;
    }

    .buttons-container {
        gap: 0.6rem;
        margin-top: 1.5rem;
        flex-direction: column;
        align-items: flex-start;
    }

    .header-button {
        font-size: 0.85rem;
        padding: 0.6rem 1.2rem;
        width: 100%;
        max-width: 280px;
    }
}

@media (max-width: 640px) {
    .header-container {
        padding: 5em 2em 2em 3.5em;
        align-items: flex-start;
        padding-top: 7em;
        overflow-x: hidden;
        min-height: 100vh;
        height: 100vh;
    }

    .header-content {
        padding-left: 2em !important;
        padding-right: 2em !important;
        width: 100%;
    }

    .name-container {
        flex-direction: column;
        gap: 0.3rem;
        align-items: flex-start;
    }

    .name-paragraph {
        font-size: 0.85rem;
    }

    .name-container :deep(.blur-text) {
        font-size: 0.85rem !important;
    }

    .name-paragraph-split {
        font-size: 0.85rem;
    }

    .header-content :deep(.name-paragraph-split.split-parent > div),
    .header-content :deep(.name-paragraph-split.split-parent .split-char),
    .header-content :deep(.name-paragraph-split.split-parent .split-word),
    .header-content :deep(.name-paragraph-split.split-parent .split-line) {
        font-size: 0.85rem;
    }

    .header-content :deep(.split-parent > div),
    .header-content :deep(.split-parent .split-char),
    .header-content :deep(.split-parent .split-word),
    .header-content :deep(.split-parent .split-line) {
        font-size: 2rem;
    }

    .buttons-container {
        gap: 0.5rem;
        margin-top: 1.2rem;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
    }

    .header-button {
        font-size: 0.8rem;
        padding: 0.55rem 1rem;
        width: 100%;
        max-width: 260px;
    }
}

@media (max-width: 480px) {
    .header-container {
        padding: 4em 1em 1em 2em;
        align-items: flex-start;
        padding-top: 7em;
        overflow-x: hidden;
        min-height: 100vh;
        height: 100vh;
    }

    .header-content {
        padding-left: 1.5em !important;
        padding-right: 1.5em !important;
        width: 100%;
    }

    .name-container {
        flex-direction: column;
        gap: 0.2rem;
        align-items: flex-start;
    }

    .name-paragraph {
        font-size: 0.75rem;
    }

    .name-container :deep(.blur-text) {
        font-size: 0.75rem !important;
    }

    .name-paragraph-split {
        font-size: 0.75rem;
    }

    .header-content :deep(.name-paragraph-split.split-parent > div),
    .header-content :deep(.name-paragraph-split.split-parent .split-char),
    .header-content :deep(.name-paragraph-split.split-parent .split-word),
    .header-content :deep(.name-paragraph-split.split-parent .split-line) {
        font-size: 0.75rem;
    }

    .header-content :deep(.split-parent > div),
    .header-content :deep(.split-parent .split-char),
    .header-content :deep(.split-parent .split-word),
    .header-content :deep(.split-parent .split-line) {
        font-size: 1.5rem;
    }

    .buttons-container {
        gap: 0.4rem;
        margin-top: 1rem;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
    }

    .header-button {
        font-size: 0.75rem;
        padding: 0.5rem 0.9rem;
        width: 100%;
        max-width: 240px;
    }
}
</style>