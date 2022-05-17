import {BoxSup,Alien, BigUfo, DuckTarget, SmallUfo, Target} from "./target.js";
import {Count} from "./counters.js";
import {GameMenu} from "./modal.js";
let menu = new GameMenu();
export class Game {
    constructor() {
        this.count = new Count();
        this.count.getInstance().getTotalScore();
        this.count.getInstance().getAlienScore();
        this.count.getInstance().getGun();

        this.count.getInstance().playground.addEventListener('click', (e) => {
            this.shot();
            if (e.target.classList.contains("sec")){ this.sec+=15 }
        });
        document.addEventListener('keydown', e => {
            if (e.keyCode === 32 && this.count.getInstance().gun[0] > 0) this.reloadGun()
        });

        this.timeStep = [3000, 5000, 7000, 8000, 1000 *11, 1000 *15, 1000]

    }
    shot(){
        if (this.count.getInstance().gun[1] > 0) {
            let shotSound = document.createElement('audio');
            shotSound.setAttribute("autoplay", "true");
            shotSound.innerHTML = "<source src='./music/shot.mp3' type=\"audio/mpeg\">";
            this.count.getInstance().gun[1] -=1;
            this.count.getInstance().getGun();
            document.body.append(shotSound);

            this.condition(this.count.getInstance().alienScore)
            if((this.count.getInstance().gun[0] <= 0 && this.count.getInstance().gun[1] <= 0) && this.count.getInstance().alienScore < 50){
                this.gameOver()
            }

            setInterval( ()=> {shotSound.remove()}, 2000)
        }
        if (this.count.getInstance().gun[1] <=0 ) {
            this.count.getInstance().gun[1] = 0;
            let empty = document.createElement('audio');
            empty.setAttribute("autoplay", "true");
            empty.innerHTML = "<source src='./music/emptyShot.mp3' type=\"audio/mpeg\">";
            document.body.append(empty);
            setInterval( ()=> {empty.remove()}, 2000)
        }
    }

    reloadGun() {
        this.count.getInstance().gun[1] = 20;
        this.count.getInstance().gun[0] -=1;
        this.count.getInstance().getGun();
        let reload = document.createElement('audio');
        reload.setAttribute("autoplay", "true");
        reload.innerHTML = "<source src='../music/reload.mp3' type=\"audio/mpeg\">";
        document.body.append(reload);

        setInterval( ()=> {reload.remove()}, 2000)

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
        this.count.getInstance().playground.append(this.timerCont);
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
        this.count.getInstance().playground.style.display = 'none';
        menu.gameOverMenu();
    }
    condition(score) {
        return (score === 50) ?  this.win() : score + 1 ;
    }
    win() {
        clearInterval(this.tic);

        this.count.getInstance().playground.style.display = 'none';
        this.count.getInstance().playground.remove();
            menu.winMenu();

    }

}


