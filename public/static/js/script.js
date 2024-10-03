/* 
<!-- Desenvolvido por Leonardo Mantovani -->
<!-- GitHub: https://github.com/LeonardoHMS -->
<!-- Linkedin: https://www.linkedin.com/in/leonardohms/ -->
*/

// Função para transformar o resultado HH:MM:SS em segundos, retirado da tabela
function timeStringToSeconds(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

// Função para transformar os segundos no formato HH:MM:SS para visualizar na tabela
function secondsToHHMMSS(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

// Função para transformar tempo em Decimal para Horas normais
function converterDecimalToHours(decimal) {
    const [minutes, fraction] = decimal.toString().split('.').map(Number);
    const seconds = minutes * 60;
    const fractionSeconds = Math.round((fraction / 100) * 60);
    return seconds + fractionSeconds;
}

// Valores do arquivo index.html
const EMBEDHTML = document.getElementById("inputEmbed");
const CLOSEMODALBUTTON = document.getElementById("close-modal");
const TAGERROR = document.getElementById("message-embed");

// Necessário para visualização do Iframe
const toggleModal = () => {
    [modal, fade].forEach((el) => el.classList.toggle("hide"));
};

// Necessário para visualização do Iframe
[CLOSEMODALBUTTON, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
}); 

// Toda vez que o usuário pressionar a tecla ENTER, será calculado os valores da tabela
document.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        calculate();
    }
});

// Função para confirmar o arquivo da Trumph selecionado
function setEmbed() {
    if (EMBEDHTML.value.length == 0){
        TAGERROR.setAttribute('class', 'message-embed message-error');
        TAGERROR.innerHTML = 'Nenhum arquivo selecionado!! 😭'
    } else {
        TAGERROR.setAttribute('class', 'message-embed message-success');
        TAGERROR.innerHTML = 'Arquivo selecionado!! 🥳';
        document.getElementById("iframeDisplay").src = '/' + EMBEDHTML.value;
    }
};

// Função para visualizar o arquivo no Iframe
function openEmbed() {
    toggleModal();
};

// Função para extrair os campos necessários do arquivo da Trumph
function findXpath(doc, my_xpath) {
    var result = document.evaluate(
        my_xpath,
        doc,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    return result
    //var node_frame = result.snapshotItem(0);
    //return node_frame ? node_frame.textContent : null;
};


// Função que irá fazer os calculos para o apontamento real
function calculate() {
    const embed = document.getElementById('iframeDisplay');
    const doc = embed.contentDocument || embed.getSVGDocument();  

    // Calculando o uso de chapas
    var time_program = document.getElementById("time-program");
    var qtd_chapas = document.getElementById("number-chapas");
    var time_program_tot = document.getElementById("time-program-tot");
    
    var time_program_path = '0' + findXpath(
        doc,
        '/html/body/table[2]/tbody/tr[11]/td[2]/font/b')
        .snapshotItem(0)
        .textContent
        .trim()
        .replace(/\s/g, '')
        .substring(0, 7);

    time_program.innerHTML = time_program_path;
    time_program_tot.innerHTML = secondsToHHMMSS(timeStringToSeconds(time_program_path) * parseInt(qtd_chapas.value));
    // ------------------------------

    // Valores preenchidos pelo usuário
    var input_setup = document.getElementById('input-setup');
    var input_start = document.getElementById('input-start');
    var input_end = document.getElementById('input-end');
    var result_time = document.getElementById('result-time');

    // Cálculo do tempo real do operador
    result_time.innerHTML = secondsToHHMMSS(timeStringToSeconds(input_end.value) - timeStringToSeconds(input_start.value) - timeStringToSeconds(input_setup.value));

    // Extraindo quantidade de peças cada e resetando valores para novo cálculo
    var qtd_values = [];
    var time_values = [];
    var qtd_un_tot = [];
    for (var i=1; i<16; i++) {
        var qtd_value = document.getElementById(`qtd-un-${i}`);
        var qtd_time = document.getElementById(`time-un-${i}`);
        var un_tot = document.getElementById(`qtd-un-tot-${i}`);
        document.getElementById(`setup-min-${i}`).innerHTML = '&nbsp;';
        document.getElementById(`prod-min-${i}`).innerHTML = '&nbsp;';
        document.getElementById(`init-prod-${i}`).innerHTML = '&nbsp;';

        document.getElementById(`end-prod-${i}`).innerHTML = '&nbsp;';
        document.getElementById(`end-prod-${i}`).setAttribute('class', 'not-edit');

        document.getElementById(`op-1-rest-${i}`).innerHTML = '&nbsp;';
        document.getElementById(`op-1-rest-${i}`).setAttribute('class', 'not-edit');

        document.getElementById(`op-1-apont-${i}`).innerHTML = '&nbsp;';
        document.getElementById(`op-1-apont-${i}`).setAttribute('class', 'not-edit');

        document.getElementById(`op-1-setup-${i}`).innerHTML = '&nbsp;';
        document.getElementById(`op-1-atv-${i}`).innerHTML = '&nbsp;';
        document.getElementById(`op-1-init-${i}`).innerHTML = '&nbsp;';
        document.getElementById(`op-1-end-${i}`).innerHTML = '&nbsp;';

        document.getElementById(`op-1-falta-${i}`).innerHTML = '&nbsp;';
        document.getElementById(`op-1-falta-${i}`).setAttribute('class', 'not-edit');

        qtd_values.push(qtd_value);
        time_values.push(qtd_time);
        qtd_un_tot.push(un_tot);
    }

    var qtd_value_xpath = findXpath(
        doc,
        "//table[7]/tbody/tr/td/font[contains(text(), 'NUMERO:') and not(contains(text(), 'DESENHO'))]/ancestor::td/following-sibling::td[1]/font"
    );
    var time_value_xpath = findXpath(
        doc,
        "//table[7]/tbody/tr/td/font[contains(text(), 'TEMPO DE OPERACAO:') and not(contains(text(), 'DESENHO'))]/ancestor::td/following-sibling::td[1]/font"
    );

    // Resetar valores
    for (var index in qtd_values) {
        qtd_values[index].innerHTML = '';
        time_values[index].innerHTML = '';
        qtd_un_tot[index].innerHTML = '';
    };
    var qtd_time_deci = [];
    for (var i=0; i<qtd_value_xpath.snapshotLength; i++) {
        // Valores do arquivo da Trumpf
        qtd_values[i].innerHTML = qtd_value_xpath.snapshotItem(i).innerHTML.replace('&nbsp;', '');
        time_values[i].innerHTML = time_value_xpath.snapshotItem(i).innerHTML.replace(' min&nbsp;', '');
        qtd_un_tot[i].innerHTML = parseFloat(qtd_values[i].innerHTML) * parseInt(qtd_chapas.value);
        
        // Cálculo de tempos dos materiais
        var time_deci = parseInt(qtd_values[i].innerHTML) * parseFloat(time_values[i].innerHTML) * parseInt(qtd_chapas.value);
        qtd_time_deci.push(time_deci);
    }
    // Soma total dos valores decimal
    var time_tot_deci = 0;
    var qtd_value_sum = 0;
    for (var i=0; i<qtd_time_deci.length; i++) {
        time_tot_deci+=qtd_time_deci[i];
        qtd_value_sum+=parseInt(qtd_values[i].innerHTML);
    }
    // Calculando a porcentagem de tempo para cada material
    var qtd_perc_deci = [];
    for (i=0; i<qtd_time_deci.length; i++) {
        var porcent = qtd_time_deci[i] / time_tot_deci;
        qtd_perc_deci.push(porcent);
    }

    // Preenchendo a coluna de Atividades da tabela
    for (i=0; i<qtd_value_xpath.snapshotLength; i++) {
        var uni_hours = qtd_perc_deci[i] * timeStringToSeconds(result_time.innerHTML);
        document.getElementById(`setup-min-${i+1}`).innerHTML = (((timeStringToSeconds(input_setup.value) * parseInt(qtd_values[i].innerHTML)) / qtd_value_sum) / 60).toFixed(2);
        document.getElementById(`prod-min-${i+1}`).innerHTML = (uni_hours / 60).toFixed(2);
        if (i == 0){
            document.getElementById(`init-prod-${i+1}`).innerHTML = secondsToHHMMSS(timeStringToSeconds(input_start.value) + timeStringToSeconds(input_setup.value));
        } else {
            document.getElementById(`init-prod-${i+1}`).innerHTML = document.getElementById(`end-prod-${i}`).innerHTML;
        }
        document.getElementById(`end-prod-${i+1}`).innerHTML = secondsToHHMMSS((timeStringToSeconds(document.getElementById(`init-prod-${i+1}`).innerHTML) + uni_hours).toFixed(0));
    }

    // Informando o status sobre o tempo real ao usuário
    var porcentagem_calc = ((timeStringToSeconds(time_program_tot.innerHTML) - timeStringToSeconds(result_time.innerHTML)) / timeStringToSeconds(time_program_tot.innerHTML)).toFixed(2) * 100;
    document.getElementById('real-porc').innerHTML = `${porcentagem_calc.toFixed(0)}%`;
    if (porcentagem_calc >=0 ) {
        document.getElementById('real-status').innerHTML = 'Rápido 🚀';
        document.getElementById('real-status').setAttribute('class', 'not-edit tag-green');
        document.getElementById('real-porc').setAttribute('class', 'not-edit tag-green');
    } else {
        document.getElementById('real-status').innerHTML = 'Lento 🐢';
        document.getElementById('real-status').setAttribute('class', 'not-edit tag-red');
        document.getElementById('real-porc').setAttribute('class', 'not-edit tag-red');
    }

    // Calculando as OP's, Refugo, Qtd restante
    for (i=0; i<qtd_value_xpath.snapshotLength; i++) {
        var qtd_op = document.getElementById(`op-1-qtd-${i+1}`);
        var other_op = document.getElementById(`op-1-other-${i+1}`);
        var saldo = document.getElementById(`op-1-rest-${i+1}`);
        saldo.innerHTML = parseInt(qtd_op.value) - parseInt(other_op.value);
        var refugo = document.getElementById(`refugo-${i+1}`).value;
        var apont = document.getElementById(`op-1-apont-${i+1}`);

        if (parseInt(qtd_un_tot[i].innerHTML) - parseInt(refugo) > parseInt(saldo.innerHTML)){
            apont.innerHTML = saldo.innerHTML;
        } else if(parseInt(qtd_un_tot[i].innerHTML) - parseInt(refugo) <= 0 ) {
            apont.innerHTML = 'Erro';
        } else {
            apont.innerHTML = parseInt(qtd_un_tot[i].innerHTML) - parseInt(refugo);
        }
        if (parseInt(apont.innerHTML) + parseInt(other_op.value) >= parseInt(qtd_op.value)) {
            apont.setAttribute('class', 'not-edit tag-green');
        } else if(parseInt(apont.innerHTML) + parseInt(other_op.value) < parseInt(qtd_op.value)) {
            apont.setAttribute('class', 'not-edit tag-yellow');
        };

        // Porcentagens para cálculos
        var perc_refugo = parseInt(refugo) / parseInt(qtd_un_tot[i].innerHTML);
        var perc_op = parseInt(apont.innerHTML) / parseInt(qtd_un_tot[i].innerHTML);
        var atv_refugo = refugo * (parseFloat(document.getElementById(`prod-min-${i+1}`).innerHTML) / parseInt(document.getElementById(`qtd-un-tot-${i+1}`).innerHTML));

        var setup_min = document.getElementById(`setup-min-${i+1}`).innerHTML;
        document.getElementById(`op-1-setup-${i+1}`).innerHTML = ((parseFloat(setup_min) * perc_op) + perc_refugo * parseFloat(setup_min)).toFixed(2);

        var atv_min = document.getElementById(`op-1-atv-${i+1}`);
        if (refugo == '0') {
            atv_min.innerHTML = (parseFloat(document.getElementById(`prod-min-${i+1}`).innerHTML) * perc_op).toFixed(2);
        } else {
            atv_min.innerHTML = ((parseFloat(document.getElementById(`prod-min-${i+1}`).innerHTML) * perc_op) + atv_refugo).toFixed(2);
        }
        document.getElementById(`op-1-init-${i+1}`).innerHTML = document.getElementById(`init-prod-${i+1}`).innerHTML;
        document.getElementById(`op-1-end-${i+1}`).innerHTML = secondsToHHMMSS(timeStringToSeconds(document.getElementById(`init-prod-${i+1}`).innerHTML) + converterDecimalToHours(atv_min.innerHTML));
        
        if (document.getElementById(`op-1-apont-${i+1}`).innerHTML == document.getElementById(`op-1-rest-${i+1}`).innerHTML) {
            document.getElementById(`op-1-falta-${i+1}`).innerHTML = "OK";
            document.getElementById(`op-1-falta-${i+1}`).setAttribute('class', 'not-edit tag-green');
        } else {
            document.getElementById(`op-1-falta-${i+1}`).innerHTML = parseInt(document.getElementById(`op-1-rest-${i+1}`).innerHTML) - parseInt(document.getElementById(`op-1-apont-${i+1}`).innerHTML);
            document.getElementById(`op-1-falta-${i+1}`).setAttribute('class', 'not-edit tag-yellow');
        }
        
        // Ordem de produção 02
        var sobra_op = parseInt(qtd_un_tot[i].innerHTML) - refugo - apont.innerHTML;
        var saldo = parseInt(document.getElementById(`op-2-qtd-${i+1}`).value - parseInt(document.getElementById(`op-2-other-${i+1}`).value));
        
        if(sobra_op > saldo){
            document.getElementById(`op-2-apont-${i+1}`).innerHTML = saldo;
            document.getElementById(`op-2-apont-${i+1}`).setAttribute('class', 'not-edit tag-green');
        } else {
            document.getElementById(`op-2-apont-${i+1}`).innerHTML = sobra_op;
            document.getElementById(`op-2-apont-${i+1}`).setAttribute('class', 'not-edit tag-yellow');
        }

        var perc_op = parseInt(document.getElementById(`op-2-apont-${i+1}`).innerHTML) / parseInt(qtd_un_tot[i].innerHTML);
        document.getElementById(`op-2-rest-${i+1}`).innerHTML = sobra_op;
        document.getElementById(`op-2-setup-${i+1}`).innerHTML = (setup_min * perc_op).toFixed(2);
        document.getElementById(`op-2-atv-${i+1}`).innerHTML = (parseFloat(document.getElementById(`prod-min-${i+1}`).innerHTML) * perc_op).toFixed(2);
        document.getElementById(`op-2-init-${i+1}`).innerHTML = document.getElementById(`op-1-init-${i+1}`).innerHTML;
        document.getElementById(`op-2-end-${i+1}`).innerHTML = secondsToHHMMSS(timeStringToSeconds(document.getElementById(`op-2-init-${i+1}`).innerHTML) + converterDecimalToHours(document.getElementById(`op-2-atv-${i+1}`).innerHTML));
        
        if(document.getElementById(`op-2-apont-${i+1}`).innerHTML == saldo) {
            document.getElementById(`op-2-falta-${i+1}`).innerHTML = "OK";
            document.getElementById(`op-2-falta-${i+1}`).setAttribute('class', 'not-edit tag-green');
        } else {
            document.getElementById(`op-2-falta-${i+1}`).innerHTML = saldo - parseInt(document.getElementById(`op-2-apont-${i+1}`).innerHTML);
            document.getElementById(`op-2-falta-${i+1}`).setAttribute('class', 'not-edit tag-yellow');
        }

    }
};
