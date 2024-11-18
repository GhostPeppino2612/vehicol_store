import axios from "axios";
import { Veicolo } from "../DB";

const MAILGUN_API_KEY = process.env.REACT_APP_MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.REACT_APP_MAILGUN_DOMAIN;
const MAILGUN_URL = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;

export const sendPurchaseEmail = async (username: string, veicolo: Veicolo, email: string) => {
  const emailContent = `
    Gentile ${username},

    Grazie per il tuo acquisto! Ecco i dettagli del veicolo:

    Brand: ${veicolo.brand}
    Modello: ${veicolo.modello}
    Tipo: ${veicolo.tipo}
    Anno: ${veicolo.anno}
    Kilometri: ${veicolo.kilometri}
    Alimentazione: ${veicolo.alimentazione}
    Prezzo: €${veicolo.prezzo.toLocaleString()}

    Un nostro consulente ti contatterà presto per finalizzare l'acquisto.

    Cordiali saluti,
    Il team del Concessionario
  `;

  const formData = new URLSearchParams();
  formData.append("from", `Concessionario <noreply@${MAILGUN_DOMAIN}>`);
  formData.append("to", email);
  formData.append("subject", "Conferma Acquisto Veicolo");
  formData.append("text", emailContent);

  try {
    const response = await axios.post(MAILGUN_URL, formData, {
      headers: {
        Authorization: `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
      },
    });

    console.log("Email inviata con successo:", response.data);
    alert("Email inviata con successo");
    return response.data;
  } catch (error) {
    console.error("Errore durante l'invio dell'email:", error);
    throw new Error("Errore nell'invio dell'email");
  }
};
