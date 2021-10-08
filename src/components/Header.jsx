import React,{useState, useEffect} from 'react'

function Header() {
    const [isDarkMode, setDarkMode] = useState(false);

    useEffect(()=>{
        const isDarkModeSet = localStorage.darkMode === 'true';
        setDarkMode(isDarkModeSet);
        setAttribute(isDarkModeSet);
    },[]);

    function setAttribute(isDarkModeSet){
        document.documentElement.setAttribute("data-theme",isDarkModeSet ? "dark":"light");
    }

    function toggleTheme(){
        setDarkMode(!isDarkMode);
        localStorage.darkMode = !isDarkMode;
        setAttribute(!isDarkMode);
    }

    function copyText(){
        document.getElementById('editor').select();
        document.execCommand("copy");
    }

    function saveTextAsFile(){
        let textToWrite = localStorage.idd ? localStorage.idd :"";
        textToWrite = textToWrite.replace(/\n/g, "\r\n");
        let textFileAsBlob = new Blob([textToWrite],{type:"text/plain"});

        let utc = new Date().toJSON().slice(0,10).replace(/-/g,"/");
        let fileName = `note ${utc}.txt`;
        let downloadLink = document.createElement('a');
        downloadLink.download = fileName;
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.click();
    }

    return(
        <header>
            <button className="logo-dropdown">
                <span className="logo">
                    Options
                </span>
                <ul className="dropdown">
                    <li className={`theme-indicator`} onClick={toggleTheme}>
                        {isDarkMode ? "Dark" : "Light"} theme
                    </li>
                    <li onClick={saveTextAsFile}>Download</li>
                    <li onClick={copyText}>Copy</li>
                </ul>
            </button>
        </header>
    )
}

export default Header
