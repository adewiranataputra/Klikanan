<script>
import { Line } from 'vue-chartjs'
export default {
    extends: Line,
    props: ['chart'],
    data () {
      return {
        datacollection: {
          labels: this.chart.title,
          datasets: [
            {
              backgroundColor: ["#3a6351"],
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              data: this.chart.value
            }
          ]
        },
        options: {
          barRoundness:1,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: true
        }
      }
    },
    mounted () {
      this.renderChart(this.datacollection, this.options)
    }
}
</script>