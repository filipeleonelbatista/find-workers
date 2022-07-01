import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ctaImage from "../assets/images/cta-image-1.png";
import AcceptTerms from "../components/AcceptTerms";
import Button from "../components/Button";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import HomeNavigation from "../components/HomeNavigation";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import { requestObject } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/pages/Workers.module.css";
import validateField from "../utils/validateField";
import { nanoid } from "nanoid";

function Workers() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getAllWorkers, getUserByID, createRequest } = useAuth();
  const [workerList, setWorkerList] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [counter, setCounter] = useState(5);
  const [showContact, setShowContact] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");

  function validate() {
    if (validateField(name, "nome")) return true;
    if (validateField(email, "email")) return true;
    if (validateField(phone, "celular")) return true;
  }

  async function handleShowContact() {
    if (validate()) return;
    const uid = nanoid(12);
    const data = {
      ...requestObject,
      uid, 
      worker_id: selectedWorker.uid,
      requester_id: "anonymus",
      proposal: `${name} solicitou um serviço pelo site. 
      Email: ${email}, 
      Telefone: ${phone}. 
      Solicitação:
      ${request}
      `,
      phone,
      email,
      status: "open",
      status_history: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    if(await createRequest(data)){ 
      alert("Sua requisição foi enviada com sucesso")
    }else{
      alert("Houve um problema ao salvar sua requisição")
    }


    setShowContact(true);
  }

  function handleLoadMore() {
    if (counter + 3 < workerList.length) {
      setCounter(counter + 3);
    } else {
      if (counter + 2 < workerList.length) {
        setCounter(counter + 2);
      } else {
        if (counter + 1 < workerList.length) {
          setCounter(counter + 1);
        } else {
        }
      }
    }
  }

  useEffect(() => {
    const executeAsync = async () => {
      if (id) {
        const selectedUser = await getUserByID(id);
        setSelectedWorker(selectedUser);
      }
      const workers = await getAllWorkers();
      setWorkerList(workers);
    };
    executeAsync();
  }, []);

  return (
    <div
      id="landing-page"
      // onMouseLeave={handleToggleModal}
      className={styles.container}
    >
      <HomeNavigation />
      <main>
        {/* CTA */}
        <section id="cta" className={styles.cta}>
          <div className={styles.rowContent}>
            <div className={styles.content}>
              <p className={styles.toptitle}>BOAS-VINDAS AO FIND WORKER 👋</p>
              <h2>Exponha seus serviços para quem precisa</h2>
              <u></u>
              <p className={styles.contentSubtitle}>
                Cadastre seus serviços e seja encontrado por pessoas que buscam
                por eles.
              </p>
              <button onClick={() => navigate("/cadastrar")}>
                Cadastrar agora
              </button>
            </div>
            <img
              className={[styles.hideImg, styles.ctaImg]}
              src={ctaImage}
              alt=""
            />
          </div>
        </section>

        <div className={styles.ctaCards}>
          <div className={styles.ctaCard}>
            <h3>+139,3 Mi</h3>
            <p>Trabalhadores no Brasil</p>
          </div>
          <div className={styles.ctaCard}>
            <h3>154,9 mil</h3>
            <p>R$/mes Movimentados</p>
          </div>
          <div className={styles.ctaCard}>
            <h3>17%</h3>
            <p>Mercado na região Sul do Brasil</p>
          </div>
        </div>

        {selectedWorker && (
          <section id="worker" className={styles.workerContainer}>
            <div className={styles.workerContainerData}>
              <div
                style={{
                  background: `url(${selectedWorker.avatar}) no-repeat center center`,
                  width: "30rem",
                  height: "40rem",
                  objectFit: "cover",
                  borderRadius: "0.8rem",
                }}
              ></div>
              <Button>Baixar anexo</Button>
            </div>
            <div className={styles.workerContainerDescription}>
              <h2>{selectedWorker.name}</h2>
              <p>{selectedWorker.services}</p>
              <div style={{ padding: "0.8rem" }}>
                {showContact ? (
                  <p>
                    Dados de contato<br /><br />
                    <b>Email:</b> <a href={"mailto:" + selectedWorker.email}>{selectedWorker.email}</a>
                    <br />
                    <b>Telefone:</b> <a href={"tel:" + selectedWorker.phone}>{selectedWorker.phone}</a>
                  </p>
                ) : (
                  <>
                    <p>
                      Complete o formulario para ter acesso aos dados de contato
                      <br />
                      <br />
                    </p>
                    <Input
                      id="name"
                      label="Seu Nome"
                      placeholder="Digite seu nome"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "0.8rem",
                      }}
                    >
                      <Input
                        id="name"
                        label="Email"
                        placeholder={"Digite seu melhor email"}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Input
                        id="phone"
                        label="Whatsapp"
                        placeholder={"Digite seu whatsapp ou celular"}
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <Textarea
                      id="message"
                      label="Solicitação"
                      placeholder={"Digite sua solicitação detalhada"}
                      rows={4}
                      value={request}
                      onChange={(e) => setRequest(e.target.value)}
                    />
                    <Button onClick={handleShowContact}>
                      Solicitar serviços
                    </Button>
                  </>
                )}
              </div>
            </div>
          </section>
        )}
        <section id="workers" className={styles.workers}>
          <p>Trabalhadores</p>
          <h2>Vejam alguns trabalhadores da plataforma?</h2>
          <div className={styles.workerList}>
            {workerList.slice(0, counter).map((worker) => {
              if (worker.user_role.includes("worker") && worker.is_approved) {
                return (
                  <div key={worker.uid} className={styles.worker}>
                    <div className={styles.workerData}>
                      <img src={worker.avatar} alt={worker.name} />
                      <strong>{worker.name}</strong>
                    </div>
                    <p>
                      {worker.services.length > 100
                        ? worker.services.substr(0, 100) + "..."
                        : worker.services}
                    </p>
                    <Button
                      onClick={() => {
                        setSelectedWorker(worker);
                        navigate(`/trabalhadores/${worker.uid}`);
                      }}
                    >
                      Ver mais
                    </Button>
                  </div>
                );
              }
              return null;
            })}
          </div>
          {workerList.length > 5 && (
            <Button
              style={{ margin: "4rem 0", width: "35rem" }}
              onClick={handleLoadMore}
            >
              Ver mais trabalhadores
            </Button>
          )}
        </section>
        <section id="contact" className={styles.contact}>
          <h2>Comece a trabalhar o quanto antes com o que gosta!</h2>
          <button onClick={() => navigate("/cadastrar")}>
            Quero cadastrar meus serviços
          </button>
        </section>
        <ContactSection location={`WorkersPage`} />
      </main>
      <Footer />
      <AcceptTerms />
    </div>
  );
}

export default Workers;
