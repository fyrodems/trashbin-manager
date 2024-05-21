import { Card, Divider } from 'antd'
import { CompanyProfileData } from '../../profile/CompanyProfileData/CompanyProfileData'
import { CompanyAddressPanel } from '../../profile/CompanyAddressesPanel/CompanyAddressesPanel'

// const editCompanyPINnumber = graphql(`
//   mutation CompanyPINUpdate($props: CompanyPINMutationProps!) {
//     company {
//       info {
//         pin(props: $props) {
//           status {
//             message
//           }
//         }
//       }
//     }
//   }
// `)

export const CompanyProfileView: React.FC = () => {
  return (
    <>
      <Divider>Twoje dane</Divider>
      <Card hoverable={false} style={{ width: '100%', marginBottom: '3rem' }}>
        <CompanyProfileData />
        <Divider />
        <CompanyAddressPanel />
      </Card>
    </>
  )
}
