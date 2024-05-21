import { Divider } from 'antd'
import { AdminOfficialsList } from '../officials/AdminOfficialsList/AdminOfficialsList'
import { AdminDumpstersList } from '../dumpsters/AdminDumpstersList/AdminDumpstersList'
import { AdminCardsOrders } from '../AdminCardsOrders/AdminCardsOrders'
import styles from './AdminView.module.scss'

export const AdminView: React.FC = () => {
  return (
    <main className={styles.adminView}>
      <div>
        <Divider>Wszyscy super urzędnicy</Divider>
        <AdminOfficialsList />
      </div>
      <div>
        <Divider>Wnioski o pakiety kart</Divider>
        <AdminCardsOrders />
      </div>
      <div>
        <Divider>Wszystkie śmietniki</Divider>
        <AdminDumpstersList />
      </div>
    </main>
  )
}
