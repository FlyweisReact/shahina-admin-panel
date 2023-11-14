/** @format */

import HOC from "../../layout/HOC";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  arrayUnion,
  getDocs,
  getDoc,
} from "firebase/firestore";
import Message from "./Message";
import { auth, db } from "./firebase";
import ChatMenu from "./ChatMenu";
import SendMessage from "./SendMessage";

const Chat = () => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [collections, setCollections] = useState([]);
  const [document, setDocument] = useState(null);
  const [documentId, setDocumentId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "Chat"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, [db]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    // Cleanup subscription
    return unsubscribe;
  }, [initializing]);

  // Get All Document Of Collection
  const fetchChatDocuments = async () => {
    const chatCollectionRef = collection(db, "Chat");
    try {
      const snapshot = await getDocs(chatCollectionRef);
      const chatDataArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setCollections(chatDataArray);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchChatDocuments();
  }, []);

  // ---------------

  // Get Single Document
  const fetchDocumentData = async () => {
    const documentRef = doc(db, "Chat", documentId);
    try {
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        setDocument(documentSnapshot.data());
      } else {
        console.log("Document does not exist!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  useEffect(() => {
    fetchDocumentData();
  }, [documentId]);
  // ------------------

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.log(e);
    }
  };

  if (initializing) return "Loading...";

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const documentRef = doc(db, "Chat", documentId);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    try {
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        const existingData = documentSnapshot.data();
        const updatedReply = [
          ...existingData.reply,
          { text: newMessage, type: "reciver", date: formattedDate },
        ];
        await updateDoc(documentRef, { reply: updatedReply });
        fetchDocumentData();
        setNewMessage("");
      } else {
        console.log("Document does not exist!");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <>
      <section className="sectionCont">
        <div className="pb-4   w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Banners ({data?.length})
          </span>
          <div className="d-flex gap-2 flex-wrap">
            <Link to="/create-home-banner">
              <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider">
                HomePage Banner
              </button>
            </Link>
            <Link to="/create-partner-banner">
              <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider">
                Partner Banner
              </button>
            </Link>
            <Link to="/create-shop-banner">
              <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider">
                Shop Banner
              </button>
            </Link>
            <Link to="/create-service-banner">
              <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider">
                Service Banner
              </button>
            </Link>
            <Link to="/create-promotion-banner">
              <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider">
                Promotion Banner
              </button>
            </Link>

            <button
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
              onClick={() => setModalShow(true)}
            >
              Create Banner
            </button>
          </div>
        </div>
        {user ? (
          <>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <button onClick={() => googleSignIn()}> sing in with google </button>
        )}
        <div className="chat">
          <div className="sidebar">
            <ChatMenu collections={collections} setDocumentId={setDocumentId} />
          </div>
          <div className="content">
            <SendMessage
              document={document}
              setNewMessage={setNewMessage}
              handleOnSubmit={handleOnSubmit}
              newMessage={newMessage}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(Chat);
