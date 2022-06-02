
class Hit extends String {

    string;

    size = 1;

    hand      = false;
    foot      = false;
    frontside = false;
    backside  = false;
    defensive = false;

    constructor( string, properties, size = 1 ) {
        super( string );

        this.string = string;

        this.size = size;

        if (properties && typeof properties == "object") {
            if (Array.isArray( properties )) {
                properties = properties.reduce(( obj, key ) => (obj[key] = true, obj), { });
            }

            if (properties.hand)      this.hand      = true;
            if (properties.foot)      this.foot      = true;
            if (properties.frontside) this.frontside = true;
            if (properties.backside)  this.backside  = true;
            if (properties.defensive) this.defensive = true;
        }
    }

    toString() {
        return this.string;
    }
}

const hit_sets_obj = {};

function inject_hit( hit, key ) {
    if (!hit_sets_obj[key]) hit_sets_obj[key] = [];
    hit_sets_obj[key].push( hit );
}


function bothsides_hand( string, count ) {
    string = new Hit( string, ['hand','backside','frontside'], count );
    string.hand = true;
    string.backside = true;
    string.frontside = true;
    inject_hit( string, "bothsides_hand" );
    return string;
}

function backside_hand( string, count ) {
    string = new Hit( string, ['backside','hand'], count );
    string.hand = true;
    string.backside = true;
    inject_hit( string, "backside_hand" );
    return string;
}

function frontside_hand( string, count ) {
    string = new Hit( string, ['frontside','hand'], count );
    string.hand = true;
    string.frontside = true;
    inject_hit( string, "frontside_hand" );
    return string;
}

function noside_hand_defensive( string, count ) {
    string = new Hit( string, ['hand','defensive'], count );
    string.hand = true;
    string.defensive = true;
    inject_hit( string, "noside_hand_defensive" );
    return string;
}

function noside_hand( string, count ) {
    string = new Hit( string, ['hand'], count );
    string.hand = true;
    inject_hit( string, "noside_hand" );
    return string;
}

function noside_defensive( string, count ) {
    string = new Hit( string, ['defensive'], count );
    string.defensive = true;
    inject_hit( string, "noside_defensive" );
    return string;
}

function bothsides_foot( string, count ) {
    string = new Hit( string, ['frontside','backside','foot'], count );
    string.foot = true;
    string.backside = true;
    string.frontside = true;
    inject_hit( string, "bothsides_foot" );
    return string;
}

function backside_foot( string, count ) {
    string = new Hit( string, ['backside','foot'], count );
    string.foot = true;
    string.backside = true;
    inject_hit( string, "backside_foot" );
    return string;
}

function frontside_foot( string, count ) {
    string = new Hit( string, ['frontside','foot'], count );
    string.foot = true;
    string.frontside = true;
    inject_hit( string, "frontside_foot" );
    return string;
}

function bothsides_foot_defensive( string, count ) {
    string = new Hit( string, ['frontside','backside','foot','defensive'], count );
    string.foot = true;
    string.defensive = true;
    inject_hit( string, "bothsides_foot_defensive" );
    return string;
}

function frontside_foot_defensive( string, count ) {
    string = new Hit( string, ['frontside','foot','defensive'], count );
    string.foot = true;
    string.frontside = true;
    string.defensive = true;
    inject_hit( string, "frontside_foot_defensive" );
    return string;
}

function backside_foot_defensive( string, count ) {
    string = new Hit( string, ['backside','foot','defensive'], count );
    string.foot = true;
    string.backside = true;
    string.defensive = true;
    inject_hit( string, "backside_foot_defensive" );
    return string;
}

/***********/

bothsides_hand(           "suora");
frontside_hand(           "etusuora");
backside_hand(            "takasuora");
noside_hand(              "etu-taka", 2);
noside_hand(              "neljä suoraa", 4);

bothsides_hand(           "uppari");
frontside_hand(           "etukäden uppari");
backside_hand(            "takakäden uppari");

bothsides_hand(           "koukku");
frontside_hand(           "etukäden koukku");
backside_hand(            "takakäden koukku");

bothsides_hand(           "kyynärpää yltä");
frontside_hand(           "etukäden kyynärpää yltä");
backside_hand(            "takakäden kyynärpää yltä");

bothsides_hand(           "kyynärpää alta");
frontside_hand(           "etukäden kyynärpää alta");
backside_hand(            "takakäden kyynärpää yltä");

bothsides_foot(           "polvi");
frontside_foot(           "etujalan polvi");
backside_foot(            "takajalan polvi");

bothsides_foot(           "kiertopotku");
frontside_foot(           "etujalan kiertopotku");
backside_foot(            "takajalan kiertopotku");

bothsides_foot_defensive( "potkun torjunta");
frontside_foot_defensive( "etujalan potkun torjunta");
backside_foot_defensive(  "takajalan potkun torjunta");

noside_hand_defensive(    "pään torjunta");
noside_defensive(         "lyönnin väistö");
noside_defensive(         "potkun väistö");
noside_defensive(         "askel taakse josta väistö", 2 );

bothsides_foot_defensive( "pysäri");
frontside_foot_defensive( "etujalan pysäri");
backside_foot_defensive(  "takajalan pysäri");

bothsides_foot_defensive( "työntö polvella");
frontside_foot_defensive( "työntö etujalan polvella");
backside_foot_defensive(  "työntö takajalan polvella");

bothsides_foot_defensive( "pysäri josta kiinni napatun jalan irrotus", 2 );
bothsides_foot_defensive( "kiertopotku josta kiinni napatun jalan irrotus", 2 );

/***********/

hit_sets_obj.bothsides = [ ...hit_sets_obj.bothsides_hand, ...hit_sets_obj.bothsides_foot, ...hit_sets_obj.bothsides_foot_defensive ];

hit_sets_obj.backside = [ ...hit_sets_obj.backside_hand, ...hit_sets_obj.backside_hand, ...hit_sets_obj.backside_foot_defensive ];

hit_sets_obj.frontside = [ ...hit_sets_obj.frontside_hand, ...hit_sets_obj.frontside_foot, ...hit_sets_obj.frontside_foot_defensive ];

hit_sets_obj.hands = [ ...hit_sets_obj.noside_defensive, ...hit_sets_obj.noside_hand_defensive ];

hit_sets_obj.feets = [ ...hit_sets_obj.bothsides_hand, ...hit_sets_obj.backside_hand, ...hit_sets_obj.frontside_hand, ...hit_sets_obj.noside_hand_defensive ];

hit_sets_obj.defensives = [ ...hit_sets_obj.noside_defensive, ...hit_sets_obj.noside_hand_defensive ];


const hit_sets_keys = Object.keys( hit_sets_obj );

const hit_sets_arr = hit_sets_keys.map( key => hit_sets_obj[key] );

const hit_sets_titles = {
	"bothsides_hand"           : "Kummankin puolen kädet",
	"frontside_hand"           : "Etukädet",
	"backside_hand"            : "Takakädet",
	"noside_hand"              : "Kädet, ei puolijakoa",
	"bothsides_foot"           : "Kummankin puolen jalat",
	"frontside_foot"           : "Etujalat",
	"backside_foot"            : "Takajalat",
	"backside_foot_defensive"  : "Puolustavat kummatkin jalat",
	"frontside_foot_defensive" : "Puolustavat etujalat",
	"bothsides_foot_defensive" : "Puolustavat takajalat",
	"noside_hand_defensive"    : "Puolustavat kädet",
	"defensives"               : "Puolustavat",
	"noside_defensive"         : "Puolustavat, ei puolijakoa",
	"bothsides"                : "Etupuoli",
	"frontside"                : "Etupuoli",
	"backside"                 : "Takapuoli",
	"hands"                    : "Kädet",
	"feets"                    : "Jalat"
};

export {
	hit_sets_obj,
	hit_sets_arr,
	hit_sets_keys,
	hit_sets_titles
};
