import HeaderBox from '@components/HeaderBox'
import RightSidebar from '@components/Sidebar/RightSidebar/RightSidebar'
import TotalBalanceBox from '@components/TotalBalanceBox'
import { getLoggedInUser } from '@lib/actions/user.action'

const Home = async () => {
  const loggedIn = await getLoggedInUser()

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.5}
            transactionCount={0}
          />
        </header>
        RECENT TRANSACTION
      </div>

      <RightSidebar
        user={loggedIn}
        transaction={[]}
        banks={[
          {
            currentBalance: 1032.39,
            accountNumber: '1234567890',
            bankName: 'Bank of America',
          },
          {
            currentBalance: 2000,
            accountNumber: '9876543210',
            bankName: 'Chase Bank',
          },
        ]}
      />
    </section>
  )
}

export default Home
