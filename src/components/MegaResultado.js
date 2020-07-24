import React, {Component} from "react"
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';



class MegaResultado extends Component {
    constructor(props) {        
        super(props)
        this.state = {
            resultados: {},
            numeros: {},
            acumulou: "",
            valor:"",
            loading: true,
            visibilityResp: "hidden",
            visibilityLoading: "visible",
        }
    }

    NumberFormat = require('react-number-format')

    componentDidMount() {
        this.setState({loading: true})
        fetch("https://apiloterias.com.br/app/resultado?loteria=megasena&token=${process.env.REACT_APP_LOTETIAS}")
        .then(response => response.json())
        .then(data => {
            this.setState({
                loading: false,
                resultados: data,
                numeros: data.dezenas,
                acumulou: data.acumulou,
                valor: data.valor_estimado_proximo_concurso,
                visibilityDate: "visible",
                visibilityDateSaiu: "visible",
                visibilityDateProx: "visible",
                aguardandoDados:  "hidden",
            })
            console.log(data)

            if (this.state.loading === false ){
                this.setState({
                    visibilityResp: "visible",
                    visibilityLoading: "hidden"
                }, () => console.log(this.state));
            }

            if (this.state.valor === 0){
                this.setState({
                visibilityDate:  "visible",
                visibilityDateSaiu:  "hidden",
                visibilityDateProx:  "hidden",
                aguardandoDados:  "visible",
                    
                }, () => console.log(this.state));
            }
        })
    } 

    render() { 
        let saiu = this.state.acumulou ? "ACUMULOU!" : "SAIU!"
        return(
            <div>
                <div  style={{ visibility: this.state.visibilityLoading }}>
                    <img className="loadingLogo" src={require(`./imagens/loading9.gif`)} width={664} height={300} mode='fit' alt="..."></img>
                </div>
                <div className="resultadoBloco" style={{ visibility: this.state.visibilityResp }}  >
                        <div className="resultadoTitulo" style={{ visibility: this.state.visibilityDate }} >Resultado  <Moment className="resultadoData" format="DD/MM/YYYY">{this.state.resultados.data_concurso}</Moment></div>
                        <div className="resultadoConcurso"><span>Concurso:</span> {this.state.resultados.numero_concurso}</div>
                        <div className="resultadoBolas">
                            <div>
                                <span className="bolaGrande"><span className="bolaPequena">{this.state.numeros[0]}</span></span>
                                <span className="bolaGrande"><span className="bolaPequena">{this.state.numeros[1]}</span></span>
                                <span className="bolaGrande"><span className="bolaPequena">{this.state.numeros[2]}</span></span>
                                <span className="bolaGrande"><span className="bolaPequena">{this.state.numeros[3]}</span></span>
                                <span className="bolaGrande"><span className="bolaPequena">{this.state.numeros[4]}</span></span>
                                <span className="bolaGrande"><span className="bolaPequena">{this.state.numeros[5]}</span></span> 
                            </div>
                        </div>
                    <div className="textSaiu" style={{ visibility: this.state.visibilityDateSaiu }}>{saiu}</div>
                    <div className="aguardando" style={{ visibility: this.state.aguardandoDados }}> 
                        <div>Aguardando dados da Caixa Econômica Federal</div>
                        <img className="aguardandoImg" src={require(`./imagens/loading9.gif`)} width={290} height={250} mode='fit' alt="..."></img>
                    </div>
                    <div style={{ visibility: this.state.visibilityDateProx }}>
                        <div className="textoProxSort">Próximo Sorteio</div>
                        <Moment className="dataProxSort" format="DD/MM/YYYY">{this.state.resultados.data_proximo_concurso}</Moment>
                        <br></br>
                        <br></br>
                        <NumberFormat className="valorProxSorteio"
                            value={this.state.resultados.valor_estimado_proximo_concurso} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'R$'}
                            suffix={',00'}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default MegaResultado