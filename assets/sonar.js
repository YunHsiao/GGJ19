const random = (min, max) => Math.random() * (max - min) + min;

cc.Class({
    extends: cc.Component,

    properties: {
        minInterval: 3,
        maxInterval: 6,
    },

    onLoad () {
        this.animation = this.getComponent(cc.Animation);
        this.animation.play();
        cc.director.once(cc.Director.EVENT_AFTER_UPDATE, () => this.animation.stop());
    },

    start () {
        this.nextWave = cc.director._totalFrames
            + random(this.minInterval, this.maxInterval) * 60;
    },
    
    update () {
        const t = cc.director._totalFrames;
        if (t < this.nextWave) return;
        this.nextWave = cc.director._totalFrames
            + random(this.minInterval, this.maxInterval) * 60;
        this.animation.play();
    },
});
