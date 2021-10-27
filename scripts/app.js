const inputField = document.getElementById("input-field");
const outputField = document.getElementById("output-field");
const encodeButton = document.getElementById("button-encode");
const decodeButton = document.getElementById("button-decode");
const errorMessage = document.getElementById("error-message");

const CODE = "CODE";
const TEXT = "TEXT";


const textToCodeMap = new Map([
	["A", "._"],
	["Ą", "._"],
	["B", "_..."],
	["C", "_._."],
	["Ć", "_._."],
	["D", "_.."],
	["E", "."],
	["Ę", "."],
	["F", ".._."],
	["G", "__."],
	["H", "...."],
	["I", ".."],
	["J", ".___"],
	["K", "_._"],
	["L", "._.."],
	["Ł", "._.."],
	["M", "__"],
	["N", "_."],
	["Ń", "_."],
	["O", "___"],
	["Ó", "___"],
	["P", ".__."],
	["Q", "__._"],
	["R", "._."],
	["S", "..."],
	["Ś", "..."],
	["T", "_"],
	["U", ".._"],
	["V", "..._"],
	["W", ".__"],
	["X", "_.._"],
	["Y", "_.__"],
	["Z", "__.."],
	["Ź", "__.."],
	["Ż", "__.."],
	["0", "_____"],
	["1", ".____"],
	["2", "..___"],
	["3", "...__"],
	["4", "...._"],
	["5", "....."],
	["6", "_...."],
	["7", "__..."],
	["8", "___.."],
	["9", "____."],
	[" ", "|"],
	[".", "||"],
	[",", "__..__"],
	["'", ".____."],
	["\"", "._.._."],
	["_", "..__._"],
	[":", "___..."],
	[";", "_._._."],
	["?", "..__.."],
	["!", "_._.__"],
	["-", "_...._"],
	["+", "._._._"],
	["/", "_.._."],
	["(", "_.__."],
	[")", "_.__._"],
	["=", "_..._"],
	["@", ".__._."]
]);

const codeToTextMap = new Map([
	["._", "A"],
	["_...", "B"],
	["_._.", "C"],
	["_..", "D"],
	[".", "E"],
	[".._.", "F"],
	["__.", "G"],
	["....", "H"],
	["..", "I"],
	[".___", "J"],
	["_._", "K"],
	["._..", "L"],
	["__", "M"],
	["_.", "N"],
	["___", "O"],
	[".__.", "P"],
	["__._", "Q"],
	["._.", "R"],
	["...", "S"],
	["_", "T"],
	[".._", "U"],
	["..._", "V"],
	[".__", "W"],
	["_.._", "X"],
	["_.__", "Y"],
	["__..", "Z"],
	["._._", "Ą"],
	["_._..", "Ć"],
	[".._..", "Ę"],
	["____", "CH"],
	["._.._", "Ł"],
	["__.__", "Ń"],
	["___.", "Ó"],
	["..._...", "Ś"],
	["__.._", "Ź"],
	["__.._.", "Ż"],
	["_____", "0"],
	[".____", "1"],
	["..___", "2"],
	["...__", "3"],
	["...._", "4"],
	[".....", "5"],
	["_....", "6"],
	["__...", "7"],
	["___..", "8"],
	["____.", "9"],
	["", " "],
	["._._._", "."],
	["__..__", ","],
	[".____.", "'"],
	["._.._.", "\""],
	["..__._", "_"],
	["___...", ":"],
	["_._._.", ";"],
	["..__..", "?"],
	["_._.__", "!"],
	["_...._", "-"],
	["._._.", "+"],
	["_.._.", "/"],
	["_.__.", "("],
	["_.__._", ")"],
	["_..._", "="],
	[".__._.", "@"]
]);



function getAndPreconfigureInput(mode) {
	let userInput = inputField.value.trim();
	if (userInput === "") {
		return;
	}

	if (mode === TEXT) {
		// const illegalChars = /[^a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ0-9.,'"_:;?!-+/)(=@ ]+/g;
		const illegalChars = /[^a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ0-9.,'"_:;?!+/)(=@\- ]/g;  // illegal chars are all except that in square brackets
		const multipleSpaces = / {2,}/g;
		const multipleDots = /\.{2,}/g;
		if (illegalChars.test(userInput)) {
			errorMessage.innerHTML = "Wprowadzono niedozwolone znaki.<br>Dozwolone znaki to:<br> - litery (małe i duże)<br> - cyfry<br> - znaki specjalne:<pre style=\"display: inline;\">&#9;</pre>. , ' \" _ : ; ? ! - + / () = @";
			errorMessage.classList.add("visible");
			return;
		}
		userInput = userInput.toUpperCase();
		// Replace multiple spaces with single space
		userInput = userInput.replace(multipleSpaces, " ");
		userInput = userInput.replace(multipleDots, ".");
		return userInput;

	} else if (mode === CODE) {
		const illegalChars = /[^./|_\-]/g; // illegal chars are all except that in square brackets
		if (illegalChars.test(userInput)) {
			errorMessage.innerHTML = "Wprowadzono niedozwolone znaki.<br>Dozwolone znaki to: . _ - / |";
			errorMessage.classList.add("visible");
			return;
		}
		// Replace characters to normalize input
		userInput = userInput.replace(/\//g, "|");
		userInput = userInput.replace(/\|{3}/g, "|._._._||");
		userInput = userInput.replace(/\-/g, "_");
		// userInput = userInput.replace(multipleSpaces, " ");
		return userInput;

	} else {
		return;
	}
}

function encode() {
	// Reset and hide error message
	errorMessage.innerHTML = "";
	errorMessage.classList.remove("visible");

	const input = getAndPreconfigureInput(TEXT);
	if (!input) {
		return;
	}
	outputField.textContent = "";

	let output = "";
	const letters = input.split("");
	console.log(input, letters);
	let lastLetter = "";
	for (const letter of letters) {
		const charCode = textToCodeMap.get(letter) || "";
		if(!(letter === " " && lastLetter === ".")) {
			output += charCode;
		}
		if (!(letter === "." || letter === " ")) {
			output += "|";
		}
		lastLetter = letter;
	}
	output = lastLetter === "." ? output + "" : output + "|";
	outputField.textContent = output;
}

function decode() {
	// Reset and hide error message
	errorMessage.innerHTML = "";
	errorMessage.classList.remove("visible");

	const input = getAndPreconfigureInput(CODE);
	if(!input) {
		return;
	}
	outputField.textContent = "";

	let output = "";
	const charCodes = input.split("|");
	console.log(input, charCodes);
	for (const charCode of charCodes) {
		const letter = codeToTextMap.get(charCode) || "";
		output += letter;
	}
	outputField.textContent = output;
}


encodeButton.addEventListener("click", encode);
decodeButton.addEventListener("click", decode);
