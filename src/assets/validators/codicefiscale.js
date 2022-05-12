function CodiceFiscale() {
	var nome = "";
	var cognome = "";
	var sesso = "";
	var dataNascita = '';
	var comune = '';
	
	var lettere = Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
	var vocali = Array('A', 'E', 'I', 'O', 'U');
	
	var mesi = Array();
	mesi['01'] = 'A';
	mesi['02'] = 'B';
	mesi['03'] = 'C';
	mesi['04'] = 'D';
	mesi['05'] = 'E';
	mesi['06'] = 'H';
	mesi['07'] = 'L';
	mesi['08'] = 'M';
	mesi['09'] = 'P';
	mesi['10'] = 'R';
	mesi['11'] = 'S';
	mesi['12'] = 'T';

	var conversione=Array();
	conversione[0] = 1;
	conversione[1] = 0;
	conversione[2] = 5;
	conversione[3] = 7;
	conversione[4] = 9;
	conversione[5] = 13;
	conversione[6] = 15;
	conversione[7] = 17;
	conversione[8] = 19;
	conversione[9] = 21;
	conversione[10] = 2;
	conversione[11] = 4;
	conversione[12] = 18;
	conversione[13] = 20;
	conversione[14] = 11;
	conversione[15] = 3;
	conversione[16] = 6;
	conversione[17] = 8;
	conversione[18] = 12;
	conversione[19] = 14;
	conversione[20] = 16;
	conversione[21] = 10;
	conversione[22] = 22;
	conversione[23] = 25;
	conversione[24] = 24;
	conversione[25] = 23;
	
	var pattern_vocali = /[^AEIOU ]/;
	
	// Metodi accessori

	// nome
	this.getNome = function(){
		return this.nome;
	}
	this.setNome = function(nome){
		this.nome = nome;
	}
	
	// cognome
	this.getCognome = function(){
		return this.cognome;
	}
	this.setCognome = function(cognome){
		this.cognome = cognome;
	}
	
	// sesso
	this.getSesso = function(){
		return this.sesso;
	}
	this.setSesso = function(sesso){
		this.sesso = sesso;
	}

	// dataNascita
	this.getDataNascita = function(){
		return this.dataNascita;
	}
	this.setDataNascita = function(dataNascita){
		this.dataNascita = dataNascita;
	}

	// comune
	this.getComune = function(){
		return this.comune;
	}
	this.setComune = function(comune){
		this.comune = comune;
	}

	// Controlli
	this.estrai3C = function(nome){
		return controlla_nome(nome);
	}


	// utility

	function estrai_consonanti(parola){
		parola = parola.toUpperCase();
		var risultato = "";
			for (i=0; i < parola.length; i++) {
				if (parola.charAt(i).match(pattern_vocali)) risultato +=parola.charAt(i);
			}
		return risultato;
	} // estrai_consonanti
	
	function estrai_vocali(parola){
		parola = parola.toUpperCase();
		var risultato = "";
			for (i=0; i < parola.length; i++) {
				if (parola.charAt(i).match(/[AEIOU]/)) risultato += parola.charAt(i);
			}
		return risultato;
	}
	
	function controlla_nome(nome){
		var parola = estrai_consonanti(nome);
		if (parola.length > 3) {
			// si prende 1 4 5
			parola = parola.charAt(0)+parola.charAt(2)+parola.charAt(3);
		}
		if (parola.length < 3){
			var vocali_nome = estrai_vocali(nome);
			var v = 0;
			while (parola.length < 3) {
				parola += vocali_nome.charAt(v);
				v++;
			} // while
		} // if
		return parola;
	} // controlla_lunghezza
	
	function controlla_cognome(cognome){
		var parola = estrai_consonanti(cognome);
		if (parola.length > 3) return parola.charAt(0)+parola.charAt(1) + parola.charAt(2);
		if (parola.length < 3) {
			var vocali_cognome = estrai_vocali(cognome);
			var v = 0;
			while (parola.length < 3) {
				parola += vocali_cognome.charAt(v);
				v++;
			} // while
		} // if
		return parola;
	} // controlla_lunghezza
	
	function controlla_nascita(data, sesso){
		var ritorno = '';
		var com = data.split('/');
		
		// il giorno se lo piglia com'�, +40 se femmina
		if (sesso == 'F') {
			com[0] *= 1;
			com[0] += 40;
		}
		var giorno = com[0];
		
		// il mese viene convertito in lettera
		var mese = mesi[com[1]];
		
		// l'anno messo in testa
		var anno = com[2].charAt(2)+com[2].charAt(3);
		
		ritorno = anno + mese + giorno;
		return ritorno;
	} // controlla_data
	
	function genera_controllo(cfp){
		var ritorno = "";
		var sommatoria = 0;
		
		for(i=0; i < cfp.length; i++) {
			if (i%2 != 0){
				if (isNaN(cfp.charAt(i))) {
					var trovato = 0;
					for (j=0; j < lettere.length && trovato == 0; j++)
						if (lettere[j] == cfp.charAt(i)) {
							sommatoria += j;
							trovato = 1;
						} // if
					} // se � una lettera
				else {
					sommatoria += cfp.charAt(i)*1;
				} // se � un numero
			} // pari
			else {
				var tmp = 0;
				if (isNaN(cfp.charAt(i))){
					var trovato = 0;
					for (j=0; j < lettere.length && trovato == 0; j++)
						if (lettere[j] == cfp.charAt(i)) {
							tmp = j;
							trovato = 1;
						} // if
					} // se � una lettera
				else {
					tmp = cfp.charAt(i)*1;
				} // se � un numero
				sommatoria += conversione[tmp];
				} // dispari
			} // for
			
			ritorno = (sommatoria%26);
			
			ritorno = lettere[ritorno];
			
			return ritorno;
		}
		
	// generazione del codice fiscale	
	this.genera = function(){
		var risultato = '';
		// nome
		if (this.nome == '') return "";
		var consonanti_nome = controlla_nome(this.nome);
		// alert(consonanti_nome);
		// cognome
		if (this.cognome == '') return "";
		var consonanti_cognome = controlla_cognome(this.cognome);
		// alert(consonanti_cognome);
		// dataNascita
		if (this.dataN == '') return "";
		var dataN=controlla_nascita(this.dataNascita, this.sesso);
		// alert(dataN);
		// comune
		var comune = this.comune;
		
		risultato = consonanti_cognome+consonanti_nome+dataN+comune;
		
		var carattere = genera_controllo(risultato);
		
		risultato += carattere;
		
		return risultato;
	}
};

/*
	function crea_cf(){
		var cf = new CodiceFiscale();
		cf.setNome({nome});
		cf.setCognome({cognome});
		cf.setSesso({sesso});
		cf.setDataNascita({data_nascita});
		cf.setComune({comune});

		result = cf.genera();
	}
*/
