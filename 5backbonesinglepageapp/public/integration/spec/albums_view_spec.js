describe("Albums View", function() {
  beforeEach(function() {
    this.view = new AlbumsView({ collection: albums_scaffold });
  });
  
  it ("should have a collection property assigned", function() {
    expect(this.view.collection).toBeDefined();
    expect(this.view.collection.length).toBe(albums_scaffold.length);
  });
  
  it ("should have a Handlebars template compiled", function() {
    expect(this.view.template).toBeDefined();
  });
  
  it ("should render to an #albums container when render called", function() {
    this.view.render();
    expect($("#albums li").length).toEqual(albums_scaffold.length);
  });
  
  it ("should re-render the view when the collection changes", function() {
    var model = albums_scaffold.findWhere({ artist: "Tori Kelly" });
    var original_html, new_html;
    
    this.view.render();
    original_html = $("#albums").html();
    model.set("title", "Teh Javascripts");
    new_html = $("#albums").html();
    expect(original_html).not.toEqual(new_html);
  });
});