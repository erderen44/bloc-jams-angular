 (function() {
     function SongPlayer($rootScope, Fixtures) {
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

                currentBuzzObject.bind('timeupdate', function() {
                    $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                    });
                });
              
                SongPlayer.currentSong = song;
                return song;
              
   // functions for assignment 11 here             
                SongPlayer.volume = currentBuzzObject.getVolume();
                SongPlayer.setVolume = currentBuzzObject.setVolume();
              
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
         
 /**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
         SongPlayer.currentTime = null;
         
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
                console.log(SongPlayer.currentSong)
                if (currentSongIndex < 0) {
                     /*currentBuzzObject.stop();
                     SongPlayer.currentSong.playing = null;*/
                    stopSong();
                }
                
                else {
                     var song = currentAlbum.songs[currentSongIndex];
                     setSong(song);
                     playSong(song);
                 }
                
             };

         /**
 * @function Songplayer.next
 * @desc gets the index of the song after the current song in the album object.
*/  
         
            SongPlayer.next = function() {
                var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                 currentSongIndex++;
                
                if (currentSongIndex > currentAlbum.songs.length-1) {
                    stopSong();
                }
                
                else {
                     var song = currentAlbum.songs[currentSongIndex];
                     setSong(song);
                     playSong(song);
                 }
                
             };
         
         /**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
             SongPlayer.setCurrentTime = function(time) {
                 if (currentBuzzObject) {
                     currentBuzzObject.setTime(time);
                 }
             };
         
            SongPlayer.setVolume = function(volume){
                if (currentBuzzObject){
                    currentBuzzObject.setVolume(volume);
                }
            }
/**
 * @function playSong
 * @desc Plays the current Buzz object and sets the song.playing variable to true.
*/       
         var playSong = function(song){
             currentBuzzObject.play();
             song.playing = true;   
         }
         
         /**
 * @function stopSong
 * @desc Stops the current Buzz object and sets the song.playing variable to null.
*/      
         var stopSong = function(song){
             currentBuzzObject.stop();
             /*song.playing = null; */ 
             SongPlayer.currentSong.playing = null;
         }
         
            return SongPlayer;
     }
 
    angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();