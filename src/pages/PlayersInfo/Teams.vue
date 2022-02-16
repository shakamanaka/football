<template>
<v-card>
    <v-card-title>
        Equipos
        <v-spacer></v-spacer>
        <v-tooltip v-if="visualize" bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
                <v-text-field v-bind="attrs" v-on="on" v-on:blur="searchBlur" v-model="search" append-icon="mdi-magnify" label="Buscar Equipo" single-line hide-details>

                </v-text-field>
            </template>
            <span>Escribe y luego quita el foco</span>
        </v-tooltip>
        <v-text-field v-else v-on:blur="searchBlur" v-model="search" append-icon="mdi-magnify" label="Buscar Equipo" single-line hide-details>

        </v-text-field>
    </v-card-title>
    <template>
        <v-row>
            <v-expansion-panels inset>
                <v-expansion-panel v-for="(item,i) in panels" :key="i">
                    <v-expansion-panel-header>{{item.clave}}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-card @click="handleClick(jugador)" style="cursor:pointer;" v-for="(jugador,j) in item.valor" :key="j" max-width="344">
                            <v-card-text>
                                <div class="center-div ">

                                    <v-icon style="font-size:25vw;">mdi-account</v-icon>
                                </div>
                                <div class="center-div ">{{jugador.name}}</div>
                                <div class="center-div "> Rating: {{jugador.rating}}</div>
                                <div class="center-div "> Id Card: {{jugador.id_api}}</div>

                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
    </template>
    <div class="text-center pt-2 mt-2">
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
                            <div class="center-div w-50 h-50 text-ok">
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
            visualize: true,
            panels: []
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
            AxiosService.getPlayersByTeam({
                name: this.search,
                page: this.page
            }).then((response) => {
                let data = response.data;
                this.page = data.current_page;
                this.pageCount = data.last_page
                let objectClub = {

                }
                data.data.forEach((element) => {
                    console.log(element);
                    if (!objectClub[element.club]) {
                        objectClub[element.club] = [
                            element
                        ]
                    } else {
                        objectClub[element.club].push(element)
                    }
                })
                let answer = [];
                let keys = Object.keys(objectClub);

                for (let index = 0; index < keys.length; index++) {
                    answer.push({
                        clave: keys[index],
                        valor: objectClub[keys[index]]
                    })
                }
                this.panels = answer;
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

.v-expansion-panel-content__wrap {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}
.v-pagination {
    justify-content: end !important;
}

</style>
