const bttn = document.querySelector('.bttnAdd');


//Array que irá receber os objetos representando cada movimentação de dinheiro
let relatorio = [];

// Manipulador de evento que definindo que: quando o botão for clicado
bttn.addEventListener('click', (event) => {
    //Previnir que o formulário seja enviado e a página recarregada
    event.preventDefault();

    const inputValor = document.querySelector('#iValor');
    const inputDescricao = document.querySelector('#iDescricao');
    const entrada = document.querySelector('#iEntrada');
    const saida = document.querySelector('#iSaida');


    //Variavel que dependendo de qual elemento radio for marcado, irá definir o tipo de valor a ser atribuído se é de entrada ou saída
    let tipoDeValor;

    if (entrada.checked) {
        tipoDeValor = 'entrada';
    } else if (saida.checked) {
        tipoDeValor = 'saida';
    } else {
        document.querySelector('.inputs').reset();
        return alert('Não esqueça de marcar se o valor é de entrada ou saída');
    }

    //Envia objetos representando as movimentações de dinheiro, para o Array relatorio
    relatorio.push({
        valor: inputValor.value,
        descricao: inputDescricao.value,
        tipo: tipoDeValor
    });

    //Arrays que receberão os Objetos separados por tipo 
    const objetosEntrada = [];
    const objetosSaida = [];

    relatorio.forEach((objeto) => {
        if (objeto.tipo === 'entrada') {
            objetosEntrada.push(objeto);
        } else {
            objetosSaida.push(objeto);
        }
    });

    //Arrays que receberão somente os valores da Array de objetos objetosEntrada e objetosSaida respectivamente
    const valoresEntrada = [0];
    const valoresSaida = [0];

    objetosEntrada.forEach((objeto) => {
        valoresEntrada.push(Number(objeto.valor));
    });
    objetosSaida.forEach((objeto) => {
        valoresSaida.push(Number(objeto.valor));
    });

    //Variáveis que recebem a soma dos elementos das Arrays valoresEntrada e valoresSaida respectivamente
    const somaValoresEntrada = valoresEntrada.reduce((ac, el) => ac += el);
    const somaValoresSaida = valoresSaida.reduce((ac, el) => ac += el);
    const diferencaValores = somaValoresEntrada - somaValoresSaida;
    //Acessar os elementos dentro do HTML e alterar seu conteúdo para mostrar ao usuário
    document.querySelector('.result1').textContent = somaValoresEntrada.toFixed(2);
    document.querySelector('.result2').textContent = somaValoresSaida.toFixed(2);
    document.querySelector('.result').textContent = diferencaValores.toFixed(2);

    // Chama a função que irá apresentar na tela todos os extratos que serão criados
    montandoRelatorio(relatorio);

    //Limpa os campos do formulário
    document.querySelector('.inputs').reset();
});

function montandoRelatorio(arrRelatorio) {
    const saveMoney = document.querySelector('.saveMoney');
    saveMoney.innerHTML = ''; // Limpa o conteúdo atual do elemento

    // Percorre os objetos do Array 'relatorio' chamando a função criar extrato para cada iteração, a qual o valor será atribuído à constante 'extrato' que em seguida é adotada pelo elemento pai 'saveMoney'
    arrRelatorio.forEach((obj) => {
        const extrato = criarExtrato(obj);
        saveMoney.appendChild(extrato);
    });
}

function criarExtrato(obj) {
    const divMoney = document.createElement('div');
    const valorMovido = document.createElement('p');
    const descricaoMovido = document.createElement('p');
    
    const divIcones = document.createElement('div');
    const iconeTipo = document.createElement('span');
    const iconeDeletar = document.createElement('span');

    
    divMoney.appendChild(valorMovido);
    divMoney.appendChild(descricaoMovido);
    divMoney.appendChild(divIcones);
    divIcones.appendChild(iconeTipo);
    divIcones.appendChild(iconeDeletar);

    if (obj.tipo === 'entrada') {
        iconeTipo.textContent = 'arrow_circle_up';
    } else {
        iconeTipo.textContent = 'arrow_circle_down';
    }

    divMoney.classList.add('money');
    divIcones.classList.add('icons');
    iconeTipo.classList.add('material-symbols-outlined');
    iconeDeletar.classList.add('material-symbols-outlined');
    
    valorMovido.textContent = obj.valor;
    descricaoMovido.textContent = obj.descricao;
    iconeDeletar.textContent = 'delete';

    //
    iconeDeletar.addEventListener('click', () => {
        relatorio = relatorio.filter((obj) => {
            return descricaoMovido.textContent !== obj.descricao;
        });
        montandoRelatorio(relatorio)
    });

    return divMoney;
}