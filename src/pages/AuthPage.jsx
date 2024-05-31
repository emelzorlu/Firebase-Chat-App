import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/config';

const AuthPage = ({ setIsAuth }) => {
  // giriş butonuna tıklanırsa
  const handleClick = () => {
    signInWithPopup(auth, provider)
      // başarıyla giriş yaparsa çalışır
      .then((data) => {
        console.log(data.user);

        // kullanıcının yetkisini true'ya çek
        setIsAuth(true);

        // kullanıcı bilgisini local'de sakla
        localStorage.setItem('token', data.user.refreshToken);
      });
  };

  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Room</h1>
        <p>Login to continue</p>
        <button onClick={handleClick}>
          <img src="/g-logo.png" />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;