/**
 * Joujma  API handler
 */
import axios from 'axios';
import config from '../js/config.js';

export default {
    // get now playing response
    get(){
        let apiurl = config.api_url+'/api/nowplaying';
        let error  = 'There was a problem fetching the Now Playing API from JoujmaFM.';
        return axios.get( apiurl );
    },
    // get channels data from api
    getChannels( callback ) {
        let apiurl = config.api_url+'/api/stations';
        let error  = 'There was a problem fetching the latest list of channels from JoujmaFM.';
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

        let apiurl =   config.api_url+'/api/nowplaying/'+ channel_id;
        //let title  = channel.name || '...';
        let error  = 'There was a problem loading the list of songs for this channel from JoujmaFM. ';
        return axios.get( apiurl );
        /*axios.get( apiurl ).then( res => {
            if ( !res.data ) return callback( error, [] );
            return callback( null, res.data );
        })
            .catch( e => {
                return callback( error + String( e.message || '' ), [] );
            });*/
    },

    // parse channels list from api response
    _parseChannels( channels ) {
        let output = [];

        if ( Array.isArray( channels ) ) {
            for ( let c of channels ) {
                c.mp3file   = c.listen_url;
                c.image     = '/img/'+c.shortcode+'.png';
                c.songsurl  = config.api_url+'/api/nowplaying/'+ c.id;
                c.twitter   = 'https://twitter.com/@';
                c.route     = '/channel/'+ c.shortcode;
                c.favorite  = false;
                c.active    = false;
                output.push( c );
            }
        }

        return output;
    },

    _parseNowplaying(data) {
        return undefined;
    }
}
