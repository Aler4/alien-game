
export const playground = document.querySelector('.playground');

export let totalScore = 0;
export let gun = [2,20];
export let alienScore = 0;

let gunCont = document.createElement('div');
gunCont.classList.add('gun-cont');
export let bullets = document.createElement('span');
export let clips = document.createElement('span');

bullets.innerHTML = `${gun[1]} X <img src="./img/bullet.png">`;
clips.innerHTML = `${gun[0]} X <img src="./img/bullet-clip.png">`;
gunCont.append(clips, bullets);

let alienScoreCont = document.createElement('span')
alienScoreCont.classList.add('alien-score')
alienScoreCont.innerHTML = ` <img src="./img/logo.png">${alienScore}/50`;
playground.append(alienScoreCont);

let totalScoreCont = document.createElement("span");
totalScoreCont.classList.add('total-score')
totalScoreCont.innerHTML =`Score: ${totalScore}`
playground.append(totalScoreCont, gunCont);



export class Target {
    constructor() {
        const target = document.createElement('div');
        this.target = target;
        this.target.style.zIndex = 2;
        const img = new Image();
        this.img = img;

        this.point = document.createElement('span');
        this.point.classList.add('point');

        this.point.innerHTML = 50 + "!";

        img.src = './img/nlo3.gif';
        target.classList.add('target');
        img.classList.add('nlo');

        this.hitSound = document.createElement('audio');
        this.start = this.target.style.top = Math.round(Math.random() * 500) + "px";
        target.append(this.point);
        target.append(img);
        playground.append(target);

        this.target.addEventListener('click', (e) => {this.hit()})

    };
    step() {

        this.pos = parseInt(this.target.style.left,10);
        this.pos = isNaN(this.pos) ? -100 : this.pos;
        if (this.pos >= 1300){
            this.target.remove();
        }
        else {this.pos += 60}
        this.target.style.left = this.pos + "px";
        this.target.style.top = Math.round(this.start * 100) + "px";


    };
    move() {
        setInterval(() => this.step(),300)

    };
    hit(score = 50,point = 1 ) {
        if (gun[1] > 0) {
            this.img.src = './img/EXPL2.gif';
            this.point.style.visibility = 'visible';
            this.point.style.opacity = '1';
            this.point.style.top = -30 + '%';

            this.hitSound.setAttribute("autoplay", "true");
            this.hitSound.innerHTML = "<source src='./music/explsmal.mp3' type=\"audio/mpeg\">";
            document.body.append(this.hitSound);

            totalScore +=Number(score);
            totalScoreCont.innerHTML = `Score: ${totalScore}`;

            alienScore += point;
            alienScoreCont.innerHTML = `<img src="./img/logo.png">${alienScore}/50`;



            setInterval(() => {
                this.target.style.display = 'none';
            }, 1000)
            setInterval(() => {
                this.hitSound.remove();
            }, 2000)
        }
    }

}

export class SmallUfo extends Target {
    constructor() {
        super();
        this.target.style.height = 25 +"px";
        this.target.style.width = 50 +"px";
        this.target.style.zIndex = 1;
        this.point.innerHTML = 75 + "!";
        this.img.src = './img/nlo.gif';
    }
    hit(score = 75) {
        super.hit(score);
    }


};

export class BigUfo extends Target {
    constructor() {
        super();
        this.target.style.height = 200 +"px";
        this.target.style.width = 200 +"px";
        this.img.src = './img/bigUfo.gif';
        this.point.innerHTML = 25 + "!";
    }
    hit(score = 25) {
        super.hit(score);
        this.img.src = './img/explsmall1.gif';


    }

};

export class DuckTarget extends Target {
    constructor() {
        super();
        this.target.style.height = 100 +"px";
        this.target.style.width = 100 +"px";
        this.img.src = './img/duck2.gif';
        this.point.innerHTML = -25 + "!";
    }
    hit(score = -25) {
        if (gun[1] > 0) {
            super.hit(-25,0);
            this.img.src = './img/duckShot.png';
            this.hitSound.innerHTML = "<source src='./music/quack.mp3' type=\"audio/mpeg\">";
        }

    }

};

export class Alien extends Target {
    constructor() {
        super();
        this.target.classList.remove('target');
        this.target.classList.add('alien')
        this.target.style.height = 300 +"px";
        this.target.style.width = 300 +'px';
        this.target.style.zIndex = 99;
        this.point.innerHTML = 60 + "!";
        this.img.src = './img/alien3.gif';
        this.target.style.top =  650 + 'px';
        this.start = this.target.style.left = Math.round(Math.random() * 1000) + "px";

        this.target.style.bottom = -200 + "px";

    }
    step() {
        super.step();
        this.pos = parseInt(this.target.style.bottom,10)
        this.pos = isNaN(this.pos) ? 300 : this.pos;
        if (this.pos >= 450){

        }
        else {this.pos += 4}
        this.target.style.left = this.start;
        this.target.style.top =  350 + 'px';
        this.target.style.bottom = this.pos + 'px'
    }
    hit(score = 60) {
        if (gun[1] > 0) {
            super.hit(score);
            this.img.src = './img/shotAlien.png';
            this.hitSound.innerHTML = "<source src='./music/alienShot.mp3' type=\"audio/mpeg\">";
        }
    }
};
export class BoxSup extends Target {
    constructor() {
        super();
        this.img.src = './img/box.png';
        this.target.classList.remove('target');
        this.target.classList.add('box');
        this.target.style.top = -100 + '%'
        this.start = this.target.style.left = Math.round(Math.random() * 1000) + "px";
        this.randomPrise = Math.round(Math.random() * 10);
        this.point.style.color = 'red';




    }
    step() {
        super.step();

        this.pos = parseInt(this.target.style.top,10);
        this.pos = isNaN(this.pos) ? -100 : this.pos;
        if (this.pos >= 900){
            this.target.remove();
        }
        else {this.pos += 30}
        this.target.style.top = this.pos + "px";
        this.target.style.left = this.start;
    }
    hit() {
        if(this.randomPrise > 5) {
            this.point.innerHTML = '+15 sec';
            this.sec += 15;

        }
        else if (this.randomPrise < 5 && this.randomPrise !==0) {
            gun[0] += 1;
            this.point.innerHTML = '+1 <img class="point-img" src="./img/bullet-clip.png">';
            clips.innerHTML = `${gun[0]} X <img src="./img/bullet-clip.png">`;


        }
        if (this.randomPrise === 0) {
            this.point.innerHTML = 'Empty!';
        }
        super.hit(25,0)
        this.img.src = './img/explbig.gif';
        if (this.randomPrise > 5) {
            this.img.classList.add('sec');
        }


    }

}
