
let instance = null;
export class Count {
    constructor() {
        if (instance === null) {
            this.totalScore = 0;
            this.gun = [2, 20];
            this.alienScore = 0;
            this.playground = document.querySelector('.playground');
            this.alienScoreCont = document.createElement('span');
            this.totalScoreCont = document.createElement('span');
            this.gunCont = document.createElement('div');
            this.bullets = document.createElement('span');
            this.clips = document.createElement('span');

            instance = this;



        }
    }
    getInstance() {
        return instance;
    }
    getTotalScore() {
        this.totalScoreCont.classList.add('total-score')
        this.totalScoreCont.innerHTML = `Score: ${this.totalScore}`
        this.playground.append(this.totalScoreCont);
        return this.totalScore;
    }
     getAlienScore() {
         this.alienScoreCont.classList.add('alien-score')
         this.alienScoreCont.innerHTML = ` <img src="../img/logo.png">${this.alienScore}/50`;
         this.playground.append(this.alienScoreCont);
         return this.alienScore;
     }

     getGun() {
         this.gunCont.classList.add('gun-cont');
         this.bullets.innerHTML = `${this.gun[1]} X <img src="../img/bullet.png">`;
         this.clips.innerHTML = `${this.gun[0]} X <img src="../img/bullet-clip.png">`;
         this.gunCont.append(this.clips, this.bullets);
         this.playground.append(this.gunCont);
         return this.gun;
     }
};

