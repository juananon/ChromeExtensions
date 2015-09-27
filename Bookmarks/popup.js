// M�todo que guarda los marcadores.
function saveBookmarks(bookmarksUrl, bookmarkstitle) {
  // Obtenemos el nombre de la carpeta.
  var folderName = document.getElementById("folderName").value;
  // Creamos la carpeta
  chrome.bookmarks.create(
          {'parentId': '1','title': folderName}, // Objeto con la informaci�n de la carpeta del marcador.
          function(newFolder) {
              // Creamos los marcadores.
              for(i = 0; i < bookmarksUrl.length; i++)
              {
                  chrome.bookmarks.create({'parentId': newFolder.id,'title': bookmarkstitle[i],'url': bookmarksUrl[i]});
              }
          }
        );
}

// Una vez se ha cargado la p�gina de la extensi�n...
document.addEventListener('DOMContentLoaded', function() {
    var saveTabsPageButton = document.getElementById('saveTabs');
    // Manejamos el evento click del bot�n.
    saveTabsPageButton.addEventListener('click', function() {

        var bookmarksUrl = [];
        var bookmarkstitle = [];

        // Obtenemos todas las pesta�as.
        chrome.tabs.getAllInWindow(null, function(tabs){
            // Las recorremos para guardar el titulo y la url.
            for (var i = 0; i < tabs.length; i++) {
                bookmarksUrl.push(tabs[i].url);
                bookmarkstitle.push(tabs[i].title);
            }
            // Llamamos a la funci�n que crea los marcadores.
            saveBookmarks(bookmarksUrl, bookmarkstitle);
        });

  }, false);
}, false);
