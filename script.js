"use strict";
const TurmasBloco = document.getElementById("Turmas");
const final_container = document.getElementById("Final-Container");
const turmas = {
  "2C": Array.from({ length: 90 }, (_, index) => ({
    numero: index + 1,
    nome: `ALUNO${index + 1}-2C`,
  })),

  "1C": Array.from({ length: 90 }, (_, index) => ({
    numero: index + 1,
    nome: `ALUNO${index + 1}-1C`,
  })),

  "1B": Array.from({ length: 90 }, (_, index) => ({
    numero: index + 1,
    nome: `ALUNO${index + 1}-1B`,
  })),
};
// Alterar turmas e apaga a anterior
function renderizarturma(nometurma) {
  if (!nometurma) {
    console.error("Esta turma não existe: ", nometurma);
    return;
  }
  document.querySelectorAll(".All_btn").forEach((btn) => {
    btn.classList.remove("Hidden");
  });
  document.getElementById("DefSubtitle").textContent =
    "Definir todos os alunos como:";
  TurmasBloco.innerHTML = "";
  TurmasBloco.style.border = "double 10px var(--color50)";
  final_container.classList.remove("Hidden");
  TurmasBloco.innerHTML = turmas[nometurma]
    .map(
      (aluno) => `
     <fieldset data-estilo="Retangulos" class="BlocoAlunos">
      <p class="aluno-title">
        <span>${aluno.numero}</span>
        ${aluno.nome}
      </p>

      <button
        type="button"
        id="aluno${nometurma}-${aluno.numero}"
        class="btn-alunos"
        data-nome="${aluno.nome}"
        >
        C
      </button>

      <img
          src="imgobs.webp"
          title="Adicionar Observação"
          data-estilo="Retangulos"
          role="button"
          tabindex="0"
          data-fallback="https://i.ibb.co/8D9K6HgV/Img-Obs-aluno.png"
          class="OBS_img"
          loading="lazy"
          data-nome="${aluno.nome}"
          alt=""
          aria-label="Adicionar Observação sobre o aluno"
          >
      <dialog class="Aluno_obs_dialog">
          <h2 class="Diag_subtitulo"></h2>
          <textarea
            class="Obs_text"
            maxlength="200"
            placeholder="Aluno está na sala errada, frequência em que chega atrasado, comportamento em sala, pontualidade, atenção, interações com colegas ou qualquer ocorrência relevante."
            name="Adicionar_Observação"
            ></textarea>
            <button class="submitObs Beffects" type="button">
                Enviar
            </button>
            <button type="button" class="closeObs Beffects">
                Fechar</button
            ><br />
            <p
              class="CleanObs Beffects"
              role="button"
              tabindex="0"
              >
                LIMPAR OBSERVAÇÃO
              </p>
            </dialog>
    </fieldset>`,
    )
    .join("");
  document.getElementById("TurmaPDF").textContent = nometurma;
  FallbackObsIMG();
  restaurarelementos();
}
// Selecionando a turma
const selectTurmas = document.getElementById("select_Turmas");
selectTurmas.addEventListener("change", () => {
  if (selectTurmas.value === "Nenhuma") {
    final_container.classList.add("Hidden");
    TurmasBloco.style.border = "none";
    TurmasBloco.innerHTML = "";
    document.querySelectorAll(".All_btn").forEach((btn) => {
      btn.classList.add("Hidden");
    });
    document.getElementById("DefSubtitle").textContent =
      "Selecione uma turma para iniciar a chamada";
    localStorage.removeItem("Turma");
    return;
  }
  renderizarturma(selectTurmas.value);
  localStorage.setItem("Turma", selectTurmas.value);
});
function FallbackObsIMG() {
  const imagens = TurmasBloco.querySelectorAll(".OBS_img");
  imagens.forEach((img) => {
    const fallback = img.dataset.fallback;
    img.onerror = function () {
      console.log("Erro na imagem:", this.src);
      this.src = fallback;
      this.onerror = null;
    };
  });
}
const dialogs = document.querySelectorAll(".Aluno_obs_dialog");
let DiaChamadaPDF = document.getElementById("DiaChamadaPDF");
const LimparOBS = document.querySelectorAll(".CleanObs_btn");

let estilo = "";
let AlunoAtual = "";
// Alterar C, F, D
function MudarDeEstado(botao, estado) {
  const fieldset = botao.closest("fieldset");
  const img = fieldset.querySelector("img");

  switch (estado) {
    case "C":
      botao.style.backgroundColor = "#3B82F6";
      botao.style.boxShadow = "0 0 15px #3B82F6";
      botao.textContent = "C";
      fieldset.style.boxShadow = "0 11.6px 0 0 #3B82F6";
      break;
    case "F":
      botao.style.backgroundColor = "red";
      botao.style.boxShadow = "0 0 15px red";
      botao.textContent = "F";
      fieldset.style.boxShadow = "0 11.6px 0 0 red";
      break;
    case "D":
      botao.style.backgroundColor = "#939393";
      botao.style.boxShadow = "0 0 20px #939393";
      botao.textContent = "D";
      fieldset.style.boxShadow = "0 11.6px 0 0 #939393";
      break;
    default:
      alert("Ocorreu um erro ao definir o estado deste aluno!");
      botao.style.boxShadow = "0 0 20px crimson";
      botao.style.backgroundColor = "crimson";
      botao.textContent = "ERRO AO DEFENIR ESTADO";
      botao.removeEventListener("click");
      botao.style.width = "90%";
      fieldset.style.boxShadow = "0 11.6px 0 0 crimson";
      if (img) img.classList.add("Hidden");
      break;
  }
}
document.getElementById("All_Presente").addEventListener("click", () => {
  const btn_alunos = TurmasBloco.querySelectorAll(".btn-alunos");
  btn_alunos.forEach((botao) => {
    const estadosTodos = "C";
    MudarDeEstado(botao, estadosTodos);
    localStorage.setItem(botao.id, estadosTodos);
  });
});
document.getElementById("All_Ausente").addEventListener("click", () => {
  const btn_alunos = TurmasBloco.querySelectorAll(".btn-alunos");
  btn_alunos.forEach((botao) => {
    const estadosTodos = "F";
    MudarDeEstado(botao, estadosTodos);
    localStorage.setItem(botao.id, estadosTodos);
  });
});
document.getElementById("All_Desist").addEventListener("click", () => {
  const btn_alunos = TurmasBloco.querySelectorAll(".btn-alunos");
  btn_alunos.forEach((botao) => {
    const estadosTodos = "D";
    MudarDeEstado(botao, estadosTodos);
    localStorage.setItem(botao.id, estadosTodos);
  });
});
// Ciclo C - F - D
const nomesEstado = { C: "Presente", F: "Ausente", D: "Desistente" };
TurmasBloco.addEventListener("click", (element) => {
  if (element.target.classList.contains("btn-alunos")) {
    const btn_aluno = element.target;
    const nomealuno = btn_aluno.dataset.nome;
    let estadoAtual = localStorage.getItem(btn_aluno.id) || "C";
    if (estadoAtual === "C") estadoAtual = "F";
    else if (estadoAtual === "F") estadoAtual = "D";
    else estadoAtual = "C";
    MudarDeEstado(btn_aluno, estadoAtual);
    localStorage.setItem(btn_aluno.id, estadoAtual);
    console.log(
      `Aluno: ${btn_aluno.dataset.nome || btn_aluno.id}: ${nomesEstado[estadoAtual]} ✓`,
    );
  }
  if (element.target.classList.contains("OBS_img")) {
    const aluno = element.target.dataset.nome;

    const blocoaluno = element.target.closest(".BlocoAlunos");
    const dialog = blocoaluno.querySelector(".Aluno_obs_dialog");
    dialog.dataset.aluno = aluno;
    const titulo = dialog.querySelector(".Diag_subtitulo");
    titulo.innerText = `OBSERVAÇÃO SOBRE:\n${aluno}`;
    dialog.showModal();
    dialog.querySelector(".closeObs").addEventListener("click", () => {
      dialog.close();
    });
    const btnsalvarObs = dialog.querySelector(".submitObs");
    const textarea = dialog.querySelector(".Obs_text");
    textarea.value = localStorage.getItem(aluno) || "";
    btnsalvarObs.onclick = () => {
      if (!textarea) return;
      const CampoVazio = document.getElementById("Dig_CampoVazio");
      if (textarea.value === "") {
        CampoVazio?.showModal();
        return;
      }
      localStorage.setItem(aluno, textarea.value);
      if (!EventDig) {
        alert(`✅ Observação de ${aluno} Salva!`);
      } else {
        EventDig.showModal();
        EventDigText.innerHTML = `✅ Observação de: <br>${aluno} Salva!`;
      }
      dialog?.close();
    };

    const btnlimparobs = dialog.querySelector(".CleanObs");
    function atualizaropcao() {
      if (textarea.value.trim() === "") {
        btnlimparobs.classList.add("Hidden");
      } else btnlimparobs.classList.remove("Hidden");
    }
    atualizaropcao();
    textarea.oninput = atualizaropcao;
    btnlimparobs.onclick = () => {
      const aluno = dialog.dataset.aluno;
      textarea.value = "";
      localStorage.removeItem(aluno);
      atualizaropcao();
    };
  }
});

TurmasBloco.addEventListener("keydown", (event) => {
  if (event.target.matches("textarea, input")) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    event.target.click();
  }
});

const AbrirMenuConf = document.getElementById("Configurações_img");
const FallBackConfg = AbrirMenuConf.getAttribute("data-fallback");
AbrirMenuConf.onerror = function () {
  if (this.src !== FallBackConfg) {
    this.src = FallBackConfg;
    this.onerror = null;
  }
};
// Salvar observação quando clica em Salvar e também exibir dialogo campo vazio caso esteja vazio o campo
const EventDig = document.getElementById("ObsCompleteDig_Nodata");
const EventDigText = document.getElementById("TextoCompleteOBS");
document.querySelectorAll(".OK_closeDig").forEach((ok_btn) => {
  ok_btn.addEventListener("click", () => {
    document.querySelectorAll(".Dialogs_Events").forEach((dialog) => {
      dialog.close();
    });
  });
});

// Salvar a data quando muda
const dataInput = document.getElementById("Data_Chamada_input");
dataInput?.addEventListener("change", (event) => {
  const valor = event.target.value;
  const [ano, mes, dia] = valor.split("-");
  const dataBR = `${dia}/${mes}/${ano}`;
  localStorage.setItem("data_chamada", dataBR);
  DiaChamadaPDF.textContent =
    localStorage.getItem("data_chamada") || "Data não relatada";
});

// Coletar os dados
function coletarDadosChamada() {
  const dataChamada =
    localStorage.getItem("data_chamada") || "Data não relatada";
  const btn_alunos = TurmasBloco.querySelectorAll(".btn-alunos");
  const alunos = [];
  let Total_Presentes = 0;
  let Total_Ausentes = 0;
  let Total_Desistentes = 0;

  btn_alunos.forEach((btn) => {
    const nome = btn.dataset.nome || "Aluno indefinido";
    const estado = localStorage.getItem(btn.id) || "C";
    const obs = localStorage.getItem(nome) || ""; // Usa o nome do aluno como chave

    const numero = btn.id.split("-")[1];

    alunos.push({
      numero,
      nome,
      estado,
      observacao: obs,
    });
    if (estado === "C") Total_Presentes++;
    if (estado === "F") Total_Ausentes++;
    if (estado === "D") Total_Desistentes++;
  });

  return {
    dadosChamada: {
      Data: dataChamada,
      TotalAlunos: alunos.length,
      Estatisticas: {
        Presentes: Total_Presentes,
        Faltas: Total_Ausentes,
        Desistentes: Total_Desistentes,
      },
      alunos,
    },
    totais: {
      Total_Presentes,
      Total_Ausentes,
      Total_Desistentes,
    },
  };
} // fim da função colertarDados

function preencherTabelaChamada(dadosChamada) {
  const tabela = document.getElementById("tabela-chamada");
  if (!tabela) return;

  const tbody = tabela.querySelector("tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  dadosChamada.alunos.forEach((aluno) => {
    const tr = tbody.insertRow();

    const cor =
      aluno.estado === "C"
        ? "#3B82F6"
        : aluno.estado === "F"
          ? "red"
          : "#939393";

    // Cria as células
    const tdNumero = tr.insertCell();
    tdNumero.textContent = aluno.numero;
    tdNumero.style.border = "2px solid #444";
    tdNumero.style.padding = "4px";
    tdNumero.style.textAlign = "center";

    const tdNome = tr.insertCell();
    tdNome.textContent = aluno.nome;
    tdNome.style.border = "2px solid #444";
    tdNome.style.padding = "4px";
    tdNome.textAlign = "left";
    tdNome.style.fontSize = "small";
    tdNome.style.fontWeight = "500";

    const tdStatus = tr.insertCell();
    tdStatus.textContent = aluno.estado;
    tdStatus.style.border = "2px solid #444";
    tdStatus.style.padding = "2px";
    tdStatus.style.textAlign = "center";
    tdStatus.style.background = cor;
    tdStatus.style.color = "white";
    tdStatus.style.fontWeight = "bold";

    const tdObs = tr.insertCell();
    tdObs.textContent = aluno.observacao || "Nenhuma";
    tdObs.style.border = "2px solid #444";
    tdObs.textAlign = "left";
    tdObs.style.fontSize = "x-small";
    tdObs.style.fontWeight = "500";
  });
}

function baixarJSON(dadosChamada) {
  const jsonString = JSON.stringify(dadosChamada, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });

  const linkJson = document.createElement("a");
  linkJson.href = URL.createObjectURL(blob);
  linkJson.download = `Chamada do dia: ${dadosChamada.Data || "Data não relatada"}.json`;
  document.body.appendChild(linkJson); // Adiciona o link à página (necessário para alguns navegadores)

  linkJson.click();
  URL.revokeObjectURL(linkJson.href); // Remove dá memória
}

async function baixarPDF(dadosChamada) {
  // html2pdf é carregado pelo script do HTML
  // Preenche a tabela antes de renderizar
  preencherTabelaChamada(dadosChamada);
  const turma = localStorage.getItem("Turma");
  const conteudoPdf = document.getElementById("conteudo-pdf");
  if (!conteudoPdf) {
    alert("Elemento HTML não encontrado (id=conteudo-pdf).");
    return;
  }
  // Garante que o conteúdo esteja visível para renderização, mas ele não fica visível
  // depois pelo finally volta a ficar invisivel

  try {
    conteudoPdf.classList.remove("Hidden");
    await new Promise((resolve) => setTimeout(resolve, 200));
    await html2pdf()
      .set({
        margin: 10,
        filename: `Chamada ${turma} do dia: ${dadosChamada.Data || "Data não relatada"}.pdf`,

        image: {
          type: "jpeg",
          quality: 1,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
        },
        jsPDF: {
          unit: "mm", // pdf medido em milímetros
          format: [200, 690],
          orientation: "portrait",

          pagebreak: {
            mode: ["avoid-all", "css", "legacy"], //avoid: evitar cortes Css: respeita regras css leagcy: Suporte a libs antigos
          },
        },
      })
      .from(conteudoPdf)
      .save();
  } catch (erro) {
    console.log("Erro ao fazer downloud do PDF: ", erro);
    alert("Ocorreu um erro ao gerar o PDF. Verifique o console");
  } finally {
    conteudoPdf.classList.add("Hidden");
  }
}

const btnBaixarJSON = document.getElementById("button-baixar-json");
const btnBaixarPDF = document.getElementById("button-baixar-pdf");

function obterDadosESalvarTabelaEmMemoria() {
  const { dadosChamada } = coletarDadosChamada();
  preencherTabelaChamada(dadosChamada);
  return dadosChamada;
}
// Abrir Dialogo de finalização
document.getElementById("Salvar_Chamada").addEventListener("click", () => {
  document.getElementById("SalvarChamadaDig").showModal();
});
let NomeMonitorPDF = document.getElementById("Nome_Monitor");
let CodMPdf = document.getElementById("Codigo_Monitor");
const CodM = document.getElementById("CodigoMonitor");
const nomeM = document.getElementById("Nome");
CodM.addEventListener("change", () => {
  CodMPdf.textContent = CodM.value;
});
nomeM.addEventListener("change", () => {
  NomeMonitorPDF.textContent = nomeM.value;
});

const Diag_estastiscas = document.getElementById("StatusChamada_dig");
btnBaixarJSON?.addEventListener("click", async () => {
  const dataChamada = localStorage.getItem("data_chamada");
  if (!dataChamada) {
    EventDig.showModal();
    EventDigText.textContent =
      "Você deve inserir a data que fez a chamada antes de salvar!";
    return;
  }
  if (CodM.value.trim() === "" || nomeM.value.trim() === "") {
    EventDig.showModal();
    EventDigText.textContent = "Preencha todos os campo vazios!";
    return;
  }
  const valor = await Validar();
  if (valor === 1) {
    EventDig.showModal();
    EventDigText.textContent = "Senha Incorreta!";
    return;
  }
  const dadosChamada = obterDadosESalvarTabelaEmMemoria();
  baixarJSON(dadosChamada);
  const { Total_Presentes, Total_Ausentes, Total_Desistentes } =
    coletarDadosChamada().totais;
  Diag_estastiscas.showModal();
  Diag_estastiscas.querySelector("h2").textContent =
    "JSON Baixado com Sucesso!";
  Diag_estastiscas.querySelector("p").innerText =
    `📌 Alunos Presentes: ${Total_Presentes}\n📌 Alunos Ausentes: ${Total_Ausentes}\n📌 Alunos Desistentes: ${Total_Desistentes}`;
});
btnBaixarPDF?.addEventListener("click", async () => {
  const dataChamada = localStorage.getItem("data_chamada");
  if (!dataChamada) {
    EventDig.showModal();
    EventDigText.textContent =
      "Você deve inserir a data que fez a chamada antes de salvar!";
    return;
  }
  if (CodM.value.trim() === "" || nomeM.value.trim() === "") {
    EventDig.showModal();
    EventDigText.textContent = "Preencha todos os campo vazios!";
    return;
  }
  const valor = await Validar();
  if (valor === 1) {
    EventDig.showModal();
    EventDigText.textContent = "Senha Incorreta!";
    return;
  }
  const dadosChamada = obterDadosESalvarTabelaEmMemoria();
  const { Total_Presentes, Total_Ausentes, Total_Desistentes } =
    coletarDadosChamada().totais;
  const totalP = document.getElementById("TotalP_PDF");
  const totalF = document.getElementById("TotalF_PDF");
  const totalD = document.getElementById("TotalD_PDF");
  if (totalP) totalP.textContent = Total_Presentes;
  if (totalF) totalF.textContent = Total_Ausentes;
  if (totalD) totalD.textContent = Total_Desistentes;
  await baixarPDF(dadosChamada);

  Diag_estastiscas.showModal();
  Diag_estastiscas.querySelector("h2").textContent = "PDF Baixado com Sucesso!";
  Diag_estastiscas.querySelector("p").innerText =
    `📌 Alunos Presentes: ${Total_Presentes}\n📌 Alunos Ausentes: ${Total_Ausentes}\n📌 Alunos Desistentes: ${Total_Desistentes}`;
});
// FUNÇÕES DO MENU DE CONFIG + fechar Dig salvar chamada
const menu = document.getElementById("Menu_Config");
const Salvar_chamada = document.getElementById("SalvarChamadaDig");
AbrirMenuConf.addEventListener("click", () => {
  if (!menu) return;
  menu.showModal();
});
document.querySelectorAll(".FecharConfgSalvarDig").forEach((btn) => {
  btn.addEventListener("click", () => {
    const dialog = btn.closest("dialog");
    if (dialog) dialog.close();
  });
});
// Navegação com TAB (ACESSIBILIDADE)
AbrirMenuConf.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    // Se a tecla ENTER ou ESPAÇO for pressionados
    event.preventDefault(); // Impede comportamento do navegador, pois ESPAÇO rola a PG
    AbrirMenuConf.click();
  }
});
// Defenir estilos dos blocos de alunos - Menu de configurações
const rowEstilo = document.getElementById("row_style_btn");
const RetEstilo = document.getElementById("ret_style_btn");
const SecaoQtnCols = document.getElementById("Seção-QtnCols");
const SecaoTamLinhas = document.getElementById("Seção-Tamanholinhas");
const posicionamentoAtual = document.getElementById("PosView");

function MudarEstiloBlocos(estilo) {
  const BlocosAlunos = document.querySelectorAll(".BlocoAlunos");
  const img = document.querySelectorAll(".OBS_img");
  switch (estilo) {
    case "linha":
      SecaoQtnCols.classList.add("Hidden");
      SecaoTamLinhas.classList.remove("Hidden");
      if (!BlocosAlunos) return;
      TurmasBloco.setAttribute("data-estilo", "Linhas");
      BlocosAlunos.forEach((Bloco) => {
        Bloco.setAttribute("data-estilo", "Linhas");
      });
      const tamanhoSalvo = parseInt(localStorage.getItem("tamanholinear"));
      if (tamanhoSalvo) {
        DefTamanhoLinha(tamanhoSalvo);
      }
      img.forEach((ImgObs) => {
        ImgObs.setAttribute("data-estilo", "Linhas");
      });
      if (!posicionamentoAtual) return;
      posicionamentoAtual.textContent = "LINEARES";
      if (!SecaoQtnCols) return;
      break;
    case "retangulo":
      SecaoTamLinhas.classList.add("Hidden");
      SecaoQtnCols.classList.remove("Hidden");
      if (!BlocosAlunos) return;
      TurmasBloco.setAttribute("data-estilo", "Retangulos");
      BlocosAlunos.forEach((Bloco) => {
        Bloco.setAttribute("data-estilo", "Retangulos");
      });
      const colsSalvas = parseInt(localStorage.getItem("Ncolunas"));
      if (colsSalvas) {
        DefNumCols(colsSalvas);
      }
      img.forEach((ImgObs) => {
        ImgObs.setAttribute("data-estilo", "Retangulos");
      });
      if (!posicionamentoAtual) return;
      posicionamentoAtual.textContent = "RETÂNGULARES";
  }
}
rowEstilo.addEventListener("click", () => {
  MudarEstiloBlocos("linha");
  localStorage.setItem("Estilo", "linha");
});
RetEstilo.addEventListener("click", () => {
  MudarEstiloBlocos("retangulo");
  localStorage.setItem("Estilo", "retangulo");
});
// Manipulação da quantidade de colunas (Apenas para RETANGULAR)
const Numinfo = document.getElementById("Messagecols");
const Col1 = document.getElementById("1col");
const Col2 = document.getElementById("2col");
const Col3 = document.getElementById("3col");
const Col4 = document.getElementById("4col");
const Col5 = document.getElementById("5col");
const Col6 = document.getElementById("6col");
const maxCols = document.getElementById("MaxCols");
// Se o estilo for linear a função n executa
function DefNumCols(NumCols) {
  if (getComputedStyle(SecaoQtnCols).display === "none") return; // verifica estilo real do documento, mais confiavel para este caso
  if (TurmasBloco.getAttribute("data-estilo") === "Linhas") return;
  switch (NumCols) {
    case 1:
      TurmasBloco.style.maxWidth = "500px";
      Numinfo.textContent = "1";
      break;
    case 2:
      TurmasBloco.style.maxWidth = "1000px";
      Numinfo.textContent = "2";
      break;
    case 3:
      TurmasBloco.style.maxWidth = "1500px";
      Numinfo.textContent = "3";
      break;
    case 4:
      TurmasBloco.style.maxWidth = "2000px";
      Numinfo.textContent = "4";
      break;
    case 5:
      TurmasBloco.style.maxWidth = "2500px";
      Numinfo.textContent = "5";
      break;
    case 6:
      TurmasBloco.style.maxWidth = "2900px";
      Numinfo.textContent = "6";
      break;
    case 7:
      TurmasBloco.style.maxWidth = "100%";
      Numinfo.textContent = "MÁXIMO POSSÍVEL";
      break;
    default:
      break;
  }
}
Col1.addEventListener("click", () => {
  DefNumCols(1);
  localStorage.setItem("Ncolunas", 1);
});
Col2.addEventListener("click", () => {
  DefNumCols(2);
  localStorage.setItem("Ncolunas", 2);
});
Col3.addEventListener("click", () => {
  DefNumCols(3);
  localStorage.setItem("Ncolunas", 3);
});
Col4.addEventListener("click", () => {
  DefNumCols(4);
  localStorage.setItem("Ncolunas", 4);
});
Col5.addEventListener("click", () => {
  DefNumCols(5);
  localStorage.setItem("Ncolunas", 5);
});
Col6.addEventListener("click", () => {
  DefNumCols(6);
  localStorage.setItem("Ncolunas", 6);
});
maxCols.addEventListener("click", () => {
  DefNumCols(7);
  localStorage.setItem("Ncolunas", 7);
});
// Aumentar tamanho das linhas (Apenas para LINEAR)
const TamanhoLinha30 = document.getElementById("tam30%");
const TamanhoLinha40 = document.getElementById("tam40%");
const TamanhoLinha50 = document.getElementById("tam50%");
const TamanhoLinha60 = document.getElementById("tam60%");
const TamanhoLinha70 = document.getElementById("tam70%");
const TamanhoLinha80 = document.getElementById("tam80%");
const TamanhoLinha90 = document.getElementById("tam90%");
const TamanhoLinha100 = document.getElementById("tam100%");
const TamanhoAtual = document.getElementById("Messagelinha");
// Funciona apenas se o estilo for linear
function DefTamanhoLinha(porcentagem) {
  if (getComputedStyle(SecaoTamLinhas).display === "none") return;
  if (TurmasBloco.getAttribute("data-estilo") === "Retangulos") return;
  switch (porcentagem) {
    case 30:
      TurmasBloco.style.maxWidth = "30%";
      TamanhoAtual.textContent = "30% DA TELA";
      break;
    case 40:
      TurmasBloco.style.maxWidth = "40%";
      TamanhoAtual.textContent = "40% DA TELA";
      break;
    case 50:
      TurmasBloco.style.maxWidth = "50%";
      TamanhoAtual.textContent = "50% DA TELA";
      break;
    case 60:
      TurmasBloco.style.maxWidth = "60%";
      TamanhoAtual.textContent = "60% DA TELA";
      break;
    case 70:
      TurmasBloco.style.maxWidth = "70%";
      TamanhoAtual.textContent = "70% DA TELA";
      break;
    case 80:
      TurmasBloco.style.maxWidth = "80%";
      TamanhoAtual.textContent = "80% DA TELA";
      break;
    case 90:
      TurmasBloco.style.maxWidth = "90%";
      TamanhoAtual.textContent = "90% DA TELA";
      break;
    case 100:
      TurmasBloco.style.maxWidth = "100%";
      TamanhoAtual.textContent = "100% DA TELA";
      break;
    default:
      break;
  }
}

TamanhoLinha30.addEventListener("click", () => {
  DefTamanhoLinha(30);
  localStorage.setItem("tamanholinear", 30);
});
TamanhoLinha40.addEventListener("click", () => {
  DefTamanhoLinha(40);
  localStorage.setItem("tamanholinear", 40);
});
TamanhoLinha50.addEventListener("click", () => {
  DefTamanhoLinha(50);
  localStorage.setItem("tamanholinear", 50);
});
TamanhoLinha60.addEventListener("click", () => {
  DefTamanhoLinha(60);
  localStorage.setItem("tamanholinear", 60);
});
TamanhoLinha70.addEventListener("click", () => {
  DefTamanhoLinha(70);
  localStorage.setItem("tamanholinear", 70);
});
TamanhoLinha80.addEventListener("click", () => {
  DefTamanhoLinha(80);
  localStorage.setItem("tamanholinear", 80);
});
TamanhoLinha90.addEventListener("click", () => {
  DefTamanhoLinha(90);
  localStorage.setItem("tamanholinear", 90);
});
TamanhoLinha100.addEventListener("click", () => {
  DefTamanhoLinha(100);
  localStorage.setItem("tamanholinear", 100);
});

// Limpar armazenamento local do navegador
const DialogApagar = document.getElementById("ApagarDadosDig");
document.getElementById("LimparDadosBTN").addEventListener("click", () => {
  DialogApagar.showModal();
});
document.getElementById("APAGAR").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
document.getElementById("CANCELAR").addEventListener("click", () => {
  DialogApagar.close();
});

// Alterar tema (claro/escuro) - Menu de configurações
const TemaAtual = document.getElementById("TemaAtual");
const temas = {
  Dark: {
    bg1: "#1a1a1a",
    bg2: "#2b2b2b",
    bg3: "#3d3d3d",
    color05: "#f5f5f5",
    color10: "#e5e7eb",
    color30: "#d1d5db",
    color50: "#9ca3af",
    color70: "#6b7280",
    color90: "#374151",
    fieldset: "#00000075",
    ExtraColor1: "#111111",
    ExtraColor2: "#1f1f1f",
    ExtraColor3: "#2f2f2f",
    aviso: "ESCURO",
  },
  Light: {
    bg1: "#1f191994",
    bg2: "#03030393",
    bg3: "#726c6c",
    color05: "#442424",
    color10: "#f0cc02",
    color30: "#050505",
    color50: "#ffffffd2",
    color70: "#2a7e7a",
    color90: "#ffffff5d",
    fieldset: "#1b1818af",
    ExtraColor1: "#180404a6",
    ExtraColor2: "#353336d8",
    ExtraColor3: "#270f0f8e",
    aviso: "CLARO",
  },
  DarkPurple: {
    bg1: "#1a102e",
    bg2: "#2b1b4d",
    bg3: "#4c2a85",
    color05: "#f3e9fe",
    color10: "#e1ccfa",
    color30: "#b98eff",
    color50: "#8a2be2",
    color70: "#5c1d99",
    color90: "#2e0854",
    fieldset: "#07111a",
    ExtraColor1: "#160a24",
    ExtraColor2: "#26113d",
    ExtraColor3: "#3d1d63",
    aviso: "PURPLE",
  },
  Blue: {
    bg1: "#0f2027",
    bg2: "#203a43",
    bg3: "#2c5364",
    color05: "#d9edf7",
    color10: "#bce8f1",
    color30: "#99c9ff",
    color50: "#198eee",
    color70: "#31708f",
    color90: "#002ead",
    fieldset: "#00000075",
    ExtraColor1: "#07111a",
    ExtraColor2: "#0f172a",
    ExtraColor3: "#1e293b",
    aviso: "BLUE",
  },
  Red: {
    bg1: "#2b0a0a",
    bg2: "#4a1010",
    bg3: "#661a1a",
    color05: "#fde2e2",
    color10: "#f8b4b4",
    color30: "#ff9999",
    color50: "#ef4444",
    color70: "#b91c1c",
    color90: "#7f1d1d",
    fieldset: "#00000075",
    ExtraColor1: "#1a0505",
    ExtraColor2: "#2b0a0a",
    ExtraColor3: "#450a0a",
    aviso: "RED",
  },
  Green: {
    bg1: "#052e16",
    bg2: "#064e3b",
    bg3: "#065f46",
    color05: "#dcfce7",
    color10: "#bbf7d0",
    color30: "#86efac",
    color50: "#22c55e",
    color70: "#15803d",
    color90: "#166534",
    fieldset: "#00000075",
    ExtraColor1: "#022c22",
    ExtraColor2: "#052e16",
    ExtraColor3: "#064e3b",
    aviso: "GREEN",
  },
  Pink: {
    bg1: "#2b0a1a",
    bg2: "#4a1028",
    bg3: "#701a3d",
    color05: "#fce7f3",
    color10: "#fbcfe8",
    color30: "#f9a8d4",
    color50: "#ec4899",
    color70: "#be185d",
    color90: "#831843",
    fieldset: "#00000075",
    ExtraColor1: "#1f0712",
    ExtraColor2: "#2b0a1a",
    ExtraColor3: "#500724",
    aviso: "PINK",
  },
};
function MudarTema(tema) {
  const temaEscolhido = temas[tema];
  if (!temaEscolhido) return;
  document.documentElement.style.setProperty("--bg1", temaEscolhido.bg1);
  document.documentElement.style.setProperty("--bg2", temaEscolhido.bg2);
  document.documentElement.style.setProperty("--bg3", temaEscolhido.bg3);
  document.documentElement.style.setProperty(
    "--fieldset",
    temaEscolhido.fieldset,
  );
  document.documentElement.style.setProperty(
    "--ExtraColor1",
    temaEscolhido.ExtraColor1,
  );
  document.documentElement.style.setProperty(
    "--ExtraColor2",
    temaEscolhido.ExtraColor2,
  );
  document.documentElement.style.setProperty(
    "--ExtraColor3",
    temaEscolhido.ExtraColor3,
  );
  document.documentElement.style.setProperty(
    "--color05",
    temaEscolhido.color05,
  );
  document.documentElement.style.setProperty(
    "--color10",
    temaEscolhido.color10,
  );
  document.documentElement.style.setProperty(
    "--color30",
    temaEscolhido.color30,
  );
  document.documentElement.style.setProperty(
    "--color50",
    temaEscolhido.color50,
  );
  document.documentElement.style.setProperty(
    "--color70",
    temaEscolhido.color70,
  );
  document.documentElement.style.setProperty(
    "--color90",
    temaEscolhido.color90,
  );
  document.documentElement.style.setProperty(
    "--color05",
    temaEscolhido.color05,
  );
  TemaAtual.textContent = temaEscolhido.aviso;
  localStorage.setItem("Tema", tema);
}
document.getElementById("tema_Escuro").addEventListener("click", () => {
  MudarTema("Dark");
});
document.getElementById("tema_Azul").addEventListener("click", () => {
  MudarTema("Blue");
});
document.getElementById("tema_Claro").addEventListener("click", () => {
  MudarTema("Light");
});
document.getElementById("tema_DarkPurple").addEventListener("click", () => {
  MudarTema("DarkPurple");
});
document.getElementById("tema_red").addEventListener("click", () => {
  MudarTema("Red");
});
document.getElementById("tema_green").addEventListener("click", () => {
  MudarTema("Green");
});
document.getElementById("tema_pink").addEventListener("click", () => {
  MudarTema("Pink");
});
// Remover avisos
function MostrarEsconderAvisos(aparencia) {
  const avisos = document.querySelectorAll(".Avisos");
  switch (aparencia) {
    case "Oculto":
      avisos.forEach((aviso) => {
        if (!aviso) return;
        aviso.classList.add("Hidden");
        removerAvisos.textContent = "MOSTRAR AVISOS";
      });
      break;
    case "Visível":
      avisos.forEach((aviso) => {
        aviso.classList.remove("Hidden");
      });
      removerAvisos.textContent = "OCULTAR AVISOS";
    default:
      break;
  }
}
const removerAvisos = document.getElementById("Ocultar_avisos");
removerAvisos.addEventListener("click", () => {
  let aparenciaAviso = removerAvisos.textContent;
  if (aparenciaAviso === "MOSTRAR AVISOS") {
    MostrarEsconderAvisos("Visível");
    localStorage.setItem("Aparencia_Avisos", "Visível");
  } else {
    MostrarEsconderAvisos("Oculto");
    localStorage.setItem("Aparencia_Avisos", "Oculto");
  }
});
removerAvisos.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    removerAvisos.click();
  }
});
// Mudar input password para text
const carinhaHash = document.getElementById("hashHV");
carinhaHash.addEventListener("click", () => {
  const input = document.getElementById("hash");
  if (carinhaHash.textContent === "😚") {
    carinhaHash.textContent = "🙂";
    input.type = "text";
    return;
  }
  if (carinhaHash.textContent === "🙂") {
    carinhaHash.textContent = "😚";
    input.type = "password";
  }
});
const carinhamcod = document.getElementById("CodMHV");
carinhamcod.addEventListener("click", () => {
  const input = document.getElementById("CodigoMonitor");
  if (carinhamcod.textContent === "😚") {
    carinhamcod.textContent = "🙂";
    input.type = "text";
    return;
  }
  if (carinhamcod.textContent === "🙂") {
    carinhamcod.textContent = "😚";
    input.type = "password";
  }
});
async function Validar() {
  const hashes = {
    "1C": "f8638b979b2f4f793ddb6dbd197e0ee25a7a6ea32b0ae22f5e3c5d119d839e75", // 5678
    "2C": "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4", // 1234
    "1B": "b7768fbb1847758d75c3ee28c3e2391e70c6ee29f7ce19847822bd5a7381ac67", // 1090
  };

  const turma = localStorage.getItem("Turma");
  if (!turma || !hashes[turma]) {
    console.error("Turma inválida:", turma);
    return 1;
  }
  const Hs = hashes[turma];
  const senhains = document.getElementById("hash").value;
  const encoder = new TextEncoder();
  const data = encoder.encode(senhains);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashGerado = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  console.log("Hash gerado:", hashGerado);
  console.log("Hash esperado:", Hs);
  if (hashGerado === Hs) {
    return 0;
  } else {
    return 1;
  }
}
// Carregar dados salvos no localstorage
document.addEventListener("DOMContentLoaded", () => {
  const turmasalva = localStorage.getItem("Turma");
  if (turmasalva) {
    renderizarturma(turmasalva);
    selectTurmas.value = turmasalva;
  }
  const TemaSalvo = localStorage.getItem("Tema");
  if (TemaSalvo) MudarTema(TemaSalvo);
  const AparenciaAvisoSalva = localStorage.getItem("Aparencia_Avisos");
  if (AparenciaAvisoSalva) MostrarEsconderAvisos(AparenciaAvisoSalva);

  // Carrega data salva (se existir) quando o site recarrega
  const dataSalva = localStorage.getItem("data_chamada");
  if (dataSalva) {
    const input = document.getElementById("Data_Chamada_input");
    if (input) input.value = dataSalva;

    DiaChamadaPDF.textContent = dataSalva;
  }
});
function restaurarelementos() {
  const btn_alunos = TurmasBloco.querySelectorAll(".btn-alunos");
  btn_alunos.forEach((botao) => {
    const estadoSalvo = localStorage.getItem(botao.id);
    if (estadoSalvo) {
      MudarDeEstado(botao, estadoSalvo);
    }
  });
  const EstiloSalvo = localStorage.getItem("Estilo");
  if (EstiloSalvo) MudarEstiloBlocos(EstiloSalvo);
  const NumcolsSalvo = parseInt(localStorage.getItem("Ncolunas"));
  if (NumcolsSalvo) DefNumCols(NumcolsSalvo);
  const TamanhoLinhaSalvo = parseInt(localStorage.getItem("tamanholinear"));
  if (TamanhoLinhaSalvo) DefTamanhoLinha(TamanhoLinhaSalvo);
}
