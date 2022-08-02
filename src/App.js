import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import './services/api.js';
import api from './services/api.js';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function search(){
    //01001000/json/

    if(input === ''){
      alert('preecha algum cep!')
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('')
    }

    catch{
      alert("Ops erro ao buscar");
      setInput("")
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />


        <button className="buttonSearch" onClick={search}>
          <FiSearch size={25} color='black'/>
        </button>
      </div>

      <main className="main">
        <h2>CEP: {cep.cep}</h2>

        <span>{cep.logradouro}</span>
        <span>{cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} {cep.uf}</span>
      </main>

    </div>
  );
}

export default App;
