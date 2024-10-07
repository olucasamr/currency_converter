

const resultButton = document.querySelector('.BtnConversor');
const invertButton = document.querySelector('.BtnInverterMoeda');

async function getAPI () {
    try{

        const valorDigitadoParaConvercao = document.querySelector('.Valor'); //Pega o input onde nos digitamos o valor para ser convertido
        const moeda1 = document.querySelector('#Moeda1'); //Pega o primeiro select
        const moeda2 = document.querySelector('#Moeda2'); //Pega o segundo select
        const moedaOriginal = document.querySelector('.ValorMoeda1'); //Pega o span onde vai ser imprimido a moeda que você quer converter apenas para registro
        const moedaDestino = document.querySelector('.ValorMoeda2'); // Pega o span que recebe a moeda para qual você quer converter
        const valorQueVaiMudar = document.querySelector('.ValorQueVaiConverter'); // Span que recebe o valor que você digitou em valorDigitadoParaConvercao
        const valorFinal = document.querySelector('.Resultado'); // span que vai receber o resultado da conversão
        const url = `https://economia.awesomeapi.com.br/last/${moeda1.value}-${moeda2.value}`;

        const requisition = await fetch(url);
        const parseToJson = await requisition.json();
        
        if(requisition.status === 404){
            throw new Error('404 Não é possível realizar essa converção por limitações da API')
        }

        let codigoMoeda = moeda1.value + moeda2.value; //Aqui eu formo o código para pegar o objeto que eu quero dentro da lista json
        let objCoin = parseToJson[codigoMoeda].high; //Aqui eu pego a propriedade high do objeto que se refere ao valor da unitário da conversão
        let nomesDasMoedas = parseToJson[codigoMoeda].name; //Aqui eu pego o nome das moedas moeda1/moeda2

        //CONVERTENDO PARA OS TIPOS CORRETOS:

        let nomesStr = String(nomesDasMoedas);
        let arrayNomes = nomesStr.split('/')
        console.log(arrayNomes);


        let numericValue = parseFloat(valorDigitadoParaConvercao.value);
        let valorUnitario = parseFloat(objCoin);
        let resultado = numericValue * valorUnitario;

        moedaOriginal.textContent = ` ${arrayNomes[0]}`;
        moedaDestino.textContent = ` ${arrayNomes[1]}`;
        valorQueVaiMudar.textContent = ` ${moeda1.value} ${numericValue.toFixed(2)}`;
        valorFinal.textContent = ` ${moeda2.value} ${resultado.toFixed(2)}`;

    }
    catch(err){
        console.log(`Ocorreu um ${err}`)
    }

}


resultButton.addEventListener('click', getAPI);

invertButton.addEventListener('click', () => {
    let moeda1 = document.querySelector('#Moeda1');
    let moeda2 = document.querySelector('#Moeda2');

    let valor1 = moeda1.value;
    let valor2 = moeda2.value;

    moeda1.value = valor2;
    moeda2.value = valor1;
})