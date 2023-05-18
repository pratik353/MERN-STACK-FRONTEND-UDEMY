import React, { useCallback, useEffect, useRef, useState } from 'react'

const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const activeHttpRequest = useRef([]);

    const sendRequest = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequest.current.push(httpAbortCtrl);

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            });

            const responseData = await response.json();

            activeHttpRequest.current = activeHttpRequest.current.filter( reqCtrl => reqCtrl !== httpAbortCtrl);
            
            if( !response.ok){
              throw new Error(responseData.message)
            }
            setIsLoading(false);
            return responseData;
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
            throw error;
        }
    },[]);

    const clearError = () => {
        setError(null);
    }

    useEffect(()=>{
        return () => {
            activeHttpRequest.current.forEach( abortCtrl => abortCtrl.abortCtrl());
        };
    },[])

    return { isLoading, error, sendRequest, clearError};
}

export default useHttpClient