progetto finale - Documentazione del Progetto

descrizione:
ProgettoFinale è un'applicazione web sviluppata con React che permette agli utenti di navigare, cercare e interagire con una vasta lista di videogiochi. Gli utenti possono esplorare un ampio catalogo, filtrare secondo vari parametri, visualizzare i dettagli di un gioco, aggiungerlo o rimuoverlo dai preferiti, leggere le recensioni e partecipare alla chat in tempo reale.

Gli utenti autenticati possono scrivere recensioni o inviare messaggi live. Ogni recensione include anche l'orario di pubblicazione, offrendo maggiore contesto sulle opinioni più recenti. Inoltre, è possibile visualizzare e modificare i propri dati e attività nella dashboard dell'account.

Api:
questo progetto utilizza l'apidi Rawg.io per ottenere dati dai vidiogiochi e Supabase

Stile:
il progetto è realizzato il CSS

tutte le pagine:
Home – Esplora un vasto catalogo di videogiochi con filtri avanzati per trovare esattamente ciò che cerchi.
Dettagli Gioco – Scopri tutte le informazioni sul titolo scelto: aggiungilo ai preferiti, sfoglia gli screenshot, partecipa alla chat live e lascia una recensione.
Risultati di Ricerca – Trova i giochi perfetti per te filtrando per nome, genere, piattaforma, popolarità, valutazione o novità.
Autenticazione – Registrati o accedi per sbloccare funzionalità esclusive.
Profilo Utente – Gestisci il tuo account: visualizza e modifica i tuoi dati, i giochi preferiti e le recensioni lasciate.

Utenti non autenticati:
Sfogliare l'elenco completo dei giochi
Cercare giochi per nome
Filtrare giochi secondo vari criteri e parametri
Visualizzare informazioni dettagliate di un gioco specifico
Leggere recensioni e live chat di altri utenti
Registrarsi con email e password

utenti autenticati:
Creare e gestire una lista di preferiti
Lasciare recensioni
Partecipare alla live chat
Visualizzare e aggiornare le informazioni del proprio profilo

struttura del progetto:
cartella components: per elementi UI riutilizzabili (Sidebar, Dropdowns, Footer, ecc.)

cartella pages: viste principali conpresa navbar e gestione di ricerca 

Cartella Context per la gestione dei contesti

Cartella Hooks per la gestione dei custom hooks

Cartella Utils per funzioni di gestione dei 
formati delle date

Cartella Markup per la gestione del layout

Link del progetto:
https://progettofinale-broa.vercel.app/