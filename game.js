import {
    BoxSup,Alien, BigUfo, DuckTarget,
    SmallUfo, Target, gun, bullets,
    clips, playground, alienScore,totalScore} from "./target.js";


class Game {


    constructor() {
        playground.addEventListener('click', (e) => {
            this.shot();
            console.log(e.target)
            if (e.target.classList.contains("sec")){
               this.sec+=15;
            }
        });

        document.addEventListener('keydown', e => {
            if (e.keyCode === 32 && gun[0] > 0) this.reloadGun()
        });

        this.timeStep = [3000, 5000, 7000, 8000, 1000 *11, 1000 *15, 1000]

        // let targets = [this.targ, this.smallUfo, this.bigUfo, this.duck, this.alien];// this.targets = targets;

    }
    shot(){
        if (gun[1] > 0) {
            let shot = document.createElement('audio');
            shot.setAttribute("autoplay", "true");
            shot.innerHTML = "<source src='./music/shot.mp3' type=\"audio/mpeg\">";
            gun[1] = gun[1] - 1;
            bullets.innerHTML = `${gun[1]} X <img src="./img/bullet.png">`;
            document.body.append(shot);
            this.condition(alienScore)
            if((gun[0] <= 0 && gun[1] <= 0) && alienScore < 50){
                this.gameOver()
            }
            setInterval( ()=> {
                shot.remove()
            }, 2000)
        }
        if (gun[1] <=0 ) {
            gun[1] = 0;
            let empty = document.createElement('audio');
            empty.setAttribute("autoplay", "true");
            empty.innerHTML = "<source src='./music/emptyShot.mp3' type=\"audio/mpeg\">";
            document.body.append(empty);
            setInterval( ()=> {
                empty.remove()

            }, 2000)


        }
    }
    reloadGun() {
        gun[1] = 20;
        gun[0] = gun[0] -1;
        clips.innerHTML = `${gun[0]} X <img src="./img/bullet-clip.png">`;
        bullets.innerHTML = `${gun[1]} X <img src="./img/bullet.png">`;
        let reload = document.createElement('audio');
        reload.setAttribute("autoplay", "true");
        reload.innerHTML = "<source src='./music/reload.mp3' type=\"audio/mpeg\">";
        document.body.append(reload);
        setInterval( ()=> {
            reload.remove()

        }, 2000)

    }
    start() {

        setInterval(() => {
            this.targ = new Target();
            this.targ.move();

        }, this.timeStep[0]),
            setInterval(() => {
                this.smallUfo = new SmallUfo();
                this.smallUfo.move()


            }, this.timeStep[1]),


            setInterval(() => {
                this.bigUfo = new BigUfo();
                this.bigUfo.move()
            }, this.timeStep[2]);


        setInterval(() => {
            this.duck = new DuckTarget();
            this.duck.move()
        }, this.timeStep[3]);

        setInterval(() => {
            this.alien = new Alien();
            this.alien.move()
        },this.timeStep[4]);

        setInterval(() => {
            this.box = new BoxSup()
            this.box.move()
        },this.timeStep[5]);

        this.timer()

    }
    timer() {

        this.min = 1;
        this.sec = 60;
        this.timerCont = document.createElement('div');
        this.timerCont.classList.add('timer');
        playground.append(this.timerCont);
        this.tic = setInterval(() => {
            this.sec -=1;

            if ((this.sec <= 0 && this.min <= 0)){
                this.gameOver()
            }
            if (this.sec <= 0){
                this.min -= 1;
                this.sec = 60;
            }

            if (this.sec > 60) {
                this.min += 1;
                this.sec = this.sec -60;
            }
            if (this.sec < 10) {
                this.timerCont.innerHTML = `${this.min} : 0${this.sec}`
            }

            this.timerCont.innerHTML = `${this.min}:${this.sec}`;
        }, this.timeStep[6])


    }
    gameOver() {
        clearInterval(this.tic);
        playground.style.display = 'none';
        menu.gameOverMenu();
    }
    condition(score) {
        console.log(gun)
        return (score === 10) ?  this.win() : score + 1 ;

    }
    win() {
        clearInterval(this.tic);

            playground.style.display = 'none';
            playground.remove();
            menu.winMenu();




    }

}
class GameMenu {

    constructor() {
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




        playground.style.display = 'none';
        document.querySelector('.menu-start').addEventListener('click', e => {
            this.menuCont.remove()
            this.game = new Game()
            this.game.start()
            playground.style.display = 'block';
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
        this.score.innerText = `Your score: ${totalScore}`;

        this.inputApl = document.createElement('input');
        this.inputApl.classList.add('inp-apl');
        this.inputApl.type = 'button';
        this.inputApl.value = 'Apply';


        this.winForm.append(this.inputName, this.score,this.inputApl);
        this.winCont.append(this.img,this.winForm)
        document.body.append(this.winCont)
        this.inputApl.addEventListener('click', () => {
            if (this.inputName.value !== '') {
            localStorage.setItem(this.inputName.value, totalScore);
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


}
let menu = new GameMenu();


