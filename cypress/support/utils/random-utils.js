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
      if (typeof items !== 'object' || items == null) {
        throw new Error('No se ha recibido un array.');
      } else {
        items.forEach((item) => {
          if (!Object.hasOwn(item, 'name') || !Object.hasOwn(item, 'weight')) {
            throw new Error('El objeto debe contener las propiedades name y weight.');
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
      const randomValue = Math.random() * totalWeight;
  
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
      if (typeof array !== 'object' || array == null) {
        throw new Error('No se ha recibido un array.');
      }
  
      const randomIndex = Math.floor(Math.random() * array.length);
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
      if (typeof min !== 'number' || typeof max !== 'number') {
        throw new Error('Ambos, min y max, deben ser números.');
      }
  
      if (min > max) {
        throw new Error('min no puede ser mayor que max.');
      }
  
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  
    /**
     * Ejecuta una función de forma aleatoria basada en un porcentaje.
     *
     * @param {number} percentage - El porcentaje de probabilidad de ejecución (entre 0 y 100).
     * @param {Function} callback - La función que se ejecutará aleatoriamente.
     * @throws {Error} Se lanza un error si el porcentaje está fuera del rango válido (0-100).
     */
    randomExec(percentage, callback) {
      if (percentage < 0 || percentage > 100 || typeof percentage !== 'number') {
        throw new Error('El porcentaje debe ser un número entre 0 y 100.');
      }
  
      if (typeof callback !== 'function') {
        throw new Error('Callback debe ser una función');
      }
  
      const randomValue = Math.random() * 100;
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
      if (typeof max !== 'number' || max <= 0) {
        throw new Error('El argumento "max" debe ser un número positivo.');
      }
  
      return Math.floor(Math.random() * (max + 1));
    }
  
    /** Genera una cadena aleatoria de una longitud especificada.
    *
    * @param {number} length - La longitud de la cadena aleatoria a generar.
    * @return {string} Una cadena aleatoria de la longitud especificada o una cadena vacía en caso de error.
    */
    generateRandomString(length) {
      const MAX_LENGTH = 1e5; // Límite para prevenir problemas de rendimiento.
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
      if (typeof length !== 'number') {
        throw new TypeError('La longitud proporcionada debe ser un número.');
      }
  
      if (length <= 0) {
        throw new RangeError('La longitud no debe ser negativa ni 0.');
      }
  
      if (length > MAX_LENGTH ) {
        throw new RangeError(`La longitud no debe exceder ${MAX_LENGTH}.`);
      }
  
      let result = '';
  
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters [randomIndex];
      }
  
      return result;
    }
  }
  