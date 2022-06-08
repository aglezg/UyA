document.addEventListener('DOMContentLoaded', function() {
  var options = {
      data: {
        "Monitores": null,
        "Ratones": null
      },
      onAutocomplete:function(dataResult) {
        window.location.replace('./'+dataResult.toLowerCase()+'.html');
      }
    }
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, options);
});