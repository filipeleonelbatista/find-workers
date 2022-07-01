import { useEffect, useState } from "react";
import { FaCheckSquare, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/pages/Dashboard.module.css";
import { dateToString } from "../utils/string";

import noData from "../assets/images/empty_list.svg";
import Button from "../components/Button";
import MessagesImage from "../components/MessagesImage";

function Dashboard() {
  const navigate = useNavigate();
  const { user, getRequestsCurrentUser } = useAuth();
  const [requestList, setRequestList] = useState([]);
  const [requestLength, setRequestLength] = useState(0);
  const [isCompleteProfile, setIsCompleteProfile] = useState(false);

  useEffect(() => {
    const executeAsync = async () => {
      const requests = await getRequestsCurrentUser();
      setRequestLength(requests.length);
      setRequestList(requests);
    };
    executeAsync();

    setIsCompleteProfile(
      user.is_approved
    );
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <header className={styles.mainHeader}>
          <h2>Principal</h2>
        </header>
        <main className={styles.mainContent}>
          {isCompleteProfile ? (
            <div className={styles.veicleContainer}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3>Contatos no site </h3>
                <span className={styles.counter}>{requestLength}</span>
              </div>
              {requestList.length > 0 ? (
                <>
                  {requestList.map((request) => (
                    <div key={request.uid} className={styles.veicleItem}>
                      <div><b>Solicitante</b>: {request.requester_id}</div>
                      <div>
                        <b>Telefone: </b>{request.phone} <br />
                        <b>Email: </b>{request.email}
                      </div>
                      <div><b>Proposta: </b> <br />{request.proposal}</div>
                      <div><b>Envio  em: </b> <br />{dateToString(new Date(request.created_at))}</div>
                    </div>
                  ))}
                </>
              ) : (
                <MessagesImage
                  source={noData}
                  title="Não temos solicitações no momento!"
                  paragraph="Aguarde para receber solicitações. Elas aparecerão aqui quando estiverem disponíveis."
                />
              )}
            </div>
          ) : (
            <MessagesImage
              source={noData}
              title="Seus dados não estão completos!"
              paragraph="Complete seus dados para receber solicitações."
            >
              <Button onClick={() => navigate("/perfil")}>
                Atualizar meu perfil
              </Button>
            </MessagesImage>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
