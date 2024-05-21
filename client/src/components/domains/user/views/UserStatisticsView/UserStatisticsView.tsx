import { Tabs } from 'antd'
import { YearlyStatistics } from '../../statistics/YearlyStatistics/YearlyStatistics'
import { PeriodStatistics } from '../../statistics/PeriodStatistics/PeriodStatistics'
import styles from './UserStatisticsView.module.scss'

export const UserStatisticsView: React.FC = () => {
  return (
    <Tabs
      centered
      defaultActiveKey="1"
      items={[
        {
          key: '1',
          label: 'Statystyki roczne',
          children: <YearlyStatistics />,
        },
        {
          key: '2',
          label: 'Statystyki z wybranego zakresu',
          children: (
            <>
              <div className={styles.chartWrapper}>
                <PeriodStatistics />
              </div>
            </>
          ),
        },
      ]}
    />
  )
}
