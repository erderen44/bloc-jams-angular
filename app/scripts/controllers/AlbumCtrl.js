(function() {
     function AlbumCtrl() {
             this.albumData = angular.copy(albumPicasso); 
            // this.albums.push(angular.copy(albumPicasso));//
            
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();