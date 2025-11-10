
const form = document.getElementById("userForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();


    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const email = document.getElementById("email").value.trim();
    const idade = parseInt(document.getElementById("idade").value.trim());
    const curso = document.getElementById("curso").value.trim();
    const periodo = document.getElementById("periodo").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const camposValidos =
      nome.length >= 3 && nome.length <= 50 &&
      sobrenome.length >= 3 && sobrenome.length <= 50 &&
      emailRegex.test(email) &&
      idade > 0 && idade < 120 &&
      curso.length >= 2 &&
      periodo.length >= 1;

    if (camposValidos) {
      const dados = { nome, sobrenome, email, idade, curso, periodo };
      localStorage.setItem("dadosUsuario", JSON.stringify(dados));
      window.location.href = "confirmation.html";
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  });
}

const dadosDiv = document.getElementById("dados");
if (dadosDiv) {
  const dados = JSON.parse(localStorage.getItem("dadosUsuario"));

  if (!dados) {
    alert("Nenhum dado encontrado. Redirecionando para o formulário.");
    window.location.href = "form.html";
  } else {
    dadosDiv.innerHTML = `
      <p><strong>Nome:</strong> ${dados.nome} ${dados.sobrenome}</p>
      <p><strong>Email:</strong> ${dados.email}</p>
      <p><strong>Idade:</strong> ${dados.idade}</p>
      <p><strong>Curso:</strong> ${dados.curso}</p>
      <p><strong>Período:</strong> ${dados.periodo}</p>
    `;
  }

  const btnEditar = document.getElementById("editar");
  if (btnEditar) {
    btnEditar.addEventListener("click", () => {
      window.location.href = "form.html";
    });
  }

  const btnConfirmar = document.getElementById("confirmar");
  if (btnConfirmar) {
    btnConfirmar.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(dados, null, 2)], {
        type: "application/json"
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "data.json";
      link.click();

      window.location.href = "index.html";
    });
  }
}

const perfilDiv = document.getElementById("perfil");
if (perfilDiv) {
  const dados = JSON.parse(localStorage.getItem("dadosUsuario"));

  if (!dados) {
    window.location.href = "form.html";
  } else {
    perfilDiv.innerHTML = `
      <p><strong>Nome:</strong> ${dados.nome} ${dados.sobrenome}</p>
      <p><strong>Email:</strong> ${dados.email}</p>
      <p><strong>Idade:</strong> ${dados.idade}</p>
      <p><strong>Curso:</strong> ${dados.curso}</p>
      <p><strong>Período:</strong> ${dados.periodo}</p>
    `;
  }
}