
function Header({ darkMode, setDarkMode }) {
    return (
        <header>
            <div className="header-inner">

                {/* Logo / Title */}
                <div className="logo-section">

                    <div className="logo-icon">
                        🌤️
                    </div>

                    <div className="logo-text">

                        <h1>
                            Weather Dashboard
                        </h1>

                        <p>
                            Real-time weather
                        </p>

                    </div>

                </div>


                {/* Dark Mode */}
                <button
                    type="button"
                    className="theme-button"
                    onClick={() =>
                        setDarkMode(!darkMode)
                    }
                >
                    {darkMode ? "☀️ Light" : "🌙 Dark"}
                </button>

            </div>
        </header>
    );
}

export default Header;