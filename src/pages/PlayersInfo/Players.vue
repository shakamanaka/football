<template>
<v-card>
    <v-card-title>
        Jugadores
        <v-sheet class="pa-5">
            <v-switch v-model="switch1" inset :label="`Orden: ${switch1? 'Descendente': 'Ascendente'}`"></v-switch>
           
        </v-sheet>
        <v-spacer></v-spacer>
        <v-tooltip v-if="visualize" bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
                <v-text-field v-bind="attrs" v-on="on" v-on:blur="searchBlur" v-model="search" append-icon="mdi-magnify" label="Buscar Jugador" single-line hide-details>

                </v-text-field>
            </template>
            <span>Escribe y luego quita el foco</span>
        </v-tooltip>
        <v-text-field v-else v-on:blur="searchBlur" v-model="search" append-icon="mdi-magnify" label="Buscar Jugador" single-line hide-details>

        </v-text-field>
    </v-card-title>
    <v-data-table :item-class="rowClass" @click:row="handleClick" class="elevation-1" :page.sync="page" hide-default-footer :items-per-page="10" :headers="headers" :items="items">
    </v-data-table>
    <div class="text-center pt-2">
        <v-pagination :total-visible="5" @input="searchByPage()" v-model="page" :length="pageCount"></v-pagination>
    </div>

    <template>
        <div class="text-center">
            <v-dialog v-model="dialog">
                <v-card>
                    <div class="d-flex w-100">

                        <BarChart class="w-50" :labels="labels" ref="BarChart" />
                        <div class="center-div w-50 overflow">
                            <div class="center-div w-50 h-50">

                                <v-icon style="font-size:25vw;">mdi-account</v-icon>
                            </div>
                            <div class="center-div w-50 h-50 text-ok" >
                                <p class="w-100">
                                    Nombre: {{nombre}}
                                </p>
                                <p class="w-100">
                                    Club: {{equipo}}
                                </p>
                                <p class="w-100">
                                    Nacion: {{nacion}}
                                </p>
                                <p class="w-100">
                                    Posicion: {{posicion}}
                                </p>
                                <p class="w-100">
                                    Rating: {{rating}}
                                </p>

                            </div>
                        </div>
                    </div>
                </v-card>
            </v-dialog>
        </div>
    </template>

</v-card>
</template>

<script>
import AxiosService from '@/services/AxiosService.js'
import BarChart from "@/components/charts/BarChart.vue"
export default {
    name: "Players",
    components: {

        BarChart
    },
    data() {
        return {
            search: '',
            headers: [{
                    text: 'Nacion',
                    value: 'nation',
                },
                {
                    text: 'Posicion',
                    value: 'position'
                },
                {
                    text: 'Nombre',
                    value: 'name'
                },

                {
                    text: 'Club',
                    value: 'club'
                },
                {
                    text: 'League ID',
                    value: 'id_api'
                }
            ],
            switch1: false,
            items: [],
            page: 1,
            pageCount: 0,
            searchTemp: '',
            labels: [
                'pac',
                'sho',
                'pas',
                'dri',
                'def',
                'phy',
            ],
            nombre: '',
            equipo: '',
            nacion: '',
            posicion: '',
            rating: '',
            dialog: false,
            visualize: true
        }
    },
    created() {
        this.searchByPage();
    },
    mounted() {
    },
    methods: {
        searchByPage() {
            this.searchTemp = this.search
            this.items = []
            AxiosService.getPlayers({
                search: this.search,
                page: this.page,
                order: this.switch1? 'desc' : 'asc'
            }).then((response) => {
                let data = response.data;
                this.page = data.current_page;
                this.pageCount = data.last_page
                data.data.forEach((element) => {
                    element.color = false;
                    this.items.push(element);
                })
            })
        },
        searchBlur() {
            this.visualize = false
            if (this.search != this.searchTemp) {
                this.searchTemp = this.search;
                this.page = 1;
                this.searchByPage();
            }
        },
        async handleClick(item) {
            await this.openDialog();
            this.items.forEach((element) => {
                element.color = false
            })
            this.equipo = item.club
            this.nombre = item.firstName + ' ' + item.lastName
            this.nacion = item.nation
            this.posicion = item.positionFull
            this.rating = item.rating
            item.color = true
            let arr = [
                item.stat_pac,
                item.stat_sho,
                item.stat_pas,
                item.stat_dri,
                item.stat_def,
                item.stat_phy,
            ]

            this.$refs.BarChart.render(arr);
        },
        openDialog() {
            this.dialog = true;
        },
        rowClass(item) {
            return item.color ? " light-blue lighten-4" : '';
        }
    }
}
</script>

<style>
.center-div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
}

.d-flex {
    display: flex;
}

.w-50 {
    width: 50%;
}

.w-100 {
    width: 100%;
}

.h-50 {
    height: 50%;
}
</style>
