import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { authentication, db } from "../firebase/firebase-config";
import { AuthErrorHandler } from "../utils/handleFirebaseError";
import { isStringEmpty } from "../utils/string";

export const userObject = {
  uid: "",
  is_admin: false,
  user_role: ["worker"], //worker //requester // approver // admin
  name: "",
  avatar: "",
  cpf: "",
  email: "",
  phone: "",
  birth_date: "",
  cnpj: "",
  nome_fantasia: "",
  endereco: {
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
    cidade: "",
    uf: "",
    pais: "",
  },
  observation: "",
  services: "",
  donwloadable_content: "",
  is_approved: false,
  created_at: 0,
  updated_at: 0,
};

export const requestObject = {
  uid: "",
  requester_id: "", //anonimous ou ID do requester
  worker_id: "", // empty in case of proposal open or request for especific user
  proposal: "",
  amount: 0,
  phone: "",
  email: "",
  status: "", // open, in_progress, done, paid, finish
  created_at: 0,
  updated_at: 0,
  status_history: [{ status_old: "", status_new: "", updated_at: 0 }],
};

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getUserByID(id) {
    const usersRef = doc(db, "users", id);
    const userSnap = await getDoc(usersRef);
    const user = userSnap.data();

    return user;
  }

  async function createRequest(data) {
    const newRequest = {
      ...requestObject,
      ...data,
    };
    try {
      await setDoc(doc(db, "request", data.uid), newRequest);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async function getAllWorkers() {
    const usersRef = collection(db, "users");
    const result = getDocs(usersRef)
      .then((snap) => {
        const usersArray = [];
        snap.docs.forEach((doc) => {
          usersArray.push(doc.data());
        });
        return usersArray;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    return result;
  }

  async function getRequestsCurrentUser() {
    const requestsRef = collection(db, "request");
    const requestsResult = query(
      requestsRef,
      where("worker_id", "==", user.uid)
    );
    const requestList = [];
    const querySnapshot = await getDocs(requestsResult);

    querySnapshot.forEach((doc) => {
      requestList.push(doc.data());
    });
    
    return requestList;
  }

  function signInUser(email, password) {
    if (isStringEmpty(email)) {
      const status = {
        status: false,
        message: "O campo email não foi preenchido",
      };
      return status;
    }
    if (isStringEmpty(password)) {
      const status = {
        status: false,
        message: "O campo senha não foi preenchido",
      };
      return status;
    }

    return signInWithEmailAndPassword(authentication, email, password)
      .then(async (re) => {
        const currentUser = await getUserByID(re.user.uid);
        setUser(currentUser);
        const status = {
          user: currentUser,
          status: true,
        };
        return status;
      })
      .catch((err) => {
        const status = {
          status: false,
          message: AuthErrorHandler[err.code],
          err,
        };

        console.error("Erro", status);
        return status;
      });
  }

  function logout() {
    signOut(authentication)
      .then(() => {
        setUser(null);
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error("Erro", error);
        alert(`Houve um erro ao tentar sair. Tente novamente mais tarde`);
      });
  }

  async function registerUser({ email, password, user }) {
    return createUserWithEmailAndPassword(authentication, email, password)
      .then(async (re) => {
        const newUser = {
          uid: re.user.uid,
          ...user,
        };
        try {
          await setDoc(doc(db, "users", re.user.uid), newUser);
          setUser(newUser);
          setIsLoggedIn(true);
          return true;
        } catch (err) {
          alert(
            "Houve um erro ao cadastrar o usuario. Tente novamente mais tarde"
          );
          console.error("Erro", err);
          return false;
        }
      })
      .catch((err) => {
        alert(AuthErrorHandler[err.code]);
        return false;
      });
  }

  function handleForgotUser(email) {
    if (isStringEmpty(email)) {
      alert("O campo email não foi preenchido");
      return true;
    }

    sendPasswordResetEmail(authentication, email)
      .then(() => {
        alert("Foi enviado um email com as instruções de recuperação.");
      })
      .catch((err) => {
        console.error(err);
        alert(AuthErrorHandler[[err.code]]);
      });
  }

  async function updateUserByID(id, data) {
    const userData = await getUserByID(id);

    const userUpdated = {
      ...userData,
      ...data,
    };
    try {
      await setDoc(doc(db, "users", id), userUpdated);

      setUser(userUpdated);

      return true;
    } catch (err) {
      console.error(err);
      alert(
        `Houve um erro ao atualizar dados do usuário. Tente novamente mais tarde`
      );
      return false;
    }
  }

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(async (user) => {
      if (user) {
        const currentUser = await getUserByID(user.uid);
        setUser(currentUser);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInUser,
        logout,
        registerUser,
        user,
        isLoggedIn,
        handleForgotUser,
        getAllWorkers,
        getUserByID,
        createRequest,
        getRequestsCurrentUser,
        updateUserByID
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
