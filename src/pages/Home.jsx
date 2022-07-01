import { FaCheck } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import ctaImage from "../assets/images/cta-image-1.png";
import AcceptTerms from "../components/AcceptTerms";
import Button from "../components/Button";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import HomeNavigation from "../components/HomeNavigation";
import styles from "../styles/pages/Home.module.css";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const { getAllWorkers } = useAuth();
  const [workerList, setWorkerList] = useState([]);

  useEffect(() => {
    const executeAsync = async () => {
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
        {/* CTA */}
        {/* features */}
        <section id="features" className={styles.features}>
          <p>SERVIÇOS</p>
          <h2>Como podemos ajudá-lo a publicar seus serviços?</h2>
          <div className={styles.cardList}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <FaCheck color="#566dea" />
              </div>
              <h2>Cadastre seus serviços</h2>
              <p>
                Cadastre-se e receba contatos pelo site ou direto no seu
                telefone ou email.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <FaCheck color="#566dea" />
              </div>
              <h2>Página de acompanhamento</h2>
              <p>
                Acompanhe os numeros de visitas na sua página e contatos feitos
                em um painel simples.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <FaCheck color="#566dea" />
              </div>
              <h2>Facilidade no registro</h2>
              <p>
                Cadastre seus serviços em apenas 5 etapas simples pode levar
                menos de 5 minutos!
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <FaCheck color="#566dea" />
              </div>
              <h2>Procure por serviços na sua região</h2>
              <p>
                Filtre serviços por localização e encontre os profissionais mais
                perto de você.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <FaCheck color="#566dea" />
              </div>
              <h2>Aprovamos todos os Trabalhadores</h2>
              <p>Trabalhadores aprovados por pessoas e não por robôs.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <FaCheck color="#566dea" />
              </div>
              <h2>Solicite trabalhos</h2>
              <p>Solicite trabalhos diretamente pelo sistema!</p>
            </div>
          </div>
        </section>
        {/* features */}
        

        {/* ctaContact */}
        <section id="contact" className={styles.contact}>
          <h2>Comece a trabalhar o quanto antes com o que gosta!</h2>
          <button onClick={() => navigate("/cadastrar")}>
            Quero cadastrar meus serviços
          </button>
        </section>
        {/* ctaContact */}
        
        {/* workers */}
        <section id="workers" className={styles.workers}>
          <p>Trabalhadores</p>
          <h2>Vejam alguns trabalhadores da plataforma?</h2>
          <div className={styles.workerList}>
            {workerList.slice(0, 4).map((worker) => {
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
                      onClick={() =>
                        navigate(`/trabalhadores/${worker.uid}`)
                      }
                    >
                      Ver mais
                    </Button>
                  </div>
                );
              }
              return null;
            })}
            <div className={styles.worker}>
              <strong>Gostaria de ver mais trabalhadores</strong>
              <p>Veja detalhes sobre suas habilidades e seus contatos.</p>
              <Button onClick={() => navigate("/trabalhadores")}>
                Clique aqui
              </Button>
            </div>
          </div>
        </section>
        {/* features */}

        {/* video */}
        <section id="video" className={styles.video}>
          <div className={styles.videoContainer}>
            <p className={styles.titleVideoContainer}>SOBRE NÓS</p>
            <h2>Entenda quem somos e por que existimos</h2>
            <p className={styles.aboutText}>
              A <b>Find Workers</b> nasceu para os <b>Trabalhadores</b>{" "}
              <b>formais</b> ou <b>informais</b> terem uma forma de receber{" "}
              <b>contatos e solicitações</b> de serviço por um sistema{" "}
              <b>simples e seguro</b> oferecendo <b>intermediação</b> através da
              tecnologia para tornar o contato o mais rápido possível e o
              serviço entregue com o profissional mais próximo de você.
              <br />
              <br />
              Com uma <b>equipe</b> empenhada a encontrar soluções que agregam
              aos <b>Trabalhadores</b> trazendo mais segurança nas relações e
              <b>Pessoas</b> que precisam dos serviços com profissionais
              próximos e qualificados.
            </p>
            <button onClick={() => navigate("/cadastrar")}>
              Quero cadastrar meus serviços agora
            </button>
          </div>
          <div className={styles.videoIframe}>
            <ReactPlayer
              className={styles.videoIframe}
              url="./videos/Cadastrapet.mp4"
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
        </section>
        {/* video */}
        <ContactSection location="Home" />
      </main>
      <Footer />
      <AcceptTerms />
    </div>
  );
}

export default Home;
