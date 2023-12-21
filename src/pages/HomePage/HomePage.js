import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../services/auth-service/auth-service';

const HomePage = () => {
  const [firstName, setFirstName] = useState('not');
  const [lastName, setLastName] = useState('logged in');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setIsAuthorized(authStatus);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    // Access sessionStorage and update firstName and lastName when isAuthorized is true
    if (isAuthorized) {
      const userProfile = sessionStorage.getItem('userProfile');
      if (userProfile) {
        const { first_name, last_name } = JSON.parse(userProfile);
        setFirstName(first_name);
        setLastName(last_name);
      }
    }
  }, [isAuthorized]);

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <div>
      <header>
        <h1>DevOps project</h1>
        <p>I'm not a developer so don't be mean :)</p>
      </header>
      <main>
        <p>You are {firstName} {lastName}</p>
      </main>
    </div>
  );
}

export default HomePage;
