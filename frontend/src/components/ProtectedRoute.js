import {Redirect, Route} from "react-router";

function ProtectedRoute({component: Component, ...props}) {
    return (

        <Route>
            {() => props.isLoggedIn ? <Component {...props} /> : <Redirect to="./sign-in"/>}
        </Route>

    );
}

export default ProtectedRoute;