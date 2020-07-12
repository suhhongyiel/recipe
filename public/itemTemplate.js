(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['item'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"item\" data-bookmark=\""
    + alias4(((helper = (helper = helpers.BOOKMARK || (depth0 != null ? depth0.BOOKMARK : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"BOOKMARK","hash":{},"data":data,"loc":{"start":{"line":1,"column":33},"end":{"line":1,"column":45}}}) : helper)))
    + "\" data-categories=\""
    + alias4(((helper = (helper = helpers.CATEGORIES || (depth0 != null ? depth0.CATEGORIES : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CATEGORIES","hash":{},"data":data,"loc":{"start":{"line":1,"column":64},"end":{"line":1,"column":78}}}) : helper)))
    + "\" data-ingredients=\""
    + alias4(((helper = (helper = helpers.INGREDIENTS || (depth0 != null ? depth0.INGREDIENTS : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"INGREDIENTS","hash":{},"data":data,"loc":{"start":{"line":1,"column":98},"end":{"line":1,"column":113}}}) : helper)))
    + "\"\n    data-caption=\""
    + alias4(((helper = (helper = helpers.CAPTION || (depth0 != null ? depth0.CAPTION : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CAPTION","hash":{},"data":data,"loc":{"start":{"line":2,"column":18},"end":{"line":2,"column":29}}}) : helper)))
    + "\">\n    <div class=\"item-contents\">\n        <div class=\"item-image-container\">\n            <a href=\""
    + alias4(((helper = (helper = helpers.CAPTION || (depth0 != null ? depth0.CAPTION : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CAPTION","hash":{},"data":data,"loc":{"start":{"line":5,"column":21},"end":{"line":5,"column":32}}}) : helper)))
    + "\"><img src=\""
    + alias4(((helper = (helper = helpers.IMG_URL || (depth0 != null ? depth0.IMG_URL : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"IMG_URL","hash":{},"data":data,"loc":{"start":{"line":5,"column":44},"end":{"line":5,"column":55}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.CAPTION || (depth0 != null ? depth0.CAPTION : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CAPTION","hash":{},"data":data,"loc":{"start":{"line":5,"column":62},"end":{"line":5,"column":73}}}) : helper)))
    + "\"></a>\n        </div>\n        <div class=\"item-info-container\">\n            <span class=\"item-title\">"
    + alias4(((helper = (helper = helpers.CAPTION || (depth0 != null ? depth0.CAPTION : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CAPTION","hash":{},"data":data,"loc":{"start":{"line":8,"column":37},"end":{"line":8,"column":48}}}) : helper)))
    + "</span>\n        </div>\n        <div class=\"item-button-container\">\n            <button type=\"button\" id=\"bookmark\" class=\"fa-star far\"></button>\n            <button type=\"button\" id=\"trash\" class=\"fa-trash fas\"></button>\n        </div>\n    </div>\n</div>";
},"useData":true});
})();