import { useEffect, useState } from "react";
import { FaCamera, FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Button from "../components/Button";
import Input from "../components/Input";
import InputUpload from "../components/InputUpload";
import Textarea from "../components/Textarea";
import { userObject } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/pages/Profile.module.css";
import {
  cep as cepMask, cnpj as cnpjMask, cpf as cpfMask, date, phone as phoneMask
} from "../utils/masks";
import { dateToString, stringToDate } from "../utils/string";
import { uploadImageAsync } from "../utils/uploadImageAsync";
import validateField from "../utils/validateField";

import { getCepInformation } from "../utils/cep";

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateUserByID } = useAuth();

  const [isView, setIsView] = useState(true);

  const [name, setName] = useState("")
  const [CPF, setCPF] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [birth_date, setBirthDate] = useState("")
  const [CNPJ, setCNPJ] = useState("")
  const [nome_fantasia, setNomeFantasia] = useState("")
  const [CEP, setCEP] = useState("")
  const [numero, setNumero] = useState("")
  const [logradouro, setLogradouro] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [UF, setUF] = useState("")
  const [pais, setPais] = useState("")
  const [services, setServices] = useState("")
  const [donwloadable_content, setDonwloadableContent] = useState("")
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const handleFilePreview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    setFile(file);
    reader.onloadend = (e) => {
      setSelectedImage(reader.result);
    };
  };

  const handleFilesPreview = (e) => {
    setFiles(e.target.files);
  };


  function validate() {
    if (validateField(CPF, "CPF")) return true;
    if (validateField(phone, "Whatsapp")) return true;
    if (validateField(birth_date, "Data de nascimento")) return true;
    if (validateField(services, "Serviços")) return true;
    if (validateField(donwloadable_content, "Anexo")) return true;

    return false;
  }

  async function handleOnSubmit() {
    setIsView(true);

    if (validate()) return;

    let uploadURLavatar = "";
    if (file) {
      uploadURLavatar = await uploadImageAsync(file, "users");
    } else {
      uploadURLavatar = selectedImage;
    }

    let uploadURLImages = [];
    if (files) {
      for (const file of files) {
        const newUrl = await uploadImageAsync(file, "users-attachments");
        uploadURLImages.push(newUrl);
      }
    }

    const data = {
      ...userObject,
      ...user,
      name,
      avatar: uploadURLavatar,
      cpf: CPF,
      email,
      phone,
      birth_date: stringToDate(birth_date).getTime(),
      cnpj: CNPJ,
      nome_fantasia,
      endereco: {
        logradouro,
        numero,
        bairro,
        cep: CEP,
        cidade,
        uf: UF,
        pais
      },
      observation: user.observation + `\nAtualizou o cadastro ${dateToString(Date.now())}`,
      services,
      donwloadable_content: uploadURLImages,
      is_approved: true,
      updated_at: Date.now(),
    };

    if(await updateUserByID(user.uid, data)) return navigate("/painel");
  }

  const handleCep = async () => {
    if (CEP.length === 9) {
      const resultCep = await getCepInformation(CEP);
      if (resultCep.status === 200) {
        setBairro(resultCep.data.bairro);
        setLogradouro(resultCep.data.logradouro);
        setCidade(resultCep.data.localidade);
        setUF(resultCep.data.uf);
        setPais("Brasil");
      }
    }
  };

  useEffect(() => {
    setIsView(!location.pathname.includes("edit"));
  }, [location.pathname]);

  useEffect(() => {
    if (user) {
      setName(user.name)
      setCPF(user.cpf)
      setEmail(user.email)
      setPhone(user.phone)
      setBirthDate(dateToString(user.birth_date))
      setCNPJ(user.cnpj)
      setNomeFantasia(user.nome_fantasia)
      setCEP(user.endereco.cep)
      setLogradouro(user.endereco.logradouro)
      setNumero(user.endereco.numero)
      setBairro(user.endereco.bairro)
      setCidade(user.endereco.cidade)
      setUF(user.endereco.uf)
      setPais(user.endereco.pais)
      setServices(user.services)
      setDonwloadableContent(user.donwloadable_content)
      setSelectedImage(user.avatar)
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <header className={styles.mainHeader}>
          <h2>Perfil</h2>
          {
            isView ?
              <Button transparent onClick={() => setIsView(false)}>
                <FaEdit />
                Editar
              </Button> :
              <div className={styles.inputGroup} style={{ justifyContent: 'flex-end'}}>
                <Button style={{backgroundColor: "#EA5656"}} onClick={() => navigate("/painel")}>
                  <FaTrash />
                  Cancelar
                </Button>
                <Button style={{backgroundColor: "#28a745"}} onClick={() => handleOnSubmit()}>
                  <FaSave />
                  Salvar
                </Button>
              </div>
          }
        </header>
        <main className={styles.mainContent}>
          <fieldset className={styles.fieldsetContainer}>
            <legend className={styles.legend} >Sobre você</legend>

            <div className={styles.inputGroupGrid}>
              <label className={styles.uploadButton}>
                <input
                  disabled={isView}
                  required
                  className={styles.uploadInput}
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => handleFilePreview(e)}
                ></input>
                {selectedImage ? (
                  <div
                    alt="Imagem Selecionada"
                    style={{
                      background: `url(${selectedImage}) no-repeat center center`,
                      borderRadius: "0.8rem",
                      width: "100%",
                      height: "100%",
                      backgroundSize: "cover",
                    }}
                  ></div>
                ) : (
                  <FaCamera />
                )}
              </label>
              <div>
                <Input
                  disabled={isView}
                  id="name"
                  type="text"
                  label="Nome completo"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }} />
                <div className={styles.inputGroup}>
                  <Input
                    disabled={isView}
                    required
                    id="cpf"
                    type="text"
                    label="CPF"
                    maxLength={14}
                    value={CPF}
                    onChange={(e) => {
                      setCPF(cpfMask(e.target.value));
                    }} />
                  <Input
                    disabled={true}
                    id="email"
                    type="text"
                    label="Email"
                    required
                    value={email}
                    tip="Email não pode ser alterado manualmente."
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }} />
                  <Input
                    disabled={isView}
                    id="whatsapp/celular"
                    type="text"
                    label="Whatsapp/Celular"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(phoneMask(e.target.value));
                    }} />
                </div>
                <div className={styles.inputGroup}>
                  <Input
                    disabled={isView}
                    id="birth_date"
                    type="date"
                    label="Data de nascimento"
                    value={birth_date}
                    onChange={(e) => {
                      setBirthDate(date(e.target.value));
                    }} />
                  <Input
                    disabled={isView}
                    id="CNPJ"
                    type="text"
                    label="CNPJ"
                    tip="Completar com CNPJ aumentam as chances de receber contatos"
                    value={CNPJ}
                    maxLength={18}
                    onChange={(e) => {
                      setCNPJ(cnpjMask(e.target.value));
                    }} />
                  <Input
                    disabled={isView}
                    id="nome_fantasia"
                    type="text"
                    label="Nome fantasia"
                    placeholder=""
                    value={nome_fantasia}
                    onChange={(e) => {
                      setNomeFantasia(e.target.value);
                    }} />
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset className={styles.fieldsetContainer}>
            <legend className={styles.legend} >Endereço de contato</legend>

            <Input
              disabled={isView}
              id="cep"
              type="text"
              label="CEP"
              onBlur={handleCep}
              maxLength={9}
              tip="Digite seu CEP para procurar automaticamente o endereço."
              value={CEP}
              onChange={(e) => {
                setCEP(cepMask(e.target.value));
              }} />
            <div className={styles.inputGroup}>
              <Input
                disabled={isView}
                id="logradouro"
                type="text"
                label="Logradouro"
                placeholder=""
                value={logradouro}
                onChange={(e) => {
                  setLogradouro(e.target.value);
                }} />
              <Input
                disabled={isView}
                id="numero"
                type="text"
                label="Numero"
                placeholder=""
                value={numero}
                onChange={(e) => {
                  setNumero(e.target.value);
                }} />
              <Input
                disabled={isView}
                id="bairro"
                type="text"
                label="Bairro"
                placeholder=""
                value={bairro}
                onChange={(e) => {
                  setBairro(e.target.value);
                }} />
            </div>
            <div className={styles.inputGroup}>
              <Input
                disabled={isView}
                id="cidade"
                type="text"
                label="Cidade"
                placeholder=""
                value={cidade}
                onChange={(e) => {
                  setCidade(e.target.value);
                }} />
              <Input
                disabled={isView}
                id="uf"
                type="text"
                label="Estado"
                placeholder=""
                value={UF}
                onChange={(e) => {
                  setUF(e.target.value);
                }} />
              <Input
                disabled={isView}
                id="pais"
                type="text"
                label="País"
                placeholder=""
                value={pais}
                onChange={(e) => {
                  setPais(e.target.value);
                }} />
            </div>

          </fieldset>
          <fieldset className={styles.fieldsetContainer}>
            <legend className={styles.legend} >Sobre seu serviços</legend>
            <Textarea
              disabled={isView}
              id="resumo"
              type="text"
              label="Resumo"
              rows={6}
              tip="Faça seu comercial de 30 segundos ou conte sobre os serviços que voce faz. Essa é uma area livre para você chamar a atenção do seu cliente"
              value={services}
              onChange={(e) => {
                setServices(e.target.value);
              }} />
            <InputUpload
              disabled={isView}
              label="Anexo"
              id="donwloadable_content"
              attachment={[donwloadable_content]}
              onChange={(e) => handleFilesPreview(e)}
              accept="image/png, image/jpeg"
              tip="Selecione uma imagem contendo informações dos seus serviços para as pessoas fazerem o download"
            />
          </fieldset>
        </main>
      </div>
    </div>
  );
}

export default Profile;
