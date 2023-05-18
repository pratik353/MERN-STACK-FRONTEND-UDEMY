import {useEffect, useState, useCallback} from 'react';

let logoutTimer;

export const useAuth = () => {
    const [userId, setUserId] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [token, setToken] = useState(null);
  
    const login = useCallback((uid, jwtToken, exepirationDate) => {
      setUserId(uid);
      const tokenExpirationDate = exepirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem('userData',JSON.stringify({userId:uid, token:jwtToken, expiration: tokenExpirationDate.toISOString()}))
      setToken(jwtToken);
    }, []);
  
    const logOut = useCallback(() => {
      setToken(null);
      setTokenExpirationDate(null);
      setUserId(null);
      localStorage.removeItem('userData');
    }, []);
  
  
    useEffect(()=>{
      if(token && tokenExpirationDate){
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logOut, remainingTime)
      } else {
        clearTimeout(logoutTimer);
      }
    },[token, logOut, tokenExpirationDate])
  
    
    useEffect(()=>{
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
        login(storedData.userId, storedData.token,  new Date(storedData.expiration))
      }
    },[login]);

    return {userId, login, logOut, token};
}

export default useAuth;