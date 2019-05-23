class CPF {
	constructor(){};

	toString(cpf = 0){
		return cpf
			.toString()
			.padStart(11, "0")
			.replace(/\D/g, "")
  			.replace(/^(\d{3})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1.$2.$3$4-$5");
	}

	toNumber(cpf = "0"){
		return Number(cpf.replace(/(\.|\-)+/g, ""))
	}
}

export default new CPF();
