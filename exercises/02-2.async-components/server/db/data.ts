const POKEMON_LIST = [
  { id: 1, name: 'Bulbasaur', type: 'Grass' },
  { id: 2, name: 'Ivysaur', type: 'Grass' },
  { id: 3, name: 'Venusaur', type: 'Grass' },
  { id: 4, name: 'Charmander', type: 'Fire' },
  { id: 5, name: 'Charmeleon', type: 'Fire' },
  { id: 6, name: 'Charizard', type: 'Fire' },
  { id: 7, name: 'Squirtle', type: 'Water' },
  { id: 8, name: 'Wartortle', type: 'Water' },
  { id: 9, name: 'Blastoise', type: 'Water' }
]

export const fetchById = async (id: number) => {
  await new Promise(resolve => setTimeout(resolve, 200))

  return POKEMON_LIST.find(pokemon => pokemon.id === id)
}

export const fetchAll = async () => {
  await new Promise(resolve => setTimeout(resolve, 200))

  return POKEMON_LIST
}
