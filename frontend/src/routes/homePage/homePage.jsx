import {useGSAP} from "@gsap/react"
import gsap from "gsap";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
function HomePage() {
  useGSAP(()=>{
    const tml = gsap.timeline();
    tml.fromTo(".title",{
      y:600,
      opacity:0
    },{
      y:0,
      opacity:1,
      duration:1.5
    })
    tml.fromTo("#para",{
      opacity:0
    },{
      opacity:1,
      ease:"linear",
      duration:1.5
    })
    gsap.fromTo(".search",{
      y:-600,
      opacity:0

    },{
      y:0,
      duration:1.5,
      opacity:1
    })
  },[])
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p id="para">
            Future alike hill pull picture swim magic chain seed engineer nest
            outer raise bound easy poetry gain loud weigh me recognize farmer
            bare danger. actually put square leg vessels earth engine matter key
            cup indeed body film century shut place environment were stage
            vertical roof bottom lady function breeze darkness beside tin view
            natural attached part top grain your grade trade corn salmon trouble
            new bend most teacher range anybody every seat fifteen eventually .
          </p>
         <div className="search">
         <SearchBar />
         </div>
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
