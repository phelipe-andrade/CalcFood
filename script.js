const periodoDoDia = document.querySelectorAll('.periodoDoDia button');
const buttonInfo = document.querySelectorAll('.pessoas_geral button');
const resulPratoSele = document.querySelectorAll('.rtg li');
const pratoSelecionado = document.querySelectorAll('.resultadoValores li');
const qtdPessoas = document.querySelectorAll('.pessoas_geral input');

//Ativação dos eventos
function activeEvents() {
  const eventoAtivo = document.querySelectorAll('.lista_evento li');

  if (eventoAtivo.length) {
    function eventoAtivado() {
      //Desmarca e marca o mesmo
      /*if (this.className === 'evento_ativado') {
        this.classList.remove('evento_ativado')
      } else{
        eventoAtivo.forEach((ativo) => {
        ativo.classList.remove('evento_ativado');
        })
        this.classList.add('evento_ativado');
      }*/
      
      eventoAtivo.forEach((ativo) => {
        ativo.classList.remove('evento_ativado');
      });
      
      this.classList.add('evento_ativado');
    };

    eventoAtivo.forEach((ativo) => {
      ativo.addEventListener('click', eventoAtivado);
    });
  }
}
activeEvents();


//Ativação das comidas/bebidas
function activeFood() {
  const ativacaoPratos = document.querySelectorAll ('.resultadoGeral li');
  const ativaH3Resul = document.querySelectorAll ('.resultado_tipos .divAtivo');
  const divCarne = Array.from (document.querySelectorAll('.resultado_carne .rtg li'));
  const divDoces = Array.from (document.querySelectorAll('.resultado_doces .rtg li'));
  const divLanches = Array.from (document.querySelectorAll('.resultado_lanches .rtg li'));
  const divBebidas = Array.from (document.querySelectorAll('.resultado_bebidas .rtg li'));
  console.log(divCarne, divDoces, divLanches, divBebidas);
  if (ativacaoPratos.length) {
    function pratosAtivados(i) {
      resulPratoSele[i].classList.toggle('ativo');
      pratoSelecionado[i].classList.toggle('ativo');
      ativacaoPratos[i].classList.toggle('pratos_ativados');
      
      const h3C = divCarne.some((ativo)=>{
        return ativo.classList[1] === 'ativo';
      })
      const h3D = divDoces.some((ativo)=>{
        return ativo.classList[1] === 'ativo';
      })
      const h3L = divLanches.some((ativo)=>{
        return ativo.classList[1] === 'ativo';
      })
      const h3B = divBebidas.some((ativo)=>{
        return ativo.classList[1] === 'ativo';
      })
      
      
      if(h3C === true)
        ativaH3Resul[0].classList.add('ativo');
      else
        ativaH3Resul[0].classList.remove('ativo');

      if(h3D === true)
        ativaH3Resul[1].classList.add('ativo')
      else
        ativaH3Resul[1].classList.remove('ativo');

      if(h3L === true)
        ativaH3Resul[2].classList.add('ativo')
      else
        ativaH3Resul[2].classList.remove('ativo');

      if(h3B === true)
        ativaH3Resul[3].classList.add('ativo')
      else
        ativaH3Resul[3].classList.remove('ativo');
       



      
    };
    
    ativacaoPratos.forEach((pratos, i) => {
      pratos.addEventListener('click', () => {
      pratosAtivados(i);
      })
    });    
  }



}
activeFood();


// Quantidade de pessoas
function qtdPessoasF() {
  let valor1 = 0;
  let valor2 = 0;
  let valor3 = 0;
  if (buttonInfo.length) {
    function buttonAtivo(i){

      switch (buttonInfo[i].innerText) {
        case "+": {
          if(i === 1){
            if (valor1 >= 0) {
              valor1++;
              qtdPessoas[0].value = valor1;
            }
          }else{
            if(i === 3){
              if (valor2 >= 0) {
                valor2++;
                qtdPessoas[1].value = valor2;
              }
            }else{
              if (valor3 >= 0 && valor3 <= 23) {
                valor3++;
                qtdPessoas[2].value = valor3;
              };
            };
          };
          break;
        }
          
        case "-": {
          if(i === 0){
            if (valor1 > 0) {
              valor1--;
            qtdPessoas[0].value = valor1;
            }
          }else{
            if(i === 2){
              if (valor2 > 0) {
                valor2--;
              qtdPessoas[1].value = valor2;
              }
            }else{
              if (i === 4) {
                if (valor3 > 0) {
                  valor3--;
                  qtdPessoas[2].value = valor3;
                };
              }
              
            };
          };
        }
      };
    };
    buttonInfo.forEach((button, i) => {
      button.addEventListener('click', () =>{
        buttonAtivo(i);
      });
    });
  }
  

}

qtdPessoasF();


//Ativação dos períodos
function activeDay() {
  if (periodoDoDia.length) {
    function periodo_ativado(event) {
      if(event.currentTarget.className == 'periodo_ativado'){
        event.currentTarget.classList.remove('periodo_ativado')
      }else{
        periodoDoDia.forEach((item) =>{
          item.classList.remove('periodo_ativado')
        });
        event.currentTarget.classList.add('periodo_ativado');
      }
    };

    periodoDoDia.forEach((item) =>{
      item.addEventListener('click', periodo_ativado)
    });
  }
}
activeDay();




// Calculos
function result(){
  const eventoSelecionado = document.querySelectorAll('.evento_geral p');
  let valores = [0];
  let periodoSelecionado = 1;
  let duracao = 0;
  function quantidades (i) {
    const pessoas = ((+qtdPessoas[0].value) + ((+qtdPessoas[1].value)*0.5));
    const adultos = (+qtdPessoas[0].value);
    // Ativa o periodo do dia
    switch (i) {
      case 6:
        periodoSelecionado = 1;
        break;
    
      case 7:
        periodoSelecionado = 1.15;
        break;
      
      case 8:
        periodoSelecionado = 1.25;
        break;
    }

    // Calculo da duração da festa
    if (qtdPessoas[2].value > 4 ) {
      duracao = Math.ceil(qtdPessoas[2].value/4)/10-0.1;

    }else{
      duracao = 0
    }
   
    const pessoasTotal = (pessoas*duracao)+pessoas*periodoSelecionado;
    const adultosTotal = (adultos*duracao)+adultos*periodoSelecionado;

     const ativo = function (){

      // Colando o resultado nos pratos
      for(let i = 0; i <= 29; i++){
        pratoSelecionado[i].innerHTML = ((valores[i]*pessoasTotal)/1000).toFixed(1) + " ";
        
        // Pratos que são em unidade
        let unidade = resulPratoSele[i].classList[0];
        if(unidade === 'doc' || unidade === 'cup' || unidade === 'salg' || unidade === 'hot' || unidade === 'pas'){
          pratoSelecionado[i].innerHTML = (valores[i]*pessoasTotal).toFixed(0) + " ";
        }
        // Pizza = 3 por pessoa
        let pizza = 1;
        if(unidade === 'piz'){
          pizza = Math.ceil((valores[i]*(pessoasTotal/3)).toFixed(2));
          pratoSelecionado[i].innerHTML = pizza + " ";
        }
        // Calcula as bebidas alcolicas somente para os adultos
        if(i > 24){
          pratoSelecionado[i].innerHTML = (valores[i]*adultosTotal/1000).toFixed(1) + " ";
        }
      }
    }

    if (pessoas > 0 ) {
      ativo();
    }
  }
  
  function selecionado(evento) {
     const qg = {
      bov: 190,
      fra: 190,
      sui: 140,
      pei: 190,
      cam: 190,
      arr: 60,
      fei: 40,
      mac: 100,
      pur: 150,
      far: 40,
      sal: 60,
      bol: 120,
      doc: 6,
      cup: 1,
      mou: 100,
      pud: 100,
      salg: 13,
      piz: 1,
      hot: 1,
      pip: 10,
      bat: 150,
      pas: 2,
      ref: 500,
      agu: 300,
      suc: 400,
      cer: 800,
      vin: 200,
      cha: 200,
      vod: 250,
      whi: 100,
    }
    /*"Nível de prioridade":
    - Muito baixa: mb = 0.8,
    - Baixa: b = 0.9,
    - Normal: 1 ou nada,
    - Alta: a = 1.1,
    - Muito alta: ma = 1.2,
    */
    const mb = 0.8;
    const b = 0.9;
    const a = 1.1;
    const ma = 1.2;
    switch (evento) {
      case 'casamento': {
        valores = [qg.bov, qg.fra, qg.sui, qg.pei, qg.cam, qg.arr, qg.fei*b, qg.mac, qg.pur, qg.far, qg.sal, qg.bol*a, qg.doc*a, qg.cup, qg.mou, qg.pud, qg.salg*b, qg.piz*mb, qg.hot*mb, qg.pip*mb, qg.bat*b, qg.pas*mb, qg.ref*a, qg.agu, qg.suc, qg.cer*a, qg.vin*a, qg.cha*ma, qg.vod, qg.whi];
        break;
      };
        
      case 'aniversario':{
        valores = [qg.bov*b, qg.fra*b, qg.sui*b, qg.pei*b, qg.cam*b, qg.arr*b, qg.fei*b, qg.mac*b, qg.pur*b, qg.far*b, qg.sal*b, qg.bol*ma, qg.doc*ma, qg.cup, qg.mou, qg.pud, qg.salg*ma, qg.piz, qg.hot*a, qg.pip*ma, qg.bat*ma, qg.pas, qg.ref*ma, qg.agu*a, qg.suc, qg.cer*a, qg.vin*a, qg.cha, qg.vod, qg.whi];
        break;
      };

      case 'festa': {
        valores = [qg.bov*mb, qg.fra*mb, qg.sui*mb, qg.pei*mb, qg.cam*mb, qg.arr*mb, qg.fei*mb, qg.mac*mb, qg.pur*mb, qg.far*mb, qg.sal*mb, qg.bol*mb, qg.doc*b, qg.cup*mb, qg.mou*b, qg.pud*b, qg.salg*ma, qg.piz*ma, qg.hot*ma, qg.pip*b, qg.bat*a, qg.pas, qg.ref*a, qg.agu, qg.suc*a, qg.cer*ma, qg.vin*ma, qg.cha*ma, qg.vod*ma, qg.whi*ma];
        break;
      };

      case 'reuniao': {
        valores = [qg.bov, qg.fra, qg.sui, qg.pei, qg.cam, qg.arr, qg.fei, qg.mac, qg.pur, qg.far, qg.sal, qg.bol*a, qg.doc*a, qg.cup, qg.mou*a, qg.pud*a, qg.salg*ma, qg.piz*ma, qg.hot*ma, qg.pip*b, qg.bat*ma, qg.pas*ma, qg.ref*ma, qg.agu*ma, qg.suc*ma, qg.cer*a, qg.vin*a, qg.cha*a, qg.vod*a, qg.whi*a];
        break;
      };
      
      case 'churrasco': {
        valores = [qg.bov*ma, qg.fra*ma, qg.sui*a, qg.pei*a, qg.cam, qg.arr*a, qg.fei, qg.mac, qg.pur, qg.far*ma, qg.sal*ma, qg.bol*b, qg.doc*mb, qg.cup*mb, qg.mou, qg.pud, qg.salg*mb, qg.piz*mb, qg.hot*mb, qg.pip*mb, qg.bat, qg.pas*mb, qg.ref*ma, qg.agu*ma, qg.suc*ma, qg.cer*ma, qg.vin*a, qg.cha*a, qg.vod*a, qg.whi*a];
        break;
      };

      case 'almoco': {
        valores = [qg.bov, qg.fra, qg.sui, qg.pei, qg.cam, qg.arr, qg.fei, qg.mac, qg.pur, qg.far, qg.sal, qg.bol*mb, qg.doc*mb, qg.cup, qg.mou*a, qg.pud*a, qg.salg*mb, qg.piz*mb, qg.hot*mb, qg.pip*mb, qg.bat*a, qg.pas*mb, qg.ref*a, qg.agu*a, qg.suc*a, qg.cer, qg.vin*a, qg.cha*mb, qg.vod*b, qg.whi*b];
        break;
      };

      case 'janta': {
        valores = [qg.bov, qg.fra, qg.sui, qg.pei, qg.cam, qg.arr, qg.fei, qg.mac, qg.pur, qg.far, qg.sal*ma, qg.bol*mb, qg.doc*mb, qg.cup, qg.mou*a, qg.pud*a, qg.salg*mb, qg.piz*ma, qg.hot*ma, qg.pip*mb, qg.bat*ma, qg.pas*ma, qg.ref*a, qg.agu*a, qg.suc*a, qg.cer*a, qg.vin*a, qg.cha*a, qg.vod*a, qg.whi*a];
        break;
      };

      case 'fralda': {
        valores = [qg.bov, qg.fra, qg.sui, qg.pei, qg.cam, qg.arr, qg.fei, qg.mac, qg.pur, qg.far, qg.sal, qg.bol*ma, qg.doc*ma, qg.cup, qg.mou*ma, qg.pud*ma, qg.salg*ma, qg.piz*ma, qg.hot*ma, qg.pip*a, qg.bat*a, qg.pas, qg.ref*ma, qg.agu*ma, qg.suc*ma, qg.cer*a, qg.vin*a, qg.cha, qg.vod*mb, qg.whi*mb];
        break;
      };

      case 'panela': {
        valores = [qg.bov, qg.fra, qg.sui, qg.pei, qg.cam, qg.arr, qg.fei, qg.mac, qg.pur, qg.far, qg.sal, qg.bol*ma, qg.doc*ma, qg.cup*ma, qg.mou*ma, qg.pud*ma, qg.salg*ma, qg.piz*ma, qg.hot*ma, qg.pip*a, qg.bat*a, qg.pas, qg.ref*ma, qg.agu*ma, qg.suc*ma, qg.cer*a, qg.vin*a, qg.cha, qg.vod*mb, qg.whi*mb];
        break;
      };

      case 'cafe_manha': {
        valores = [qg.bov*mb, qg.fra*mb, qg.sui*mb, qg.pei*mb, qg.cam*mb, qg.arr*mb, qg.fei*mb, qg.mac*mb, qg.pur*mb, qg.far*mb, qg.sal*mb, qg.bol*ma, qg.doc*a, qg.cup, qg.mou*a, qg.pud*a, qg.salg*ma, qg.piz, qg.hot*ma, qg.pip*b, qg.bat*mb, qg.pas*a, qg.ref*ma, qg.agu*ma, qg.suc*ma, qg.cer*b, qg.vin*mb, qg.cha*mb, qg.vod*mb, qg.whi*mb];
        break;
      };
    }  
  }
  

  eventoSelecionado.forEach((evento) => {
    evento.addEventListener('click', () =>{
      selecionado(evento.classList[0]);
      console.log(evento.classList[0]);
      quantidades();
    });
  });

  buttonInfo.forEach((muda, i)=>{
    muda.addEventListener('click', () => {
      quantidades(i);
    });
  });
}

result();

