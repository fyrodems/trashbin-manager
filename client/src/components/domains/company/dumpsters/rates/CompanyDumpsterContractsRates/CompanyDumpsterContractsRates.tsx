import { Divider, Row, Col, Card } from 'antd'
import { CompanyDeleteRate } from '../CompanyDeleteRate/CompanyDeleteRate'
import { CompanyEditRate } from '../CompanyEditRate/CompanyEditRate'
import { type CompanyDumpsterContractsRatesProps } from './interfaces'
import { WasteTypeConstant } from '@/types/WasteType'

export const CompanyDumpsterContractsRates: React.FC<
  CompanyDumpsterContractsRatesProps
> = ({ rates, refetch }) => {
  return (
    <>
      {rates && rates.length > 0 ? (
        <>
          <Divider orientation="left" orientationMargin={0}>
            Stawki w umowie
          </Divider>
          <Row wrap gutter={[10, 10]}>
            {rates.map(
              (rate: {
                rate_ID: number
                rate_typeID: number
                rate_value: number
              }) => (
                <Col
                  span={
                    window.innerWidth < 710
                      ? 24
                      : window.innerWidth < 1024
                      ? 12
                      : 8
                  }
                  order={rate.rate_typeID}
                  key={rate.rate_ID}
                >
                  <Card size="small" hoverable style={{ width: 280 }}>
                    <Card.Meta
                      title={`
                        ${rate.rate_value.toFixed(2)} zł/kg`}
                      description={`${WasteTypeConstant[rate.rate_typeID]}`}
                    />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '20px 0 10px',
                      }}
                    >
                      <CompanyEditRate rateData={rate} refetch={refetch} />
                      <CompanyDeleteRate
                        rate_ID={rate.rate_ID}
                        refetch={refetch}
                      />
                    </div>
                  </Card>
                </Col>
              )
            )}
          </Row>
        </>
      ) : (
        <Divider orientation="left" orientationMargin={0}>
          Nie znaleziono stawek w umowie
        </Divider>
      )}
    </>
  )
}
