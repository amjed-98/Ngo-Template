import { type TypeOf } from 'yup'
import { donationSchema } from 'validation/schemas'
import { getStartDonationUrl } from 'api/postApiServices'
import { Footer, DonateForm, Navbar } from 'components'
import { Flex, SectionTitle } from 'components/common'
import { useAppSelector, useFormSubmit } from 'hooks'

type TFormSubmitData = TypeOf<typeof donationSchema>;

function Donate() {
  const ongId = useAppSelector((state) => state.ong.ongId) || ''

  const {
    submit, ...states
  } = useFormSubmit<TFormSubmitData, true>({ url: getStartDonationUrl(ongId), redirectPath: 'donate' })

  const handleSubmit = (values: TFormSubmitData) => {
    const donationInfo = { ...values, ong_id: ongId, }

    submit(donationInfo)
  }

  return (
    <>
      <Navbar />
      <Flex direction="column" textAlign="left">
        <SectionTitle fontSize={3}>Make a donation</SectionTitle>
        <DonateForm submitHandler={handleSubmit} states={states} />
      </Flex>
      <Footer />
    </>
  )
}

export default Donate
