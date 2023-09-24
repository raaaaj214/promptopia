import Navbar from "@components/navbar"
import Provider from "@components/Provider"
import "@styles/globals.css"


export const metadata = {
    title : 'Promptopia',
    description : 'Discover and Share AI Prompts '
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
          <Provider>
            <main className="app">
                <Navbar/>
              {children}</main>
              </Provider>
        </body>
    </html>
  )
}

export default RootLayout
