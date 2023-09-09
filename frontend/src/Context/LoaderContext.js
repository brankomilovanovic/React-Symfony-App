import { createContext } from "react";

const LoaderContext = createContext({
    loading: false,
    setLoading: (value) => { },
})

export default LoaderContext;