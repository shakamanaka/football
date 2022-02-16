<template>
<v-bottom-navigation @change="redirect" v-model="value" fixed shift id="navigation-bottom">
    <v-btn value='Index'>
        <span class="spacer">Home</span>

        <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn value='Teams'>
        <span class="spacer">Equipos</span>

        <v-icon>mdi-strategy</v-icon>
    </v-btn>
    <v-btn value='Players'>
        <span class="spacer">Jugadores</span>

        <v-icon>mdi-soccer</v-icon>
    </v-btn>

</v-bottom-navigation>
</template>

<script>
export default {
    data: () => ({
        value: 'Index',
        audio: require('../assets/siuu.mp3')
    }),

    computed: {},
    methods: {
        redirect() {
            var audio = new Audio(this.audio);
            audio.play();
            this.$router.push({
                name: this.value
            })
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
#navigation-bottom {
    height: auto !important;

}

.spacer {
    margin-top: 0.3rem;
}
</style>
