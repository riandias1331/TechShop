import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div>
      <main>
        <div className="home-container">
          <div className="home-content">
            <h1>Bem-vindo à Nossa Plataforma</h1>
            <p>Faça login para acessar recursos exclusivos e uma experiência personalizada.</p>
            <div className="home-actions">
              <Link to="/login" className="home-button primary">
                Fazer Login
              </Link>
              <Link to="/register" className="home-button secondary">
                Criar Conta
              </Link>
            </div>
             {/* 🔐 LOGIN COM GOOGLE */}
            <div className="social-login">
              <button
                onClick={handleGoogleLogin}
                className="home-button google"
              >
                Entrar com Google
              </button>
            </div>


            <div className="forgot-password">
              Esqueceu sua senha? <Link to="/recovery">Recuperar acesso</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


// import { Link } from 'react-router-dom';
// import './Home.css';

// export default function Home() {
//   return (
//     <div className="home-container">
//       <div className="home-content">
//         <h1>Bem-vindo à Nossa Plataforma</h1>
//         <p>Faça login para acessar recursos exclusivos e uma experiência personalizada.</p>
        
//         <div className="home-actions">
//           <Link to="/login" className="home-button primary">
//             Fazer Login
//           </Link>
//           <Link to="/register" className="home-button secondary">
//             Criar Conta
//           </Link>
//         </div>
        
//         <div className="forgot-password">
//           Esqueceu sua senha? <Link to="/recovery">Recuperar acesso</Link>
//         </div>
//       </div>
//     </div>
//   );
// }