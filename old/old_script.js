/* 
<!-- Desenvolvido por Leonardo Mantovani -->
<!-- GitHub: https://github.com/LeonardoHMS -->
<!-- Linkedin: https://www.linkedin.com/in/leonardohms/ -->
*/

const EMBEDHTML = document.getElementById("inputEmbed");
const CLOSEMODALBUTTON = document.getElementById("close-modal");
const TAGERROR = document.getElementById("message-embed");

document.addEventListener('keypress', function(e){
    if(e.which == 13){
        calculate();
    }
});

const toggleModal = () => {
    [modal, fade].forEach((el) => el.classList.toggle("hide"));
};

[CLOSEMODALBUTTON, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
}); 

function setEmbed() {
    if (EMBEDHTML.value.length == 0){
        TAGERROR.setAttribute('class', 'message-embed message-error');
        TAGERROR.innerHTML = 'Nenhum arquivo selecionado!!<i class="fa-regular fa-face-sad-tear"></i>'
    } else {
        TAGERROR.setAttribute('class', 'message-embed message-success');
        TAGERROR.innerHTML = 'Arquivo selecionado!!<i class="fa-sharp fa-regular fa-face-smile"></i>';
        document.getElementById("iframeDisplay").src = EMBEDHTML.value;
    }
};

function openEmbed() {
    toggleModal();
};

function findXpath(my_xpath) {
   var result = document.evaluate(
        my_xpath,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    var node_frame = result.snapshotItem(0);
    var text_frame = node_frame.textContent;
    return text_frame;
};

function calculate() {
    /* Calculate use of chapas  */
    var time_program = document.getElementById("time-program");
    var qtd_chapas = document.getElementById("number_chapas");
    var time_program_tot = document.getElementById("time-program-tot");
    
    time_program.value = findXpath('/html/body/table[2]/tbody/tr[11]/td[2]/font/b');

    time_program_tot.innerHTML = time_program.value * qtd_chapas.value;
    /* ------------------------------ */

};