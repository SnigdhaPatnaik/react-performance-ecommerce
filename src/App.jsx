import React, { Suspense, lazy} from "react";

const Home = lazy(()=> import("./pages/Home"));

export default function App(){
    return (
        <Suspense fallback={<h2>Loading Page...</h2>}>
            <Home/>
        </Suspense>
    );
}