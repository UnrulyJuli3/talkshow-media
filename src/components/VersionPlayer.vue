<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    props: {
        audioPath: {
            type: String,
            required: true
        }
    },
    data(): {
        sound: HTMLAudioElement | null;
        loading: boolean;
        playing: boolean;
        error: boolean;
    } {
        return {
            sound: null,
            loading: false,
            playing: false,
            error: false
        };
    },
    methods: {
        async load() {
            if (this.loading) return;
            if (this.sound) throw new Error("Sound already loaded!");
            this.loading = true;
            this.sound = new Audio(this.audioPath);
            this.sound.addEventListener("error", () => this.error = true);
            this.sound.addEventListener("ended", () => this.playing = false);
            await new Promise(resolve => this.sound?.addEventListener("canplaythrough", resolve));
            this.loading = false;
        },
        play() {
            this.playing = true;
            this.sound!.play().catch(() => this.error = true);
        },
        stop() {
            this.playing = false;
            if (this.sound) {
                this.sound.pause();
                this.sound.currentTime = 0;
            }
        },
        async action() {
            if (this.loading || this.error) return;
            if (!this.sound) await this.load();
            if (!this.playing) this.play();
            else this.stop();
        }
    },
    unmounted() {
        this.stop();
    }
});
</script>

<template>
    <span v-if="error" class="me-1">
        <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="text-danger">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        </svg>
    </span>
    <a v-else class="text-decoration-none me-1" href="#" @click.prevent="action">
        <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="loading">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z" />
        </svg>
        <svg v-else-if="playing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
        </svg>
    </a>
</template>

<style scoped lang="scss">
svg {
    fill: currentColor;
    width: 22px;
    height: 22px;

    &.loading {
        animation: load-spin 0.4s linear infinite;

        @keyframes load-spin {
            0% {
                transform: none;
            }

            100% {
                transform: rotate(1turn);
            }
        }
    }
}
</style>