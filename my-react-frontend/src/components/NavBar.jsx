import { Link } from "react-router-dom"
const NavBar = () => {
    return (
        <header className="header">
            <div className="title">
                <a href="https://www.utilitymarx.com/" target="_blank" rel="noreferrer">
                    Utility Marx
                </a>
            </div>

            <div className="buttons-container">
                <Link to="/">
                    <button className="homebutton">Home</button>
                </Link>
                <Link to="/about">
                    <button className="aboutbutton">About</button>
                </Link>
            </div>

            <div className="subtitle">
                A tool for PDF automation
            </div>
        </header>
    )
}
export default NavBar