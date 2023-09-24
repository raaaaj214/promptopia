import "@styles/home.css"
import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="home">
      <h1 className="head-text">Discover & Share
      <br id="head-title-break"/>
      <span className="orange-gradient"> AI-Powered Prompts</span>
      </h1>
      <p className="head-p">Promptopia is an open-source AI prompting tool for modern world to discover,create and share creative prompts</p>
      <Feed/>
    </section>
  )
}

export default Home
