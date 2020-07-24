import React from 'react';
import MegaResultado from "./MegaResultado"
import Surpresinha2 from "./Suspresinha2"
import {Container} from "react-bootstrap";



require('dotenv').config()

function App () {
  return (
    <div>
      <Container className="containerTudo">
        <MegaResultado/>
        <Surpresinha2 />
        <div className="observacao">
        *Durante o sorteio,  os dados são atualizados gradativamente pela 
        Caixa Econômica Federal. Por favor, volte mais tarde para ter 
        o resultado completo. 
        </div>
      </Container>
    </div>
  );
}

export default App;
