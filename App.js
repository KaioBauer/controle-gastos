import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

export default function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleAuthChange = (user) => {
      setUser(user);
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>

  );


}

