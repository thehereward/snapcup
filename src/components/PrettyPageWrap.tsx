import React from 'react';

const PrettyPageWrap:React.FunctionComponent = ({children}) => (
    <>
    <header>
        <nav className="navbar bg-light">
            <span className="navbar-brand">🥤 SnapCup</span>
        </nav>
    </header>
    <main className="container">
        {children}
    </main>
    </>
)

export default PrettyPageWrap;
