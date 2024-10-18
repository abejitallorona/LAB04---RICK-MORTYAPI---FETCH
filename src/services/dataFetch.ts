export const getRickandMorty = async (id: number) => {
    try {
        const data = await fetch(`https://rickandmortyapi.com/api/character/`+id).then(res => res.json());
        return data;
    } catch (error) {
        console.error(error);
    }
};

// La palabra  async indica que esta función es asíncrona, lo que permite usar await dentro de ella para manejar promesas

//  La lógica de la solicitud se encuentra dentro del bloque try, 
// y si ocurre algún error (por ejemplo, un fallo en la red), el bloque catch captura ese error y lo muestra en la consola con console.error

// El método slice() se usa para obtener una porción del array de personajes. Este método toma dos argumentos: el índice de inicio (en este caso, 0 para empezar desde el principio)
// y el índice final (count), que es la cantidad de personajes que queremos obtener. Esto asegura que se devuelva solo la cantidad de personajes especificada por el usuario.