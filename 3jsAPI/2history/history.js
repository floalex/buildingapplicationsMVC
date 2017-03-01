$(function() {
  $("nav").on("click", "a", function(e) {
    e.preventDefault();
    var $e = $(e.target)
    var href = $e.attr("href");
    
    switchPage(href);
    
    history.pushState({ idx: href }, $e.text(), location.pathname + href);
  });
  
  $(window).on("popstate", function(e) {
    var state = e.originalEvent.state;  // Object { idx: #page_# } or null 

    switchPage(state === null ? "#page_1" : state.idx);
  });
  
  // make sure the load the previous article when refreshing the page
  if (location.hash) {   // location.hash === #page_#
    switchPage(location.hash);
  }
  
  function switchPage(href) {
    $(".active").removeClass("active");
    $("nav a[href='" + href + "']").addClass("active");
    $("article").hide().filter(href).show();
  }
});