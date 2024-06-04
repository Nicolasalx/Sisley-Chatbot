const OpenAI = require("openai");
// const fsPromises = require('fs');
const { readFile } = require('fs/promises');
const path = require('path');

const openai = new OpenAI({
    apiKey: "sk-proj-iMHWdK7eUixu4Geis7vBT3BlbkFJHC7INWXSqZPP8hTgifdN"
});

const allUsers = {
    "a7b60d90-910b-4bb2-b774-a9effbbfb2bf": 11, // Julien Petit
    "d22670cd-aed8-4729-938a-ea4f7bf1cd51": 12, // Laura Moreau
    "a4915ec7-7e79-4283-8bba-51d338c791ff": 13, // Léa Fontaine
    "95b8933f-5209-47ff-a9ed-fd48f6c17240": 15, // Romain Dupuis
    "56f9dd7e-5c10-4931-a150-b9cf96057e4f": 14, // Marc André
    "e37d8a09-9bc8-4548-b685-7dcd84ac2121": 10, // Emilie Leclerc
    "52173ee5-7a19-4336-9e6a-c6a429c35a9c": 9, // Chloé Bernard
    "f301aaa9-dc8e-48e9-a0ee-a2222fcf9f83": 7, // Sophie-Laurent
    "a367bb62-37d5-492e-b0be-0ae50d10d06a": 21, // Sophie-Renaud
    "f7d4e678-a209-4ea7-91a7-e95b7bb967e6": 8, // Thomas-Girard
    "b2d778f4-439f-4e26-8a38-f30edc3f868f": 22, // Thomas-Leroy
    "ac995b92-fc1f-4cd3-8634-7e919d3f5952": 3, // Eric-Morel
    "411f458f-4d01-45af-84cc-f5f4c7430982": 18, // Lucas-Bernard
    "0f21eaa4-b03c-4822-9079-c48fbaf0451d": 5, // Lucas Dubois
    "c0174a61-560c-4bb4-b7b1-f50bd28916e4": 6, // Nadia Benoit
    "a5aced33-cdcd-4f86-8317-1a67bafd5269": 19, // Omar Diop
    "aa093f07-7f84-4d08-902b-6f64c96a11ae": 20, // Sarah Lefebvre
    "286f38ca-e074-48d7-a373-7972116bd267": 16, // Alice Dubois
    "d3741a21-46f7-4ea9-9ecb-5ad250ff68ad": 2, // Chloé Martin
    "db21b843-c6cf-45b2-9b88-74e76ea23bd9": 1, // Amandine Petit
    "ab88bcbd-6a3e-490d-bd48-452b93f309e0": 17, // Claire Martin
    "faf9c199-ecac-44fa-8286-37c7a257c23e": 4 // Julien Vasseur
}

const allFiles = {
    1: 'FICHES DE POSTE/DSI_TXT/Amandine Petit.txt',
    2: 'FICHES DE POSTE/DSI_TXT/Chloé Martin.txt',
    3: 'FICHES DE POSTE/DSI_TXT/Eric Morel.txt',
    4: 'FICHES DE POSTE/DSI_TXT/Julien Vasseur.txt',
    5: 'FICHES DE POSTE/DSI_TXT/Lucas Dubois.txt',
    6: 'FICHES DE POSTE/DSI_TXT/Nadia Benoit.txt',
    7: 'FICHES DE POSTE/DSI_TXT/Sophie Laurent.txt',
    8: 'FICHES DE POSTE/DSI_TXT/Thomas Girard.txt',

    9: 'FICHES DE POSTE/FINANCE_TXT/Chloé Bernard.txt',
    10: 'FICHES DE POSTE/FINANCE_TXT/Émilie Leclerc.txt',
    11: 'FICHES DE POSTE/FINANCE_TXT/Julien Petit.txt',
    12: 'FICHES DE POSTE/FINANCE_TXT/Laura Moreau.txt',
    13: 'FICHES DE POSTE/FINANCE_TXT/Léa Fontaine.txt',
    14: 'FICHES DE POSTE/FINANCE_TXT/Marc André.txt',
    15: 'FICHES DE POSTE/FINANCE_TXT/Romain Dupuis.txt',

    16: 'FICHES DE POSTE/RH_TXT/Alice Dubois.txt',
    17: 'FICHES DE POSTE/RH_TXT/Claire Martin.txt',
    18: 'FICHES DE POSTE/RH_TXT/Lucas Bernard.txt',
    19: 'FICHES DE POSTE/RH_TXT/Omar Diop.txt',
    20: 'FICHES DE POSTE/RH_TXT/Sarah Lefebvre.txt',
    21: 'FICHES DE POSTE/RH_TXT/Sophie Renaud.txt',
    22: 'FICHES DE POSTE/RH_TXT/Thomas Leroy.txt',

    23: "MYSISLEY/2.4 DEPART_DE_L'ENTREPRISE.txt",
    24: 'MYSISLEY/3.4 MOBILITE INTERNE.txt',
    25: 'MYSISLEY/3.8 CHANGEMENT_DE_DEPARTEMENT.txt',
    26: 'MYSISLEY/4.3 EVENEMENTS.txt',
    27: 'MYSISLEY/4.7 RESPONSABILITE_SOCIALE.txt',
    28: 'MYSISLEY/4.8 BIEN_ETRE.txt',
    29: "MYSISLEY/Comprendre le Fonctionnement de la Prime d'Activité chez Sisley.txt",
    30: 'MYSISLEY/Comprendre le Système de Primes, Participation et PER chez Sisley.txt',
    31: 'MYSISLEY/FAQ.txt',
    32: 'PROCESS/2.8 DEMENAGEMENT.txt',
    33: 'PROCESS/3.1 COOPTATION.txt',
    34: 'PROCESS/3.2 ONBOARDING.txt',
    35: 'PROCESS/DSI Guide - Licences de logiciels.txt',
    36: "PROCESS/DSI Guide d'Accès au Réseau à Distance via VPN.txt",
    37: "PROCESS/DSI Guide d'équipement Informatique pour l'Arrivée d'un Nouveau Collaborateur.txt",
    38: "PROCESS/DSI Guide de Création d'Accès WiFi pour les Visiteurs.txt",
    39: "PROCESS/DSI Guide de Création d'un Nouveau Drive Partage.txt",
    40: "PROCESS/DSI Guide de Demande d'Installation d'un Nouveau Logiciel chez Sisley.txt",
    41: 'PROCESS/DSI Guide de Formation aux Outils Jira, Squash, et Mantis.txt',
    42: "PROCESS/DSI Guide de Partage d'un Drive avec un Partenaire Externe.txt",
    43: 'PROCESS/DSI Guide de Réainitialisation du Mot de Passe de Messagerie chez Sisley.txt',
    44: 'PROCESS/DSI Guide du Support Informatique DSI chez Sisley.txt',
    45: 'PROCESS/DSI Politique de Cybersécurité de Sisley.txt',
    46: 'PROCESS/DSI Processus pour créer des accès wifi pour un externe.txt',
    47: "PROCESS/DSI Procédure de Signalement d'un Incident de Sécurité Informatique chez Sisley.txt",
    48: "PROCESS/DSI Procédure pour Obtenir un Nouvel l'équipement Informatique chez Sisley.txt",
    49: 'PROCESS/DSI Présentation des différents logiciels utilisés.txt',
    50: "PROCESS/FINANCE Demande d'Avance sur Salaire.txt",
    51: 'PROCESS/FINANCE Délais de Paiement pour les Fournisseurs.txt',
    52: "PROCESS/FINANCE Gestion des Dépenses liées aux Voyages d'Affaires.txt",
    53: 'PROCESS/FINANCE Notes de Frais.txt',
    54: "PROCESS/FINANCE Processus de Mise en Place d'un Contrat de Mécénat.txt",
    55: "PROCESS/FINANCE Processus de Prise en Charge d'une Facture d'un Fournisseur Existant chez Sisley.txt",
    56: "PROCESS/FINANCE Procédure de Création d'un Nouveau Compte Fournisseur dans SAP.txt",
    57: 'PROCESS/FINANCE Rapports de Dépenses par Projet.txt',
    58: "PROCESS/FINANCE Refacturation d'un Service en Interne Procédure chez Sisley.txt",
    59: "PROCESS/FINANCE Signalement d'un Retard de Paiement d'un Fournisseur ou d'un Impayé à la Finance.txt",
    60: 'PROCESS/RH 1.1 PROCESS_CONGES.txt',
    61: 'PROCESS/RH 1.10 MALADIE.txt',
    62: 'PROCESS/RH 1.2 CONSULTATION_CONGES.txt',
    63: 'PROCESS/RH 1.3 CONGE_MATERNITE_PATERNITE.txt',
    64: 'PROCESS/RH 2.12 Guide pour le Déménagement des Employés.txt',
    65: 'PROCESS/RH 2.6 Procédure de Soumission des Notes de Frais avec BookandGo.txt',
    66: 'PROCESS/RH 3.1 Procédure de Cooptation des Collaborateurs.txt',
    67: "PROCESS/RH 3.2 Procédure d'Onboarding des Nouveaux Employés.txt",
    68: "PROCESS/RH Annulation d'une Demande d'Absence sur Sisl'RH.txt",
    69: "PROCESS/RH Le calcul du nombre d'heures pour une journée de d'absence.txt",
    70: 'PROCESS/RH Règlement Intérieur de Sisley.txt',
    71: 'PROJETS/FONCTIONS/PROJECTX DSI.txt',
    72: 'PROJETS/FONCTIONS/PROJECTX FINANCE.txt',
    73: 'PROJETS/FONCTIONS/PROJECTX RH.txt',
    74: 'PROJETS/Liste de Projets.txt'
}

const getContentOfAFile = async (fileName) => {
    try {
        const currentDirectory = __dirname;
        const filePath = path.join(currentDirectory, 'Docs in Txt/', fileName);
        const data = await readFile(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error(`Error reading file: ${err.message}`);
        return null;
    }
}

const makeFirstPrompt = async (nameOfTheUser, userFilepath, inputUser, listOfFilesString) => {
    let dataOfTheUser = "";
    if (userFilepath && userFilepath.length > 1) {
        dataOfTheUser = await getContentOfAFile(userFilepath);
    }
    const prompt = `
        ${nameOfTheUser} à une question.
        ${dataOfTheUser ? `Ses données sont :\n${dataOfTheUser}\n` : 'Les informations de l\'employé actuel ne sont pas renseignées'}

        Sa question est: ${inputUser}

        D'après les fichiers suivants donne le fichier dans lesquel ${nameOfTheUser} pourrait trouver les informations qu'elles souhaitent.

        ${listOfFilesString}

        Tu dois afficher un object comme celui-ci pour donner l'id du fichier le plus cohérent :

        const result = {
            id: X
        }
    `;

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo-0125",
    });
    return completion.choices[0].message.content;
}

const makingFinalRequest = async (contentOfSelectionnedFile, nameOfTheUser, dataOfTheUser , inputUser) => {
    const prompt = `
        Tu es un chatbot pour sisley:
        ${nameOfTheUser} à une question.
        ${dataOfTheUser ? `Ses données sont :\n${dataOfTheUser}\n` : 'Les informations de l\'employé actuel ne sont pas renseignées'}

        Sa question est : ${inputUser}.

        Grace aux données du fichier suivant répond à sa question :
        ${contentOfSelectionnedFile}

        La réponse que tu donneras est destiné pour répondre à un employé de notre entreprise.
    `
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo-0125",
    });

    console.log(completion.choices[0].message.content);
    return (completion.choices[0].message.content);
}

function findLastInteger(inputString)
{
    let startI = 0;

    for (let i = inputString.length - 1; i >= 0; i--) {
        if (inputString[i] >= '0' && inputString[i] <= '9') {
            startI = i;
            while (i >= 0 && inputString[i] >= '0' && inputString[i] <= '9') {
                i--;
            }
            return parseInt(inputString.slice(i + 1, startI + 1));
        }
    }
}

const makeSecondPrompt = async (nameOfTheUser, userFilepath, responseGPT, inputUser, idDataOwner) => {

    let dataOfTheUser = "";
    if (userFilepath && userFilepath.length > 1) {
        dataOfTheUser = await getContentOfAFile(userFilepath);
    }

    const id = findLastInteger(responseGPT);

    if (id && allFiles[id]) {
        const correspondingFilepath = allFiles[id];

        let contentOfSelectionnedFile = "";
        if (userFilepath && userFilepath.length > 1) {
            contentOfSelectionnedFile = await getContentOfAFile(correspondingFilepath);
        }

        return makingFinalRequest(contentOfSelectionnedFile, nameOfTheUser, dataOfTheUser , inputUser);
    } else {
        getAllFilesOfTheOwner(inputUser, idDataOwner);
        return console.log("La requete prend plus de temps que prévu ...\n");
    }
}

// ! 2
function extractFilename(filepath) {
    try {
        const indexDernierSlash = filepath.lastIndexOf('/');
        const indexDernierPoint = filepath.lastIndexOf('.');
        const nomFichier = filepath.substring(indexDernierSlash + 1, indexDernierPoint);
        return nomFichier;
    } catch {
        return "";
    }
}

const getAllFilesOfTheOwner = async (inputUser, idDataOwner) => {
    var listOfFiles = [];
    var keys = []

    listOfFiles.push({ id: idDataOwner, pathOfTheFile: allFiles[idDataOwner] });
    keys = Object.keys(allFiles).filter(key => parseInt(key) >= 23);
    for (const key of keys) {
        listOfFiles.push({ id: parseInt(key), pathOfTheFile: allFiles[key] });
    }

    const listOfFilesString = JSON.stringify(listOfFiles);
    const nameOfTheUser = extractFilename(allFiles[idDataOwner]);
    const firstResponseGPT = await makeFirstPrompt(nameOfTheUser, allFiles[idDataOwner], inputUser, listOfFilesString);
    return makeSecondPrompt(nameOfTheUser, allFiles[idDataOwner], firstResponseGPT, inputUser, idDataOwner);
}

// ! 1

module.exports = {
    allUsers,
    allFiles,
    getAllFilesOfTheOwner,
}
