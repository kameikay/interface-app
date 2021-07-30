const form = document.querySelector("#simulacao-form");
const cepInput = document.querySelector("#cep");
const uf = document.querySelector("#estado");
const cidade = document.querySelector("#cidade");
const concessionaria = document.querySelector("#concessionaria");
const resultadoSection = document.querySelector(
    ".simulador__container__resultado"
);

function setInputsValue(localizacaoCompleta) {
    if (!localizacaoCompleta.uf || !localizacaoCompleta.localidade) {
        uf.value = "CEP não encontrado";
        cidade.value = "CEP não encontrado";
    } else {
        uf.value = localizacaoCompleta.uf;
        cidade.value = localizacaoCompleta.localidade;

        if (uf.value === "PR") {
            concessionaria.value = "COPEL";
        }
    }
}

function clearInputs() {
    cepInput.value = "";
    cidade.value = "";
    uf.value = "";
}

function cepValido(cep) {
    const cepPattern = /^[0-9]{5}-[0-9]{3}$/;
    return cepPattern.test(cep);
}

async function getCEP() {
    const cep = cepInput.value;
    const url = `http://viacep.com.br/ws/${cep}/json`;

    const data = await fetch(url);
    if (cepValido(cep)) {
        const localizacaoCompleta = await data.json();
        setInputsValue(localizacaoCompleta);
    } else {
        clearInputs();
        cidade.value = "CEP inválido";
        uf.value = "CEP inválido";
    }
}

cepInput.addEventListener("focusout", getCEP);

// CHART
const gastoInput = document.querySelector("#gasto");
const htmlPotenciaInstalada = document.getElementById("potencia-instalada");
const htmlAreaMinimaNecessaria = document.getElementById(
    "area-minima-necessaria"
);

// Campos a preencher dinamicamente
const htmlQuantidadePaineis = document.getElementById("quantidade-paineis");
const htmlProducaoMensal = document.getElementById("producao-mensal");
const htmlEconomiaAnual = document.getElementById("economia-anual");
const htmlValorMinVista = document.getElementById("valor-min-vista");
const htmlValorMaxVista = document.getElementById("valor-max-vista");
const htmlValorMinParcelado = document.getElementById("valor-min-parcelado");
const htmlValorMaxParcelado = document.getElementById("valor-max-parcelado");

function getGastoValue() {
    return Number(gastoInput.value);
}

function getData() {
    // Parâmetros
    const gastoValue = getGastoValue();
    const tarifaCopel = 0.83;
    const gastoMedioKwh = gastoValue / tarifaCopel;
    const valorKwp = getValorKwp();
    const eficiencia = 0.75;
    const irradiacao = [
        5.33, 5.53, 5.39, 5.18, 4.51, 4.34, 4.51, 5.3, 5.0, 5.2, 5.47, 5.62,
    ];

    // Dias/mês
    const qntdDias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const meses = [
        "JAN",
        "FEV",
        "MAR",
        "ABR",
        "MAIO",
        "JUN",
        "JUL",
        "AGO",
        "SET",
        "OUT",
        "NOV",
        "DEZ",
    ];
    let mediaDiasMes = (
        qntdDias.reduce((soma, media) => (soma += media)) / 12
    ).toFixed(2);

    // Horas de sol pico
    let hrasSolPico = [];
    irradiacao.forEach((e) => {
        hrasSolPico.push(e * eficiencia);
    });
    let mediaHorasSolPico = (
        hrasSolPico.reduce((soma, media) => (soma += media)) / 12
    ).toFixed(2);

    const potenciaMinimaKwp = gastoMedioKwh / mediaDiasMes / mediaHorasSolPico;
    const numeroModulos = Math.ceil(potenciaMinimaKwp / 0.45);
    const potenciaInstalada = (numeroModulos * 0.45).toFixed(2);

    function getValorKwp(potenciaInstalada) {
        if (potenciaInstalada < 4) {
            return 6000;
        } else if (potenciaInstalada >= 4 || potenciaInstalada <= 6) {
            return 5000;
        } else if (potenciaInstalada > 6 || potenciaInstalada <= 8) {
            return 4750;
        } else if (potenciaInstalada > 8 || potenciaInstalada <= 12) {
            return 4500;
        } else if (potenciaInstalada > 12 || potenciaInstalada <= 20) {
            return 4300;
        } else if (potenciaInstalada > 20 || potenciaInstalada <= 30) {
            return 4100;
        } else if (potenciaInstalada > 30 || potenciaInstalada <= 50) {
            return 4000;
        } else if (potenciaInstalada > 50 || potenciaInstalada <= 75) {
            return 3800;
        } else if (potenciaInstalada > 75 || potenciaInstalada <= 100) {
            return 3600;
        } else {
            return 3500;
        }
    }

    // Geração em kWh
    const geracaoKwh = [];
    let somatoriaGeracaoKwh = 0;
    for (i in hrasSolPico) {
        geracaoKwh.push(
            (hrasSolPico[i] * potenciaInstalada * qntdDias[i]).toFixed(2)
        );
    }

    for (i in geracaoKwh) {
        somatoriaGeracaoKwh = somatoriaGeracaoKwh + Number(geracaoKwh[i]);
    }

    // Resultados
    const result = [];

    for (i in meses) {
        let info = {
            mes: meses[i],
            irradiacao: irradiacao[i],
            qntdDias: qntdDias[i],
            hrasSolPico: hrasSolPico[i],
            geracaoKwh: geracaoKwh[i],
        };

        result.push(info);
    }

    let valorProjeto = potenciaInstalada * valorKwp;
    const taxaJuros = 1.33;
    let valorParcela = (valorProjeto * taxaJuros) / 60;

    let economiaTotal = (somatoriaGeracaoKwh / tarifaCopel).toLocaleString(
        "pt-br",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    );
    const geracaoMensalKwh = Math.round(somatoriaGeracaoKwh / 12);
    const areaNecessaria = Math.round(numeroModulos * 2.8);

    return {
        result,
        potenciaInstalada,
        numeroModulos,
        areaNecessaria,
        geracaoMensalKwh,
        valorProjeto,
        valorParcela,
        economiaTotal,
    };
}

function setChart(result) {
    // Resultados
    htmlPotenciaInstalada.innerText = result.potenciaInstalada;
    htmlAreaMinimaNecessaria.innerText = result.areaNecessaria;
    htmlQuantidadePaineis.innerText = result.numeroModulos;
    htmlProducaoMensal.innerText = result.geracaoMensalKwh;
    htmlEconomiaAnual.innerHTML = result.economiaTotal;

    //VALORES
    htmlValorMinVista.innerHTML = result.valorProjeto.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    htmlValorMaxVista.innerHTML = (result.valorProjeto * 1.1).toLocaleString(
        "pt-br",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    );
    htmlValorMinParcelado.innerHTML = result.valorParcela.toLocaleString(
        "pt-br",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    );
    htmlValorMaxParcelado.innerHTML = (
        result.valorParcela * 1.1
    ).toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    document.querySelector("canvas#myChart").remove();

    let element = document.createElement('canvas')
    element.setAttribute('id', 'myChart')

    document.querySelector(".myCanvas").appendChild(element)
    
    const ctx = document.getElementById("myChart").getContext("2d");

    // Dados
    const data = [];
    result.result.map((e) => data.push(e.geracaoKwh));

    // config chart
    const newData = {
        labels: result.result.map((data) => data.mes),
        datasets: [
            {
                label: "Energia produzida em kWh",
                data: data,
                backgroundColor: ["rgba(29, 153, 167, 0.45)"],
                borderColor: ["#115157"],
                borderWidth: 1,
            },
        ],
    };

    // config block
    const config = {
        type: "bar",
        data: newData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    };

    //init block
    let myChart = new Chart(ctx, config);

}

function handleSubmit(e) {
    e.preventDefault();

    if (resultadoSection.classList.contains("hidden")) {
        resultadoSection.classList.remove("hidden");
    }

    const result = getData();

    setChart(result);
}

form.addEventListener("submit", handleSubmit);
