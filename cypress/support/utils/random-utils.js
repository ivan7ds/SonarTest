const crypto = require("crypto");

/**
 * Clase que contiene utilidades para realizar selecciones aleatorias.
 */
export class RandomUtils {
  /**
   * Realiza una selección aleatoria ponderada basada en los pesos de los elementos.
   * @param {Array} items - Un array de objetos con propiedades 'name' y 'weight'.
   * @return {string|null} El nombre del elemento seleccionado aleatoriamente
   *  o null si no se selecciona ningún elemento.
   */
  randomWithWeight(items) {
    if (typeof items !== "object" || items == null) {
      throw new Error("No se ha recibido un array.");
    } else {
      items.forEach((item) => {
        if (!Object.hasOwn(item, "name") || !Object.hasOwn(item, "weight")) {
          throw new Error(
            "El objeto debe contener las propiedades name y weight."
          );
        }
      });
    }

    /**
     * Suma total de los pesos de los elementos.
     * @type {number}
     */
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

    /**
     * Valor aleatorio ponderado.
     * @type {number}
     */
    const randomValue = crypto.randomInt(0, totalWeight);

    /**
     * Peso acumulado mientras se itera a través de los elementos.
     * @type {number}
     */
    let accumulatedWeight = 0;

    for (const item of items) {
      accumulatedWeight += item.weight;

      if (randomValue <= accumulatedWeight) {
        return item.name;
      }
    }

    return null; // Manejo para casos imprevistos
  }

  /**
   * Retorna un elemento aleatorio de un array.
   * @param {Array} array - El array del cual se seleccionará un elemento aleatorio.
   * @return {*} - Un elemento aleatorio del array.
   */
  randomValue(array) {
    if (typeof array !== "object" || array == null) {
      throw new Error("No se ha recibido un array.");
    }

    const randomIndex = crypto.randomInt(0, array.length);

    return array[randomIndex];
  }

  /**
   * Genera un número entero aleatorio entre los valores `min` y `max` (inclusive).
   *
   * @param {number} min - Valor mínimo.
   * @param {number} max - Valor máximo.
   * @return {number} - Número entero aleatorio entre min y max.
   * @throws {Error} Si min o max no son números, o si min es mayor que max.
   *
   * @example
   * // Devuelve un entero entre 1 y 10
   * const resultado = randomIntBetween(1, 10);
   */
  randomIntBetween(min, max) {
    if (typeof min !== "number" || typeof max !== "number") {
      throw new Error("Ambos, min y max, deben ser números.");
    }

    if (min > max) {
      throw new Error("min no puede ser mayor que max.");
    }
    const randomValue = crypto.randomInt(min, max + 1);

    return randomValue;
  }

  /**
   * Ejecuta una función de forma aleatoria basada en un porcentaje.
   *
   * @param {number} percentage - El porcentaje de probabilidad de ejecución (entre 0 y 100).
   * @param {Function} callback - La función que se ejecutará aleatoriamente.
   * @throws {Error} Se lanza un error si el porcentaje está fuera del rango válido (0-100).
   */
  randomExec(percentage, callback) {
    if (percentage < 0 || percentage > 100 || typeof percentage !== "number") {
      throw new Error("El porcentaje debe ser un número entre 0 y 100.");
    }

    if (typeof callback !== "function") {
      throw new Error("Callback debe ser una función");
    }

    const randomValue = crypto.randomInt(0, 101);
    if (randomValue <= percentage) {
      callback();
    }

    return null; // Manejo para casos imprevistos
  }

  /**
   * Retorna un número aleatorio entre 0 y el número máximo proporcionado.
   *
   * @param {number} max - El número máximo en el rango deseado.
   * @return {number} - Un número aleatorio entre 0 y max.
   * @throws {Error} - Se lanza un error si max no es un número o es negativo.
   */
  randomNumberUpTo(max) {
    if (typeof max !== "number" || max <= 0) {
      throw new Error('El argumento "max" debe ser un número positivo.');
    }

    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % (max + 1);
  }

  /** Genera una cadena aleatoria de una longitud especificada.
   *
   * @param {number} length - La longitud de la cadena aleatoria a generar.
   * @return {string} Una cadena aleatoria de la longitud especificada o una cadena vacía en caso de error.
   */
  generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const values = new Uint32Array(length);
    window.crypto.getRandomValues(values);

    for (let i = 0; i < length; i++) {
      const randomIndex = values[i] % characters.length;
      result += characters[randomIndex];
    }

    return result;
  }


  generarNIF() {
    const numero = Math.floor(10000000 + Math.random() * 90000000);
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const letra = letras.charAt(numero % 23);
    return `${numero}${letra}`;
  }

  generarNIE() {
    const letrasIniciales = ['X', 'Y', 'Z'];
    const letraInicial = letrasIniciales[Math.floor(Math.random() * letrasIniciales.length)];
    const numeroSinLetra = Math.floor(1000000 + Math.random() * 9000000);
    let numeroParaCalculo;
  
    switch (letraInicial) {
      case 'X':
        numeroParaCalculo = '0' + numeroSinLetra;
        break;
      case 'Y':
        numeroParaCalculo = '1' + numeroSinLetra;
        break;
      case 'Z':
        numeroParaCalculo = '2' + numeroSinLetra;
        break;
    }
  
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const letraControl = letras.charAt(parseInt(numeroParaCalculo) % 23);
  
    return `${letraInicial}${numeroSinLetra}${letraControl}`;
  }
  
  generarCIF() {
    const letrasIniciales = 'ABCDEFGHJNPQRSUVW';
    const letraInicial = letrasIniciales.charAt(Math.floor(Math.random() * letrasIniciales.length));
    const numero = Math.floor(1000000 + Math.random() * 9000000);
    const digitoControl = calcularDigitoControlCIF(letraInicial, numero.toString());
  
    return `${letraInicial}${numero}${digitoControl}`;
  }
  
}

function calcularDigitoControlCIF(letraInicial, numero) {
  let sumaPares = 0;
  let sumaImpares = 0;

  for (let i = 0; i < numero.length; i++) {
    const n = parseInt(numero.charAt(i), 10);
    if ((i + 1) % 2 === 0) {
      sumaPares += n;
    } else {
      let doble = n * 2;
      if (doble > 9) doble -= 9;
      sumaImpares += doble;
    }
  }

  const sumaTotal = sumaPares + sumaImpares;
  const unidad = sumaTotal % 10;
  const digitoCalculado = (unidad === 0) ? 0 : 10 - unidad;

  const letrasControl = 'JABCDEFGHI';

  if ('PQRSW'.includes(letraInicial)) {
    return letrasControl.charAt(digitoCalculado);
  } else if ('ABEH'.includes(letraInicial)) {
    return digitoCalculado.toString();
  } else {
    return Math.random() < 0.5 ? letrasControl.charAt(digitoCalculado) : digitoCalculado.toString();
  }
}
