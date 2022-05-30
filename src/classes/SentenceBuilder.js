import { hit_sets_obj } from '../sets';

export default class SentenceBuilder {
    constructor( max_length = 1, min_length = 1, set_keys = [] ) {
        this.min_length = min_length;
        this.max_length = max_length;
        this.set_keys   = [ ...set_keys ];
    }

    get() {
        return this.build( this.max_length, this.min_length, undefined, this.set_keys );
    }

	getGenerator() {
		return (function() { return this.get(); }).bind( this );
	}

    build( max_length = 1, min_length = 1, sentence = [], set_keys = Object.keys( hit_sets_obj ) ) {

        var set = set_keys.reduce(( out, set_key ) => {
            for (var word of hit_sets_obj[ set_key ]) if (out.indexOf( word ) == -1) out.push( word );
            return out;
        }, [ ]);

        if (!(min_length >= 0)) return;
        if (!(min_length <= max_length)) return;

        var count = max_length - min_length + 1;

        count = Math.floor( count * Math.random() );

        count = Math.min( count, set.length );

        for (var i = 0; i < 100; i++) {

            var word = set[ parseInt( Math.random() * set.length ) ];

            sentence.push( word );

            if (sentence.length >= min_length + count) break;
        }

        if (set == hit_sets_obj.bothsides || set == hit_sets_obj.bothsides_hand || set == hit_sets_obj.bothsides_foot || set == hit_sets_obj.bothsides_foot_defensive) {
            if (sentence.length > 1) sentence.prefix = "Saman puolen";
        }

        return sentence;
    }
}
