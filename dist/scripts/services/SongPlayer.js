 (function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};
 
         /**
 * @desc gives currentAlbum access to the contents of the album in Fixtures.js
 * @type {function}
 */           
         var currentAlbum = Fixtures.getAlbum();
         
 /**
 * @desc Buzz object audio file
 * @type {Object}
 */        
          var currentBuzzObject = null;
/**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */       
          var setSong = function(song) {
                if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
                }
 
         currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
         });
 
                SongPlayer.currentSong = song;
         };
         
/**
 * @function playSong
 * @desc Plays the current Buzz object and sets the song.playing variable to true.
*/       
         var playSong = function(song){
             currentBuzzObject.play();
             song.playing = true;   
         }
 
/**
 * @function getSongIndex
 * @desc gets the index of a song in the currentAlbum object.
*/        
         
          var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };
   
 /**
 * @desc defines currently playing audio file
 * @type {Object}
 */   
         SongPlayer.currentSong = null;       
         
         SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong; 
            if (SongPlayer.currentSong !== song) {
                       
                 setSong(song);                
                 playSong(song);
            }
             
            else if (SongPlayer.currentSong === song) {
                    if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                    }
            }              
        };
            SongPlayer.pause = function(song) {
                song = song || SongPlayer.currentSong;
                currentBuzzObject.pause();
                song.playing = false;
            };
  
/**
 * @function Songplayer.previous
 * @desc gets the index of the song before the current song in the album object.
*/  
         
            SongPlayer.previous = function() {
                 var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                 currentSongIndex--;
                
                if (currentSongIndex < 0) {
                     currentBuzzObject.stop();
                     SongPlayer.currentSong.playing = null;
                }
                
                else {
                     var song = currentAlbum.songs[currentSongIndex];
                     setSong(song);
                     playSong(song);
                 }
                
             };
         
/**
 * @function playSong
 * @desc Plays the current Buzz object and sets the song.playing variable to true.
*/       
         var playSong = function(song){
             currentBuzzObject.play();
             song.playing = true;   
         }
            return SongPlayer;
     }
 
    angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();