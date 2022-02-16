<template>
<v-app>
    
    <v-main id="main-container">
        <router-view />
    </v-main>
    <SideBar>
    </SideBar>
</v-app>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
export default {
    name: 'App',

    data: () => ({
        //
    }),
    components: {
        SideBar
    },
};
</script>
<style >
#main-container {
  margin-bottom: 5rem;
}

.overflow {
    overflow: hidden;
    overflow-y: scroll;
}
.text-ok {
    align-items:start !important;
    word-break: break-all;
}
</style>
