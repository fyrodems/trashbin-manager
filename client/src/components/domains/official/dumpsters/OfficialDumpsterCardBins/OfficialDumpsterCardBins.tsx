import { Progress } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import styles from './OfficialDumpsterCardBins.module.scss'
import { type DumpsterInfoType } from '@/gql/commonTypes'
import { WasteType } from '@/types/WasteType'

interface OfficialDumpsterCardBinsProps {
  dumpster: DumpsterInfoType
}

export const OfficialDumpsterCardBins: React.FC<
  OfficialDumpsterCardBinsProps
> = ({ dumpster }) => {
  const generateBins = (wasteType: WasteType, label: string) => {
    if (!dumpster.bins) return

    const fullBins = dumpster.bins.filter(
      (b: { dumpsterBin_typeID: WasteType; dumpsterBin_isFull: boolean }) =>
        b.dumpsterBin_typeID === wasteType && b.dumpsterBin_isFull
    ).length

    const totalBins = dumpster.bins.filter(
      (b: { dumpsterBin_typeID: WasteType }) =>
        b.dumpsterBin_typeID === wasteType
    ).length

    return (
      <div key={wasteType} className={styles.bin}>
        {totalBins > 0 ? (
          <Progress
            percent={Number((fullBins / totalBins).toFixed(2)) * 100}
            steps={totalBins}
            strokeColor={'#515151'}
            showInfo={false}
          />
        ) : (
          <CloseOutlined className={styles.noBinsIcon} />
        )}
        <span className={styles.wasteLabel}>{label}</span>
      </div>
    )
  }

  return (
    <div className={styles.binsWrapper}>
      {generateBins(WasteType.PAPER, 'Papier')}
      {generateBins(WasteType.BIO, 'Bioodpady')}
      {generateBins(
        WasteType.METALS_AND_PLASTICS,
        'Metale i tworzywa sztuczne'
      )}
      {generateBins(WasteType.GLASS, 'Szkło')}
      {generateBins(WasteType.MIXED, 'Zmieszane')}
    </div>
  )
}
