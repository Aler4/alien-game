
import {Game} from './game1.js';
import {Count} from "./counters.js";

export class GameMenu {

    constructor() {
        this.count = new Count();
        this.menuCont = document.createElement("div");
        this.menuCont.classList.add('menu-cont');
        this.menuList = document.createElement('ul');
        this.menuList.innerHTML = `<li class="menu-start"> Start </li>
                                    <li class="menu-records">Records </li>`.trim();
        this.img = new Image();
        this.img.src = './img/menuLogo.png';

        setInterval(() => {
            this.img.style.width = 300 + 'px';
        }, 200)

        this.menuCont.append(this.img,this.menuList)
        document.body.append(this.menuCont);
        this.menuBtn = document.createElement('button')
        this.menuBtn.classList.add('back-btn')
        this.menuBtn.innerText = 'Back to menu';
        this.count.getInstance().playground.style.display = 'none';

        document.querySelector('.menu-start').addEventListener('click', e => {
            this.menuCont.remove();
            this.game = new Game()
            this.game.start()
            this.count.getInstance().playground.style.display = 'block'
        })

        document.querySelector('.menu-records').addEventListener('click', e => {
            this.menuCont.remove()
            this.records()
        })

        this.menuBtn.addEventListener('click', e => {
            document.location.reload();
        })

    }

    records() {
        this.ul = document.createElement('ul');
        this.ul.classList.add('ul-records');
        this.ul.innerText = 'Winers'

        document.body.append(this.ul)
        for(let i = 0; i < localStorage.length; i++) {
            this.li = document.createElement('li');
            let a = localStorage.key(i)
            console.log(localStorage[a])
            this.li.innerHTML = `${localStorage.key(i)}:  ${localStorage[a]}`.trim()
            this.ul.append(this.li);
        }
        this.ul.append(this.menuBtn);
    }

    winMenu() {
        this.winCont = document.createElement('div');
        this.winCont.classList.add('win-cont')
        this.winCont.innerText = 'Congratulations you WON!';

        this.img = new Image(200);
        this.img.src = './img/win.png'

        this.winForm = document.createElement('form')
        this.inputName = document.createElement('input');
        this.inputName.autofocus = true;
        this.inputName.placeholder = 'Enter name';
        this.inputName.classList.add('inp-name');

        this.score = document.createElement('p')
        this.score.innerText = `Your score: ${this.count.getInstance().totalScore}`;

        this.inputApl = document.createElement('input');
        this.inputApl.classList.add('inp-apl');
        this.inputApl.type = 'button';
        this.inputApl.value = 'Apply';


        this.winForm.append(this.inputName, this.score,this.inputApl);
        this.winCont.append(this.img,this.winForm)
        document.body.append(this.winCont)
        this.inputApl.addEventListener('click', () => {
            if (this.inputName.value !== '') {
                localStorage.setItem(this.inputName.value, this.count.getInstance().totalScore);
                this.winCont.remove();
                this.records()
            }
        })
    }

    gameOverMenu() {
        this.endCont = document.createElement('div');
        document.body.style.backgroundImage = 'url("./img/gameOver.jpg")';
        document.body.style.backgroundSize = 'cover';
        this.endCont.classList.add('end')
        this.endCont.innerText = 'Game Over...';
        this.endCont.append(this.menuBtn);
        document.body.append(this.endCont)
    }
};
