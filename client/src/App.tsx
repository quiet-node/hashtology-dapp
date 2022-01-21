import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='h-screen flex justify-center items-center'>
      <header className='bg-gray-600 text-white text-2xl'>Crypto Box</header>
    </div>
  );
}

export default App;
