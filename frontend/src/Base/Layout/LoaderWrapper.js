import { useEffect, useRef, useState } from "react";
import LoaderContext from "../../Context/LoaderContext"
import { LinearProgress } from '@mui/material';

const LoaderWrapper = ({children}) => {

    const [loading, setLoading] = useState(false);
    const countRef = useRef(0);

    const value = { loading, setLoading };

    useEffect(() => {
      if (countRef.current <= 0 || !loading) {
          countRef.current = 0;
          setLoading(false);
      }
    }, [countRef.current])

    return <LoaderContext.Provider value={value}>
        { loading &&
            <div className="global-loader">
                <LinearProgress className="linear-loader"/>
                <div className="spinner" />
            </div>        
        }
        {children}
    </LoaderContext.Provider>
}


export default LoaderWrapper;
