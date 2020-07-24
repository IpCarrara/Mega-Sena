import React, { Component } from "react"
import * as numeros from "./Numeros.json"



class Surpresinha2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            resposta: [],
            numResposta: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.Surpresinha = this.Surpresinha.bind(this);
    }

    Surpresinha = () => {
        let randomArray = [];
        const max = 60
        const min = 1
            do {
            let num = Math.floor(Math.random()*(max-min+1)+min);
            randomArray.push(num);
            randomArray = randomArray.filter((item, index) => {
                return randomArray.indexOf(item) === index
            });
            } while (randomArray.length < 6);

        let numOrdem = randomArray.sort((a, b) => {
            return a - b;
        });
            
        this.setState({
            resposta: numOrdem,
            numResposta: this.state.resposta
        }, () => console.log(this.state));

    }

    handleClick = () => {
        this.Surpresinha();

    }
    
    render () {
        let surpNova = this.state.resposta
        let surpVelha = this.state.numResposta
        
        if (surpVelha != "") {
            for( let i = 0 ; i < 6; i++) { 
                document.getElementById(this.state.numResposta[i]).style.border = "5px solid rgb(255, 255, 255, 0.1)"
            } 
        }

        if (surpNova != ""){
            for( let i = 0 ; i < 6; i++) { 
                document.getElementById(this.state.resposta[i]).style.border = "5px solid red"
            } 
        }

        let idNumero = numeros.Numeros.map((props)=> {
            return (
                <div key={props.TEXT} className="surpNumContainet">
                    <div className="surpColuna">
                        <div >
                            <div id={props.ID} className="selectNum"
                            style={{ border:"5px solid rgb(255, 255, 255, 0.1)" }}>
                                <div>[{props.TEXT}]</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <div className="talaoBloco">
                    <div className="surpNumContainer">
                        <img className="talao" src={require(`./imagens/talao.png`)} width={300} height={440} mode='fit' alt="..."></img>
                        <div className="talaoNum">
                            {idNumero}
                        </div>
                    </div>
                    <button className="botao" onClick={this.handleClick}>Surpresinha</button>
                </div>
            </div>
        )
    }
}

export default Surpresinha2