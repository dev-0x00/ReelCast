import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

function App() {
  const [Auth, setAuth] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('email');
    {console.log(email)}
    if (email) {
      setAuth(true);
    }
  }, []);

  return (
    <Router>
      <Routes authenticated={Auth}/>
    </Router>
  );
}

export default App;
