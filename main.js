// Aguarda o carregamento da página e pega a div "root" do index.html
const rootElement = document.getElementById('root');

// Inicializa o React 18
const root = ReactDOM.createRoot(rootElement);

// Renderiza o aplicativo NekoVerse na tela
root.render(<App />);