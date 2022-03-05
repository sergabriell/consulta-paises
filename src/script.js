const inputPesquisa = document.querySelector('.busca');
const divPaises = document.querySelector('.paises');
const root = document.querySelector('body');

let test = '';
let apagar = false;

const paginacao = async () => {
    try {
        const paisApi = await fetch('https://restcountries.com/v2/all');
        const paisJson = await paisApi.json();
        const infos = await paisJson;

        infos.forEach((paises) => {
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

            inputPesquisa.addEventListener('keydown', (tecla) => {
                const { key } = tecla;
                apagar = false;
                if (key !== 'Backspace' && key.length === 1) {
                    test = inputPesquisa.value + key;

                } else if (key === 'Backspace') {
                    test = inputPesquisa.value;
                    apagar = true;
                }

                if (key === 'Enter') {
                    inputPesquisa.value = '';
                    test = '';
                }
                divPais.forEach((event) => {
                    const { textContent } = event;

                    if (apagar) {
                        if (textContent.toUpperCase().includes(test.toUpperCase())) {
                            pais.style.display = 'block';
                        } else {
                            pais.style.display = 'none';
                        }
                        return;
                    }

                    if (textContent.toUpperCase().includes(key.toUpperCase()) && textContent.toUpperCase().includes(test.toUpperCase())) {
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
    } catch (error) {
        console.log(error);
    }
}
paginacao();