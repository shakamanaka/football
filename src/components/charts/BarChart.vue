<script>
import {
    HorizontalBar
} from "vue-chartjs";

export default {
    props: ["labels"],
    extends: HorizontalBar,
    methods: {
        render(array) {
            this.renderChart({
                labels: this.labels,
                datasets: [{
                    label: "Stats",
                    backgroundColor: "#f87979",
                    data: array
                }]
            }, {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: "Grafica"
                },
                scales: {
                    xAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            stepSize: 10,
                            max: 100
                        }
                    }]
                },
                indexAxis: 'y'

            });
        }
    }
};
</script>
