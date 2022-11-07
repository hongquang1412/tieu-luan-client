import Header from '../header/Header'
function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default DefaultLayout
