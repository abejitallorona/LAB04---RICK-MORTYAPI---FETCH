import Card, { Attribute } from './components/Character/character';
import { getRickandMorty } from '../src/services/dataFetch';
import styles from './indexAbuelo.css';

class AppContainer extends HTMLElement {
  cards: Card[] = [];
  dataApi: any[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    this.render();
  }

  async fetchCharacters(count: number) {
    this.dataApi = [];
    for (let index = 1; index < count + 1; index++) {
      const character = await getRickandMorty(index);
      this.dataApi.push(character);  // Traemos los personajes según el número ingresado
      console.log(this.dataApi);
      
    }
    this.cards = [];  // Limpiamos las tarjetas anteriores
    this.createCardsRickandMorty();  
    this.render();  // Renderizamos nuevamente
}

  




  createCardsRickandMorty() {
    this.dataApi.forEach((e) => {
      const card = this.ownerDocument.createElement('characters-card') as Card;
      card.setAttribute(Attribute.image, e.image);
      card.setAttribute(Attribute.name, e.name);
      card.setAttribute(Attribute.status, e.status);
      card.setAttribute(Attribute.species, e.species);
      card.setAttribute(Attribute.type, e.type);
      card.setAttribute(Attribute.origin, e.origin.name);
      card.setAttribute(Attribute.nameoffirstepisode, e.episode[0]);
      this.cards.push(card);
    });
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
       <style>${styles}</style> 
        <section id="main-container">
                    <h1>Rick and Morty Characters</h1>

                    <section id="input-container">
                        <input class="card-input" type="number" id="characterCount" placeholder="Write a number" />
                        <button class="card-button" id="fetchButton">Spawn characters!</button>
                    </section>

                    <section id="cardsContainer"></section>
                </section>

      `;
      const fetchButton = this.shadowRoot?.querySelector('#fetchButton');
      fetchButton?.addEventListener('click', () => {
          const input = this.shadowRoot?.querySelector('#characterCount') as HTMLInputElement;
          const count = parseInt(input.value);
          if (count && count > 0) {
              this.fetchCharacters(count); 
          }
      });

      const cardsContainer = this.shadowRoot?.querySelector('#cardsContainer');
      this.cards.forEach((card) => {
          cardsContainer?.appendChild(card);
    
    });
  }
}}

customElements.define('app-container', AppContainer);
