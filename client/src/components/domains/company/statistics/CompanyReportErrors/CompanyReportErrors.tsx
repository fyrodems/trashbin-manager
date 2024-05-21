import { Card, Divider, Result } from 'antd'
import styles from './CompanyReportErrors.module.scss'

export const CompanyReportErrors = () => {
  return (
    <>
      {/**
       *  !!!TODO
       * na póżniej, bo skupiamy się na wyglądzie :)))))
       *
       */}

      <Divider>Stan techniczny</Divider>
      <Card>
        <Result
          className={styles.resultWrapper}
          status="success"
          title={
            <div className={styles.resultTitle}>
              Wszystkie altany są sprawne
            </div>
          }
        />
      </Card>
    </>
  )
}
