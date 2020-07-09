class Player {
    constructor(playername, position, jersey) {
      this.playername = playername;
      this.position = position;
      this.jersey = jersey;
    }
  }
  

  class UI {
    static displayPlayer() {
      const player = Store.getPlayer();
  
      player.forEach((plyr) => UI.addPlayerToList(plyr));
    }
  
    static addPlayerToList(plyr) {
      const list = document.querySelector('#player-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${plyr.playername}</td>
        <td>${plyr.position}</td>
        <td>${plyr.jersey}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deletePlayer(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#player-form');
      container.insertBefore(div, form);
  

      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#player').value = '';
      document.querySelector('#position').value = '';
      document.querySelector('#jersey').value = '';
    }
  }
  

  class Store {
    static getPlayer() {
      let player;
      if(localStorage.getItem('player') === null) {
        player = [];
      } else {
        player = JSON.parse(localStorage.getItem('player'));
      }
  
      return player;
    }
  
    static addPlayer(plyr) {
      const player = Store.getPlayer();
      player.push(plyr);
      localStorage.setItem('player', JSON.stringify(player));
    }
  
    static removePlayer(jersey) {
      const player = Store.getPlayer();
  
      player.forEach((plyr, index) => {
        if(plyr.jersey === jersey) {
            player.splice(index, 1);
        }
      });
  
      localStorage.setItem('player', JSON.stringify(player));
    }
  }
  

  document.addEventListener('DOMContentLoaded', UI.displayPlayer);
  

  document.querySelector('#player-form').addEventListener('submit', (e) => {

    e.preventDefault();
  

    const player = document.querySelector('#player').value;
    const position = document.querySelector('#position').value;
    const jersey = document.querySelector('#jersey').value;
  

    if(player === '' || position === '' || jersey === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {

      const plyr = new Player(playername, position, jersey);
  

      UI.addPlayerToList(plyr);
  

      Store.addPlayer(plyr);
  

      UI.showAlert('Player Added', 'success');
  

      UI.clearFields();
    }
  });
  

  document.querySelector('#player-list').addEventListener('click', (e) => {

    UI.deletePlayer(e.target);
  
 
    Store.removePlayer(e.target.parentElement.previousElementSibling.textContent);
  

    UI.showAlert('Player Removed', 'success');
  });