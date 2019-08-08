<template>
    <v-btn tile @click="stateChange" :class="{waku: isBorder}">
        {{ favAmount }}
        <font-awesome-icon icon="heart" color="red"/>
    </v-btn>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Emit} from 'vue-property-decorator';
    @Component
    export default class AppGoodButton extends Vue {
        @Prop({required: true})
        public favAmount!: number;
        public isPushed: boolean = false;
        @Prop({ default: false })
        public isBorder!: boolean;

        stateChange() {
            this.isPushed ? this.favAmount-- : this.favAmount++;
            this.isPushed
                ? this.favUnPush(this.favAmount)
                : this.favPush(this.favAmount);
            this.isPushed = !this.isPushed;
        }
        @Emit()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        favPush(val: number) {
        }

        @Emit()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        favUnPush(val: number) {
        }
    }
</script>

<style>
    .waku{
        border: solid 2px #000000;
    }
</style>
