import { useRouteError } from 'react-router-dom';

const Error = () => {

    // The useRouteError hook returns an object that contains information about the error that occurred in the route.
    // The object has the following properties:
    // status: The HTTP status code of the error.
    // statusText: The HTTP status text of the error.
    // error: An object that contains information about the error that caused the route to fail to render.
    const error = useRouteError();
    console.log(error);
    return (
        <div className="error">
            <h1>Ooops!</h1>
            <h2>{error.status} : {error.statusText}</h2>
            <h3 style={{color:"red"}}>{error.error.message}</h3>
        </div>
    );
}

export default Error;