import { fetchPelicula, postPelicula, fetchGeneros, eliminarGeneros, postGenero, eliminarPelicula } from '../src/ApiEvents';

jest.mock('node-fetch', () => jest.fn());

const fetch = require('node-fetch');

describe('ApiEvents', () => {
    const mockData = { id: 1, title: 'Pelicula 1' };

    test('eliminarPelicula should call fetch with DELETE method', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({}));
        const result = await eliminarPelicula(1);
        expect(fetch).toHaveBeenCalledWith('https://hallowed-vintage-limpet.glitch.me/peliculas/1', { method: 'DELETE' });
        expect(result).toBe(true);
    });

    test('fetchPeliculas should call fetch and return data', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve([mockData]) }));
        const data = await fetchPeliculas();
        expect(fetch).toHaveBeenCalledWith('https://hallowed-vintage-limpet.glitch.me/peliculas');
        expect(data).toEqual([mockData]);
    });

    test('fetchPelicula should call fetch with correct id and return data', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(mockData) }));
        const data = await fetchPelicula(1);
        expect(fetch).toHaveBeenCalledWith('https://hallowed-vintage-limpet.glitch.me/peliculas/1');
        expect(data).toEqual(mockData);
    });

    test('postPelicula should call fetch with POST method when id is not provided', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({}));
        const result = await postPelicula(null, 'Pelicula 1', 'image.jpg', 2021, []);
        expect(fetch).toHaveBeenCalledWith('https://hallowed-vintage-limpet.glitch.me/peliculas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Pelicula 1', year: 2021, generos: [], image: 'image.jpg' }),
        });
        expect(result).toBe(true);
    });

    test('postPelicula should call fetch with PUT method when id is provided', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({}));
        const result = await postPelicula(1, 'Pelicula 1', 'image.jpg', 2021, []);
        expect(fetch).toHaveBeenCalledWith('https://hallowed-vintage-limpet.glitch.me/peliculas/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Pelicula 1', year: 2021, generos: [], image: 'image.jpg' }),
        });
        expect(result).toBe(true);
    });

    test('fetchGeneros should call fetch and return data', async () => {
        const mockData = [{ id: 1, genre: 'Action' }];
        fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(mockData) }));
        const data = await fetchGeneros();
        expect(fetch).toHaveBeenCalledWith('https://hallowed-vintage-limpet.glitch.me/listaDeGeneros');
        expect(data).toEqual(mockData);
    });

    test('eliminarGeneros should call fetch with DELETE method', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({}));
        const result = await eliminarGeneros(1);
        expect(fetch).toHaveBeenCalledWith('https://hallowed-vintage-limpet.glitch.me/listaDeGeneros/1', { method: 'DELETE' });
        expect(result).toBe(true);
    });

    test('postGenero should call fetch with POST method', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({}));
        const result = await postGenero('Action');
        expect(fetch).toHaveBeenCalledWith('https://hallowed-vintage-limpet.glitch.me/listaDeGeneros', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ genre: 'Action' }),
        });
        expect(result).toBe(true);
    });
});