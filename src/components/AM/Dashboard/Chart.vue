<script>
import { Bar } from 'vue-chartjs'
export default {
    extends: Bar,
    props: {
      chart: {
        type: Object,
			  required: true
      },
    },
    data () {
      return {
        datacollection: {
          labels: this.chart.title,
          datasets: [
            {
              backgroundColor: ["#FD0333", "#F8C310", "#43DEFA", "#43FAD0", "#05F821", "#02AC16"],
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
              },
              ticks: {
                fontColor: ["#FD0333", "#F8C310", "#43DEFA", "#43FAD0", "#05F821", "#02AC16"]
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