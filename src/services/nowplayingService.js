/**
 * Joujma  API handler
 */
import axios from 'axios';
import config from 'config';

export default {
    // get now playing response
    get(){
        let apiurl = config.api_url+'/nowplaying';
        //let error  = 'There was a problem fetching the Now Playing API from JoujmaFM.';
        return axios.get( apiurl ).then( res => {
            const list = this._parseChannels( res.data );
            console.log("Nowplaying Service :  get : ",list)
            return list;
        });
    },
    // get channels data from api
    getChannels(  ) {
        let apiurl = config.api_url+'/stations';
        //let error  = 'There was a problem fetching the latest list of channels from JoujmaFM.';
        return axios.get( apiurl ).then( res => {
            const list = this._parseChannels( res.data );
            if ( !list.length ) return error;
            return list;
        })
        /*axios.get( apiurl ).then( res => {
            const list = this._parseChannels( res.data );
            if ( !list.length ) return callback( error, [] );
            return callback( null, list );
        })
            .catch( e => {
                return callback( error + String( e.message || '' ), [] );
            });*/
    },

    // fetch songs for a channel
    getSongs( channel_id ) {
        console.log("Nowplaying Service :  getSongs : ", channel_id)
        let apiurl =   config.api_url+'/nowplaying/'+ channel_id;
        return axios.get( apiurl ).then( res => {
            //if ( !res.data ) return callback( error, [] );
            res.data.station = this._parseChannel( res.data.station );
            console.log("Nowplaying Service :  getSongs : ", res.data)
            return res.data ;
        });
    },

    // parse channels list from api response
    _parseChannel( c ) {
                c.mp3file   = c.listen_url;
                c.image     =   '/img/icon.png' || '/img/stations/'+c.shortcode+'.png' ;
                c.songsurl  = config.api_url+'/nowplaying/'+ c.id;
                c.route     = '/station/'+ c.shortcode;
                c.favorite  = false;
                c.active    = false;

        return c;
    },
    _parseChannels( channels ) {
        let output = [];


            console.log("parchannels for loop ")
            for ( let ch of channels ) {
                let c = ch.station;
                c.mp3file   = c.listen_url;
                c.image     = '/img/'+c.shortcode+'.png';
                c.songsurl  = config.api_url+'/nowplaying/'+ c.id;
                c.route     = '/channel/'+ c.shortcode;
                c.favorite  = false;
                c.active    = false;
                ch.station = c;
                output.push( ch );
            }


        return output;
    },

    _parseNowplaying() {
        return undefined;
    }
}
