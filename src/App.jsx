import React, { useState } from 'react';
import { BookOpen, Brain, CheckCircle, XCircle, RotateCcw, Award, ArrowRight, ArrowLeft, GraduationCap } from 'lucide-react';

// --- DATA: Flashcards (20 Cards) ---
const flashcardsData = [
  { id: 1, front: "Qual a PDU da Camada de Transporte?", back: "Segmento." },
  { id: 2, front: "Qual a PDU da Camada de Rede?", back: "Pacote." },
  { id: 3, front: "Qual a PDU da Camada de Enlace?", back: "Quadro (Frame)." },
  { id: 4, front: "Quantos bits tem um endereço IPv4?", back: "32 bits (Decimal)." },
  { id: 5, front: "Quantos bits tem um endereço IPv6?", back: "128 bits (Hexadecimal)." },
  { id: 6, front: "Quantos bits tem um endereço MAC?", back: "48 bits (Hexadecimal)." },
  { id: 7, front: "O que significa a sigla DNS?", back: "Domain Name System (Traduz nomes em IPs)." },
  { id: 8, front: "Qual porta padrão do HTTP e HTTPS?", back: "HTTP: 80, HTTPS: 443." },
  { id: 9, front: "Qual o comando para ver a tabela ARP no Windows?", back: "arp -a" },
  { id: 10, front: "O que é 'Store-and-Forward'?", back: "Método de switch que recebe o quadro inteiro e verifica erros (FCS) antes de enviar." },
  { id: 11, front: "O que substitui o ARP no IPv6?", back: "ND (Neighbor Discovery) via ICMPv6." },
  { id: 12, front: "Qual a função do TTL (Time-to-Live)?", back: "Evitar loops infinitos. Diminui a cada salto (roteador)." },
  { id: 13, front: "O que é EMI?", back: "Interferência Eletromagnética (afeta cabos de cobre)." },
  { id: 14, front: "Fibra Monomodo usa LED ou Laser?", back: "Laser (núcleo pequeno, longa distância)." },
  { id: 15, front: "Qual topologia para se o cabo principal romper?", back: "Barramento (Bus)." },
  { id: 16, front: "Diferença Half-Duplex vs Full-Duplex?", back: "Half: Um por vez (Walkie-talkie). Full: Simultâneo (Telefone)." },
  { id: 17, front: "Quais as 3 etapas do Handshake TCP?", back: "SYN -> SYN-ACK -> ACK." },
  { id: 18, front: "Comando para ver tabela de roteamento Cisco?", back: "show ip route" },
  { id: 19, front: "Endereço MAC de Broadcast?", back: "FF-FF-FF-FF-FF-FF" },
  { id: 20, front: "Camada responsável por Criptografia?", back: "Camada 6 - Apresentação." },
];

// --- DATA: Quiz (40 Questions) ---
const quizData = [
  // --- FUNDAMENTOS ---
  {
    id: 1,
    question: "Qual dispositivo conecta redes diferentes (ex: LAN e WAN) e escolhe o melhor caminho?",
    options: ["Switch", "Hub", "Roteador", "Repetidor"],
    correct: 2,
    explanation: "O Roteador opera na Camada 3 e toma decisões de roteamento baseadas em endereços IP."
  },
  {
    id: 2,
    question: "Qual topologia possui um ponto central de falha, mas é fácil de instalar e gerenciar?",
    options: ["Malha (Mesh)", "Estrela (Star)", "Barramento (Bus)", "Anel (Ring)"],
    correct: 1,
    explanation: "A topologia Estrela usa um switch/hub central. Se ele falhar, a rede para, mas se um cabo de PC falhar, só aquele PC para."
  },
  {
    id: 3,
    question: "Qual a principal desvantagem da topologia em Barramento?",
    options: ["Custo alto.", "Difícil configuração.", "Se o cabo principal romper, toda a rede cai.", "Requer switches caros."],
    correct: 2,
    explanation: "No barramento, todos compartilham o mesmo cabo backbone. Uma ruptura afeta todos."
  },
  
  // --- CAMADA FÍSICA (MOD 4) ---
  {
    id: 4,
    question: "O que é 'Goodput'?",
    options: ["Velocidade teórica da rede.", "Dados úteis transferidos (sem cabeçalhos/overhead) em um período.", "O mesmo que largura de banda.", "Latência da rede."],
    correct: 1,
    explanation: "Goodput é a medida de dados de aplicação utilizáveis que chegam ao destino, descontando os cabeçalhos de protocolo."
  },
  {
    id: 5,
    question: "Qual a vantagem da Fibra Óptica sobre o cabo UTP?",
    options: ["Mais barata.", "Mais fácil de instalar.", "Imunidade total a EMI e RFI.", "Usa conectores RJ-45."],
    correct: 2,
    explanation: "Como a fibra transmite luz (não eletricidade), ela não sofre interferência eletromagnética."
  },
  {
    id: 6,
    question: "Qual característica define a Fibra Multimodo?",
    options: ["Núcleo pequeno, usa Laser.", "Núcleo grande, usa LED, distâncias curtas.", "Núcleo grande, usa Laser, distâncias intercontinentais.", "Feita de cobre."],
    correct: 1,
    explanation: "Multimodo tem núcleo maior (62.5 microns), permitindo vários modos de luz (LED), ideal para LANs internas."
  },
  {
    id: 7,
    question: "O cancelamento em cabos UTP é obtido através de:",
    options: ["Blindagem de alumínio.", "Fios trançados em pares.", "Isolamento de borracha grossa.", "Uso de conectores de ouro."],
    correct: 1,
    explanation: "O trançamento dos pares de fios faz com que os campos magnéticos se cancelem, reduzindo o ruído."
  },

  // --- ENLACE DE DADOS & SWITCHING (MOD 6/7) ---
  {
    id: 8,
    question: "Qual subcamada Ethernet lida com o hardware e acesso ao meio?",
    options: ["LLC", "MAC", "IP", "TCP"],
    correct: 1,
    explanation: "A subcamada MAC (Media Access Control) é a parte inferior da camada de Enlace, lidando com endereçamento físico."
  },
  {
    id: 9,
    question: "Qual é o tamanho mínimo e máximo de um quadro Ethernet (sem Jumbo)?",
    options: ["32 e 1024 bytes", "64 e 1518 bytes", "128 e 9000 bytes", "10 e 100 bytes"],
    correct: 1,
    explanation: "O padrão Ethernet define o mínimo de 64 bytes (para detecção de colisão) e máximo de 1518 bytes."
  },
  {
    id: 10,
    question: "Qual método de switching é o mais rápido (menor latência) mas encaminha erros?",
    options: ["Store-and-forward", "Cut-through", "Fragment-free", "Routing"],
    correct: 1,
    explanation: "Cut-through começa a enviar assim que lê o endereço de destino, sem verificar o FCS (erros) no final."
  },
  {
    id: 11,
    question: "O que o switch faz se não encontrar o MAC de destino na sua tabela?",
    options: ["Descarta o quadro.", "Envia de volta ao remetente.", "Inunda (Flood) para todas as portas exceto a de origem.", "Pergunta ao roteador."],
    correct: 2,
    explanation: "Isso é chamado de 'Unknown Unicast Flooding'. O switch envia para todos para tentar achar o destino."
  },
  {
    id: 12,
    question: "Qual endereço MAC representa um Broadcast na Camada 2?",
    options: ["00-00-00-00-00-00", "192.168.1.255", "FF-FF-FF-FF-FF-FF", "AA-BB-CC-DD-EE-FF"],
    correct: 2,
    explanation: "FF-FF-FF-FF-FF-FF significa 'todos os bits 1', instruindo todos os dispositivos a processarem o quadro."
  },
  {
    id: 13,
    question: "O que é Auto-MDIX?",
    options: ["Ajuste automático de velocidade.", "Detecção automática de cabo direto ou crossover.", "Protocolo de roteamento.", "Tipo de fibra."],
    correct: 1,
    explanation: "Auto-MDIX permite que o switch detecte o tipo de cabo conectado e ajuste a transmissão/recepção automaticamente."
  },

  // --- REDE & ROTEAMENTO (MOD 8) ---
  {
    id: 14,
    question: "Qual campo do cabeçalho IPv4 impede que pacotes fiquem em loop eterno?",
    options: ["Versão", "TTL (Time to Live)", "Checksum", "Source IP"],
    correct: 1,
    explanation: "O TTL é um contador decrescente. Se chegar a 0, o roteador descarta o pacote e envia mensagem de erro."
  },
  {
    id: 15,
    question: "Na tabela de roteamento, o código 'C' indica:",
    options: ["Rota Estática.", "Rota Conectada Diretamente.", "Rota OSPF.", "Rota Padrão."],
    correct: 1,
    explanation: "C (Connected) refere-se a redes configuradas nas próprias interfaces ativas do roteador."
  },
  {
    id: 16,
    question: "O que é uma Rota Estática?",
    options: ["Uma rota que muda sozinha.", "Uma rota configurada manualmente pelo administrador.", "Uma rota aprendida via OSPF.", "Uma rota de erro."],
    correct: 1,
    explanation: "Rotas estáticas (S) são inseridas manualmente e não se adaptam a mudanças na rede automaticamente."
  },
  {
    id: 17,
    question: "Qual a função do 'Gateway Padrão' (Default Gateway)?",
    options: ["Identificar o PC na rede.", "Servir como porta de saída para redes remotas.", "Traduzir nomes DNS.", "Evitar vírus."],
    correct: 1,
    explanation: "É o IP do roteador local. Sem ele, o PC só fala com a rede local (LAN) e não acessa a Internet (WAN)."
  },
  {
    id: 18,
    question: "O comando 'netstat -r' no Windows exibe:",
    options: ["Tabela MAC.", "Tabela de Roteamento do Host.", "Configuração de IP.", "Cache DNS."],
    correct: 1,
    explanation: "Exibe a tabela de rotas que o sistema operacional usa para decidir onde enviar pacotes."
  },

  // --- ARP & ENDEREÇAMENTO (MOD 5/9) ---
  {
    id: 19,
    question: "Qual o propósito do protocolo ARP?",
    options: ["Descobrir o IP de um site.", "Mapear endereço IP (L3) para endereço MAC (L2).", "Criptografia.", "Roteamento dinâmico."],
    correct: 1,
    explanation: "ARP permite descobrir o endereço físico (MAC) local associado a um IP conhecido."
  },
  {
    id: 20,
    question: "O ARP Request é enviado como ___ e o ARP Reply como ___.",
    options: ["Unicast, Broadcast", "Broadcast, Unicast", "Multicast, Unicast", "Broadcast, Broadcast"],
    correct: 1,
    explanation: "O pedido é 'gritado' para todos (Broadcast). A resposta vem apenas do dono do IP (Unicast)."
  },
  {
    id: 21,
    question: "Endereços IPv6 têm ___ bits e são escritos em ___.",
    options: ["32, Decimal", "48, Hexadecimal", "128, Hexadecimal", "128, Binário"],
    correct: 2,
    explanation: "IPv6 expandiu o espaço de endereçamento para 128 bits, usando notação hexadecimal (ex: 2001:db8::1)."
  },
  {
    id: 22,
    question: "O IPv6 usa ARP?",
    options: ["Sim, igual ao IPv4.", "Não, usa ND (Neighbor Discovery).", "Não, usa DHCP.", "Sim, mas chama-se ARPv6."],
    correct: 1,
    explanation: "O IPv6 aboliu o broadcast e o ARP. Ele usa mensagens ICMPv6 Neighbor Solicitation/Advertisement."
  },
  
  // --- TRANSPORTE (CAP 3) ---
  {
    id: 23,
    question: "Qual característica define o protocolo UDP?",
    options: ["Confiável e lento.", "Orientado a conexão.", "Sem conexão e 'melhor esforço' (não confiável).", "Reordena pacotes."],
    correct: 2,
    explanation: "UDP apenas envia (fire and forget). É rápido, mas não garante entrega nem ordem. Ideal para streaming."
  },
  {
    id: 24,
    question: "O TCP usa qual mecanismo para garantir a entrega?",
    options: ["Broadcast.", "Acknowledgments (ACKs).", "Best Effort.", "CSMA/CD."],
    correct: 1,
    explanation: "No TCP, o receptor envia um ACK para confirmar o recebimento. Se o emissor não receber o ACK, ele reenvia."
  },
  {
    id: 25,
    question: "Quais flags são usadas no estabelecimento de conexão TCP?",
    options: ["SYN, SYN-ACK, ACK", "FIN, ACK, FIN", "GET, POST, ACK", "UDP, TCP, IP"],
    correct: 0,
    explanation: "Este é o 'Three-way Handshake' (Aperto de mão em 3 vias) para iniciar uma sessão TCP."
  },
  {
    id: 26,
    question: "Qual a função dos 'Números de Porta'?",
    options: ["Identificar a placa de rede.", "Identificar o roteador.", "Identificar a aplicação/serviço específico (ex: Web, Email).", "Identificar o país."],
    correct: 2,
    explanation: "Portas permitem que várias aplicações usem a rede simultaneamente. Ex: Porta 80 = Web, Porta 25 = Email."
  },
  {
    id: 27,
    question: "O que é 'Flow Control' (Janelas) no TCP?",
    options: ["Evitar colisões.", "O receptor diz ao emissor quanto dados pode receber para não ser sobrecarregado.", "Criptografia.", "Roteamento."],
    correct: 1,
    explanation: "O tamanho da janela (Window Size) ajusta o fluxo de dados para a capacidade de processamento do receptor."
  },

  // --- EXTRA & CONTEXTO ---
  {
    id: 28,
    question: "Em qual camada do modelo TCP/IP atua o protocolo HTTP?",
    options: ["Internet", "Transporte", "Aplicação", "Acesso à Rede"],
    correct: 2,
    explanation: "HTTP é um protocolo de aplicação, usado diretamente pelo software do usuário (navegador)."
  },
  {
    id: 29,
    question: "Qual comando no PC mostra o caminho (saltos) até um destino?",
    options: ["ping", "tracert (ou traceroute)", "ipconfig", "nslookup"],
    correct: 1,
    explanation: "Tracert mostra cada roteador (salto) pelo qual o pacote passa até o destino."
  },
  {
    id: 30,
    question: "Qual o intervalo das 'Portas Bem Conhecidas' (Well-known ports)?",
    options: ["0 a 1023", "1024 a 49151", "49152 a 65535", "0 a 255"],
    correct: 0,
    explanation: "Portas reservadas para serviços de sistema (ex: HTTP 80, FTP 21, SSH 22)."
  },
  {
    id: 31,
    question: "O que é CSMA/CA?",
    options: ["Detecção de colisão (com fio).", "Prevenção de colisão (sem fio/Wi-Fi).", "Roteamento.", "Endereçamento."],
    correct: 1,
    explanation: "Em Wi-Fi (Half-duplex), dispositivos não conseguem detectar colisões enquanto enviam, então usam 'Collision Avoidance' (Prevenção)."
  },
  {
    id: 32,
    question: "Qual par de fios no cabo UTP T568A está nos pinos 1 e 2?",
    options: ["Laranja", "Azul", "Verde", "Marrom"],
    correct: 2,
    explanation: "No padrão T568A, o par Verde ocupa os pinos 1 e 2. (No T568B seria o Laranja)."
  },
  {
    id: 33,
    question: "Qual a função do comando 'nslookup'?",
    options: ["Verificar IP.", "Testar DNS (Resolver nomes).", "Verificar MAC.", "Testar rotas."],
    correct: 1,
    explanation: "Nslookup consulta o servidor DNS para obter o IP de um domínio."
  },
  {
    id: 34,
    question: "O que é Latência?",
    options: ["Quantidade de dados.", "Tempo total (atraso) para um dado ir de um ponto a outro.", "Perda de dados.", "Ruído."],
    correct: 1,
    explanation: "Latência é o tempo de atraso na comunicação."
  },
  {
    id: 35,
    question: "Qual protocolo é usado para 'pingar' um host?",
    options: ["TCP", "ARP", "ICMP", "HTTP"],
    correct: 2,
    explanation: "O Ping usa mensagens 'Echo Request' e 'Echo Reply' do protocolo ICMP."
  },
  {
    id: 36,
    question: "O cabeçalho IPv4 tem checksum?",
    options: ["Sim.", "Não.", "Às vezes.", "Apenas em WAN."],
    correct: 0,
    explanation: "Sim, o IPv4 verifica integridade do cabeçalho. O IPv6 removeu isso para ser mais rápido (deixando para camadas superiores)."
  },
  {
    id: 37,
    question: "Qual a função do DHCP?",
    options: ["Traduzir nomes.", "Roteamento.", "Configuração automática de host (IP, Máscara, Gateway).", "Segurança."],
    correct: 2,
    explanation: "DHCP evita configuração manual de IPs em cada máquina."
  },
  {
    id: 38,
    question: "Um cabo 'Crossover' serve para conectar:",
    options: ["PC a Switch.", "Switch a Roteador.", "Dispositivos iguais (ex: PC a PC, Switch a Switch).", "PC a Internet."],
    correct: 2,
    explanation: "Crossover inverte os pares de transmissão/recepção, necessário para conectar dispositivos semelhantes (embora o Auto-MDIX resolva isso hoje)."
  },
  {
    id: 39,
    question: "O que é 'Encapsulamento' na camada 4?",
    options: ["Adicionar cabeçalho IP.", "Adicionar cabeçalho TCP/UDP aos dados da aplicação.", "Adicionar MAC.", "Converter em bits."],
    correct: 1,
    explanation: "A camada de transporte pega os dados da aplicação e adiciona portas e controle (TCP/UDP), criando um Segmento."
  },
  {
    id: 40,
    question: "Qual a PDUs na ordem correta (Topo -> Baixo)?",
    options: ["Dados, Segmento, Pacote, Quadro, Bits", "Bits, Quadro, Pacote, Segmento", "Pacote, Quadro, Segmento", "Segmento, Quadro, Pacote"],
    correct: 0,
    explanation: "Aplicação(Dados) -> Transporte(Segmento) -> Rede(Pacote) -> Enlace(Quadro) -> Física(Bits)."
  },
];

// --- COMPONENTES ---

const Flashcard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-full max-w-md h-72 perspective-1000 cursor-pointer mx-auto my-6 group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className="absolute w-full h-full bg-white border-2 border-indigo-100 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center backface-hidden hover:border-indigo-300 transition-colors">
          <div className="bg-indigo-50 p-3 rounded-full mb-4">
            <Brain className="w-8 h-8 text-indigo-600" />
          </div>
          <span className="text-xs font-bold text-indigo-400 mb-3 uppercase tracking-widest">Pergunta</span>
          <p className="text-xl text-center font-bold text-gray-800 leading-relaxed">{card.front}</p>
          <span className="absolute bottom-6 text-sm text-gray-400 font-medium animate-pulse">Toque para virar</span>
        </div>
        
        {/* Back */}
        <div className="absolute w-full h-full bg-indigo-600 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center rotate-y-180 backface-hidden">
          <div className="bg-white/20 p-3 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <span className="text-xs font-bold text-indigo-200 mb-3 uppercase tracking-widest">Resposta</span>
          <p className="text-xl text-center font-medium text-white leading-relaxed">{card.back}</p>
        </div>
      </div>
    </div>
  );
};

const QuizQuestion = ({ data, onAnswer, showFeedback, selectedOption }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto mt-4 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-lg text-sm">
          #{data.id}
        </div>
        <h3 className="text-xl font-bold text-gray-800 leading-snug">{data.question}</h3>
      </div>
      
      <div className="grid gap-3">
        {data.options.map((option, index) => {
          let btnClass = "w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ";
          
          if (showFeedback) {
            if (index === data.correct) {
              btnClass += "bg-green-50 border-green-500 text-green-800 shadow-sm";
            } else if (index === selectedOption) {
              btnClass += "bg-red-50 border-red-500 text-red-800 shadow-sm";
            } else {
              btnClass += "bg-gray-50 border-gray-100 text-gray-400 opacity-60";
            }
          } else {
            btnClass += "bg-white border-gray-100 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md text-gray-700";
          }

          return (
            <button
              key={index}
              className={btnClass}
              onClick={() => !showFeedback && onAnswer(index)}
              disabled={showFeedback}
            >
              <span className="font-medium text-lg">{option}</span>
              {showFeedback && index === data.correct && <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />}
              {showFeedback && index === selectedOption && index !== data.correct && <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />}
              {!showFeedback && <div className="w-4 h-4 rounded-full border-2 border-gray-300 group-hover:border-blue-400"></div>}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className={`mt-6 p-6 rounded-xl border-l-4 animate-fadeIn ${selectedOption === data.correct ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
          <p className={`font-bold text-lg mb-2 flex items-center gap-2 ${selectedOption === data.correct ? 'text-green-800' : 'text-red-800'}`}>
            {selectedOption === data.correct ? "🎉 Mandou bem!" : "❌ Ops, não foi dessa vez."}
          </p>
          <p className="text-gray-700 leading-relaxed text-base">{data.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('home');
  
  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  // Flashcard State
  const [currentCard, setCurrentCard] = useState(0);

  const handleQuizAnswer = (index) => {
    setSelectedOption(index);
    setShowFeedback(true);
    if (index === quizData[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setSelectedOption(null);
      window.scrollTo(0, 0);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(false);
    setSelectedOption(null);
    setQuizFinished(false);
  };

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 max-w-4xl mx-auto">
      <div className="text-center space-y-6 mb-16">
        <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
          <GraduationCap className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">Mestre das Redes <span className="text-blue-600">Pro</span></h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Sua ferramenta definitiva de preparação. Domine topologias, protocolos, camadas OSI e muito mais.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <button 
          onClick={() => setView('flashcards')}
          className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-indigo-100 p-5 rounded-2xl mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
              <Brain className="w-12 h-12 text-indigo-600 group-hover:text-white transition-colors" />
            </div>
            <span className="text-2xl font-bold text-gray-800 mb-2">Flashcards</span>
            <span className="text-gray-500 font-medium">{flashcardsData.length} Cartões de Memória</span>
          </div>
        </button>

        <button 
          onClick={() => setView('quiz')}
          className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-emerald-100 p-5 rounded-2xl mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
              <BookOpen className="w-12 h-12 text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <span className="text-2xl font-bold text-gray-800 mb-2">Simulado Completo</span>
            <span className="text-gray-500 font-medium">{quizData.length} Questões Desafiadoras</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderFlashcards = () => (
    <div className="flex flex-col items-center min-h-[80vh] p-4 max-w-4xl mx-auto">
      <div className="w-full flex justify-between items-center mb-10 mt-6">
        <button onClick={() => setView('home')} className="bg-white border border-gray-200 px-6 py-2 rounded-full text-gray-600 hover:text-blue-600 hover:border-blue-200 font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2">
          <ArrowLeft size={18} /> Voltar
        </button>
        <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-bold text-sm">
          Card {currentCard + 1} de {flashcardsData.length}
        </div>
      </div>

      <div className="w-full max-w-lg">
        <Flashcard card={flashcardsData[currentCard]} />
      </div>

      <div className="flex gap-6 mt-12">
        <button 
          onClick={() => setCurrentCard(prev => Math.max(0, prev - 1))}
          disabled={currentCard === 0}
          className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${currentCard === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 shadow-md hover:shadow-xl hover:text-indigo-600'}`}
        >
          <ArrowLeft /> Anterior
        </button>
        <button 
          onClick={() => setCurrentCard(prev => Math.min(flashcardsData.length - 1, prev + 1))}
          disabled={currentCard === flashcardsData.length - 1}
          className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${currentCard === flashcardsData.length - 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1'}`}
        >
          Próximo <ArrowRight />
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => {
    if (quizFinished) {
      const percentage = Math.round((score / quizData.length) * 100);
      let message = "";
      let color = "";
      
      if (percentage >= 90) { message = "Excelente! Você é um Mestre das Redes!"; color = "text-emerald-600"; }
      else if (percentage >= 70) { message = "Muito bom! Você está pronto."; color = "text-blue-600"; }
      else { message = "Continue estudando, você chega lá!"; color = "text-orange-600"; }

      return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 animate-fadeIn">
          <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full border border-gray-100">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${percentage >= 70 ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-500'}`}>
              <Award className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Simulado Finalizado!</h2>
            <p className="text-gray-500 mb-8 text-lg">{message}</p>
            
            <div className="mb-10">
              <span className={`text-6xl font-black ${color}`}>{percentage}%</span>
              <p className="text-gray-400 mt-2 font-medium">Acertos: {score} de {quizData.length}</p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={resetQuiz}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} /> Tentar Novamente
              </button>
              <button 
                onClick={() => { resetQuiz(); setView('home'); }}
                className="w-full py-4 bg-gray-50 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition border border-gray-200"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto p-4 pb-20">
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-4 z-20">
          <button onClick={() => { resetQuiz(); setView('home'); }} className="text-gray-500 hover:text-red-500 text-sm font-bold px-4 py-2 hover:bg-red-50 rounded-lg transition-colors">
            ✕ Sair
          </button>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Questão {currentQuestion + 1} de {quizData.length}</span>
            </div>
            <div className="w-48 h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-500 ease-out"
                style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <QuizQuestion 
          data={quizData[currentQuestion]} 
          onAnswer={handleQuizAnswer}
          showFeedback={showFeedback}
          selectedOption={selectedOption}
        />

        {showFeedback && (
          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-30 animate-slideUp">
            <div className="max-w-4xl mx-auto flex justify-end">
              <button 
                onClick={nextQuestion}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-3 shadow-lg shadow-blue-200 text-lg hover:-translate-y-1"
              >
                {currentQuestion === quizData.length - 1 ? "Ver Resultado Final" : "Próxima Questão"}
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        )}
        {/* Spacer for fixed bottom bar */}
        {showFeedback && <div className="h-24"></div>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      {view === 'home' && renderHome()}
      {view === 'flashcards' && renderFlashcards()}
      {view === 'quiz' && renderQuiz()}
    </div>
  );
}