import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import {
  type ActualYearGarbagesWeight,
  type MonthlyWeightsProps,
} from '@/components/domains/user/interfaces/userInterfaces'
import { circularMapStartingAtIndex } from '@/utils/functions'
import { currentMonthNumber, getPolishMonthName, months } from '@/utils/months'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Twoje śmieci',
    },
  },
}

export const UserReportYearlyGarbageChart: React.FC<MonthlyWeightsProps> = ({
  actualYearWeights,
}) => {
  const monthsInRightOrder = circularMapStartingAtIndex(
    months,
    currentMonthNumber + 1,
    (month) => month
  )

  const polishMonths = monthsInRightOrder.map((month) => {
    return getPolishMonthName(month)
  })

  const chartData = {
    labels: polishMonths,
    datasets: [
      {
        label: 'Papier',
        data: monthsInRightOrder.map(
          (label) =>
            actualYearWeights[label as keyof ActualYearGarbagesWeight].papier /
            1000
        ),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Bioodpady',
        data: monthsInRightOrder.map(
          (label) =>
            actualYearWeights[label as keyof ActualYearGarbagesWeight]
              .bioodpady / 1000
        ),
        backgroundColor: 'rgba(54, 162, 235, 1)',
      },
      {
        label: 'Metale i tworzywa',
        data: monthsInRightOrder.map(
          (label) =>
            actualYearWeights[label as keyof ActualYearGarbagesWeight]
              .metaleITworzywa / 1000
        ),
        backgroundColor: 'rgba(255, 206, 86, 1)',
      },
      {
        label: 'Szkło',
        data: monthsInRightOrder.map(
          (label) =>
            actualYearWeights[label as keyof ActualYearGarbagesWeight].szklo /
            1000
        ),
        backgroundColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Zmieszane',
        data: monthsInRightOrder.map(
          (label) =>
            actualYearWeights[label as keyof ActualYearGarbagesWeight]
              .zmieszane / 1000
        ),
        backgroundColor: 'rgba(153, 102, 255, 1)',
      },
    ],
  }

  return <Bar options={options} data={chartData} />
}
