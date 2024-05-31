const RoomPage = ({ setRoom, setIsAuth }) => {
    // form gönderilince tetiklenicek
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // inputtaki değeri al
      const room = e.target[0].value;
  
      // kullanıcının seçtiği odayı state'e aktar
      setRoom(room.toLowerCase());
    };
  
    return (
      <form onSubmit={handleSubmit} className="room-page">
        <h1>Chat Room</h1>
  
        <p>Which room will you login?</p>
  
        <input type="text" placeholder="ör:Course room" required />
  
        <button type="submit">Login</button>
        <button
          onClick={() => {
            // yetki state'ini false'a çekerek oda logine yönlendir
            setIsAuth(false);
            // local'deki kaydı kaldır
            localStorage.removeItem('token');
          }}
          type="button"
        >
          Log Out
        </button>
      </form>
    );
  };
  
  export default RoomPage;