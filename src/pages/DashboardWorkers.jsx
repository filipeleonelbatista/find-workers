import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/pages/DashboardWorkers.module.css";

import { nanoid } from "nanoid";
import noData from "../assets/images/empty_list.svg";
import Button from "../components/Button";
import MessagesImage from "../components/MessagesImage";
import { requestObject } from "../context/AuthContext";

function DashboardWorkers() {
  const navigate = useNavigate();
  const { user, getAllWorkers, createRequest } = useAuth();
  const [workerList, setWorkerList] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [workerListLength, setWorkerListLength] = useState(5);

  const [showContact, setShowContact] = useState(false);

  async function handleShowContact(worker_id) {
    const uid = nanoid(12);

    const data = {
      ...requestObject,
      uid,
      worker_id: worker_id,
      requester_id: user.uid,
      proposal: `${user.name} solicitou um serviço pelo painel do site. 
      Email: ${user.email}, 
      Telefone: ${user.phone}. 
      `,
      phone: user.phone,
      email: user.email,
      status: "open",
      status_history: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    if (await createRequest(data)) {
      alert("Sua requisição foi enviada com sucesso")
    } else {
      alert("Houve um problema ao salvar sua requisição")
    }
    setShowContact(true);
    setSelectedWorker(worker_id)
  }

  useEffect(() => {
    const executeAsync = async () => {
      const workers = await getAllWorkers();
      setWorkerList(workers);
    };
    executeAsync();
  }, []);

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <header className={styles.mainHeader}>
            <h2>Trabalhadores</h2>
            <p>Veja a lista de trabalhadores na plataforma</p>
          </header>
          <main className={styles.mainContent}>
            {workerList.length > 0 ? (
              <div className={styles.veicleContainer}>
                {
                  workerList.slice(0, workerListLength).map((worker) => {
                    if (worker.is_approved) {
                      return (
                        <div key={worker.uid} className={styles.workerContainer}>
                          <div className={styles.workerContainerData}>
                            <div
                              style={{
                                background: `url(${worker.avatar}) no-repeat center center`,
                                width: "30rem",
                                height: "40rem",
                                objectFit: "cover",
                                borderRadius: "0.8rem",
                              }}
                            ></div>
                            <Button>Baixar anexo</Button>
                          </div>
                          <div className={styles.workerContainerDescription}>
                            <h2>{worker.name}</h2>
                            <p>{worker.services}</p>
                            <div style={{ padding: "0.8rem" }}>
                              {showContact && selectedWorker === worker.uid ? (
                                <p>
                                  Dados de contato<br /><br />
                                  <b>Email:</b> <a href={"mailto:" + worker.email}>{worker.email}</a>
                                  <br />
                                  <b>Telefone:</b> <a href={"tel:" + worker.phone}>{worker.phone}</a>
                                </p>
                              ) : (
                                <>
                                  <Button onClick={() => handleShowContact(worker.uid)}>
                                    Visualizar dados de contato
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })
                }
                {workerList.length > 5 && (
                  <Button
                    style={{ margin: "4rem 0", width: "35rem" }}
                    onClick={() => setWorkerListLength(workerListLength + 5)}
                  >
                    Ver mais trabalhadores
                  </Button>
                )}
              </div>
            ) : (
              <MessagesImage
                source={noData}
                title="Não foram encontrados trabalhadores no momento!"
                paragraph="Aguarde enquanto trabalhadores se cadastram na plataforma."
              >
                <Button onClick={() => navigate("/perfil")}>
                  Convidar trabalhadores
                </Button>
              </MessagesImage>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default DashboardWorkers;
