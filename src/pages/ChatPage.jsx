import { useEffect } from 'react';
import { auth, db } from '../firebase/config';
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { useState } from 'react';
import Message from '../components/Message';

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);

  // mesaj gönderme fonksiyonu
  const sendMessage = async (e) => {
    e.preventDefault();

    // koleksiyonun referansını almak için
    const messagesCol = collection(db, 'messages');

    // koleksiyona yeni döküman eklemek için 
    await addDoc(messagesCol, {
      text: e.target[0].value,
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    // formu sıfırla
    e.target.reset();
  };

  // mevcut odada gönderilen mesajları anlık olarak alır
  useEffect(() => {
    // koleksiyonun referansını al
    const messagesCol = collection(db, 'messages');

    // sorgu ayarlarını oluştur
    const q = query(
      messagesCol,
      where('room', '==', room),
      orderBy('createdAt', 'asc')
    );

    // anlık olarak bir koleksiyondaki değişimleri izler
    // koleksiyon her değiştiğinde verdiğimiz fonksiyon ile
    // koleksiyondaki bütün dökümanlara erişiriz
    onSnapshot(q, (snapshot) => {
      // verilerin geçici olarak tutulacağı boş dizi oluştur
      const tempMsg = [];

      // dökümanlara dön, verilerine eriş
      snapshot.docs.forEach((doc) => {
        tempMsg.push(doc.data());
      });

      // mesajları state'e aktar
      setMessages(tempMsg);
    });
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Course Room</button>
      </header>

      <main>
        {messages.map((data, i) => (
          <Message data={data} key={i} />
        ))}
      </main>

      <form onSubmit={sendMessage}>
        <input type="text" required placeholder="Type your message..." />
        <button>Send</button>
      </form>
    </div>
  );
};

export default ChatPage;