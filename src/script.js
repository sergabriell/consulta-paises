const inputPesquisa = document.querySelector('.busca');
const divPaises = document.querySelector('.paises');
const root = document.querySelector('body');

let valor = '';
let apagar = false;
let array = [];

const teste = () => {
    array.forEach((paises) => {
        const { name, region, capital, population, flags: { png } } = paises;

        const nome = document.createElement('h2');
        nome.textContent = name;

        const regiao = document.createElement('span');
        regiao.textContent = `Região: ${region}`;

        const capitalSpan = document.createElement('span');
        capitalSpan.textContent = `Capital: ${capital}`;

        const populacao = document.createElement('p');
        populacao.textContent = `População: ${population} habitantes`;

        const bandeira = document.createElement('img');
        bandeira.src = png;

        const pais = document.createElement('div');
        pais.classList.add('pais');

        pais.append(nome, regiao, capitalSpan, populacao, bandeira);
        divPaises.append(pais);

        const divPais = pais.querySelectorAll('h2');

        inputPesquisa.addEventListener('input', (tecla) => {
            const { value } = tecla.target;

            divPais.forEach((event) => {
                const { textContent } = event;

                if (textContent.toUpperCase().includes(value.toUpperCase()) && textContent.toUpperCase().includes(valor.toUpperCase())) {
                    pais.style.display = 'block';
                } else {
                    pais.style.display = 'none';
                }

                if (inputPesquisa.value === '') {
                    pais.style.display = 'block';
                }
            })
        })
    })
}

const paginacao = async () => {
    try {
        const paisApi = await fetch('https://restcountries.com/v2/all');
        const paisJson = await paisApi.json();
        const infos = await paisJson;

        array = infos;
        teste();

    } catch (error) {
        console.log(error);
    }
}
paginacao();