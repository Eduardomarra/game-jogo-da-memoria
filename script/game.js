let game = {

    lockMode: false,
    firstCard: null,
    secondcard: null,

    setCard: function(id){

        let card = this.cards.filter(card => card.id === id)[0];
        if(card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondcard = card;
            this.secondcard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function(){
        if(!this.firstCard || !this.secondcard){
            return false;
        }
        return this.firstCard.icon === this.secondcard.icon;
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondcard = null;
        this.lockMode = false;
    },

    unFlippercard(){
        this.firstCard.flipped = false;
        this.secondcard.flipped = false;
        this.clearCards();
    },

    checkGameOver(){
        return this.cards.filter(cards => !cards.flipped).length == 0;
    },

    techs : ["bootstrap",
            "css",
            "firebase",
            "angular",
            "eletron",
            "html",
            "javascript",
            "jquery",
            "react",
            "vuejs"],
    cards : null,

    //ADICIONAR AS IMAGENS NOS CARDS
    createCardsFromTechs: function (techs){

        this.cards = [];

        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech))
        });

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards
    },

    //CRIAR PARES DOS CARDS
    createPairFromTech: function (tech){
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }, 
        {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }]
    },

    //CRIAR ID DOS CARDS
    createIdWithTech: function (tech){
        return tech + parseInt(Math.random() * 1000)
    },

    // EMBARALHAR CARTAS
    shuffleCards: function (cards){
        let currentIndex = this.cards.length;
        let randonIndex = 0;

        while(currentIndex !== 0){
            randonIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--

            [this.cards[randonIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randonIndex]];

        }
    }
}


