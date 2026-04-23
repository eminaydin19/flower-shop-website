// Minimalist Sound Manager for Luxurious UI Interactions
// Using a subtle, short synth sound encoded as Base64 to ensure immediate availability

const clickUrl = "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTdvT18AZHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwaHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwaHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHA==";

class SoundManager {
    constructor() {
        this.enabled = false;
        this.clickAudio = typeof Audio !== 'undefined' ? new Audio(clickUrl) : null;
        if (this.clickAudio) {
            this.clickAudio.volume = 0.2;
        }
    }

    enable() {
        this.enabled = true;
        // Interaction needed to unlock audio on browsers
        if (this.clickAudio) {
            this.clickAudio.play().then(() => {
                this.clickAudio.pause();
                this.clickAudio.currentTime = 0;
            }).catch(e => console.log("Audio unlock needed"));
        }
    }

    disable() {
        this.enabled = false;
    }

    playClick() {
        if (!this.enabled || !this.clickAudio) return;
        this.clickAudio.currentTime = 0;
        this.clickAudio.play().catch(e => {});
    }
}

export const soundManager = new SoundManager();
