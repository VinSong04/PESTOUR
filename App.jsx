import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import VotingView from './path/to/VotingView'; // Adjust path accordingly
import OtherPages from './path/to/OtherPages'; // Other imports

const App = () => {
    const voting = { isOpen: true }; // This should come from your state or context
    const isAdmin = false; // Determine if the user is an admin

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                {voting.isOpen && !isAdmin ? (
                    <Route path="/" component={VotingView} />
                ) : (
                    <Route path="/other" component={OtherPages} />
                    // add additional routes for other pages
                )}
                <Redirect to="/" />
            </Switch>
        </Suspense>
    );
};

export default App;