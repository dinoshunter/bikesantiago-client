var _       = require("lodash");
var phantom = require('phantom');

function writeGeoJson (data) {

    var geojson = {
        type     : "FeatureCollection",
        crs: {
            type: "name",
            properties: {
                name: "EPSG:4326"
            }
        },

        features : []
    };

    _.each(data, function(v){
         geojson.features.push(
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [v.lon, v.lat]
                },
                properties: {
                    type  : "bikesantiago",
                    docker: {
                        title: v.dir.title,
                        dir:   v.dir.detail,
                        docks : v.docks,
                        bikes : v.bikes
                    }
                }
            }
        );

    });

    return geojson;
}

// export client
module.exports =  function(callback){
    phantom.create().then(function(ph) {
        ph.createPage().then(function(page) {
            var url = "https://bikesantiago.bcycle.com/station-locations-new/";
            page.open(url).then(function(status) {
                page.evaluate(function(){
                    var markers_ = [];
                    // replace function createMarker
                    createMarker = function (point, html) {
                        var title  = $(html).filter(".location").children("strong").text();

                        var detail = $(html).filter(".location").contents().filter(function(){
                            return this.nodeType == 3;
                        }).first().text();

                        var bikes = null;
                        var docks = null;
                        $(html).filter(".avail").children("strong").each(function(idx){
                            if(idx == 0){
                                bikes = +($(this).text());
                            }else if(idx == 1){
                                docks = +($(this).text());
                            }
                        });

                        markers_.push({
                            lon  : point.lng(),
                            lat  : point.lat(),
                            dir    : {
                                title  : title ,
                                detail : detail
                            },
                            bikes : bikes,
                            docks : docks
                        });

                    };

                    LoadKiosks();
                    return markers_;


                }).then(function(r){
                    callback(writeGeoJson(r));
                    ph.exit();
                });
            });
        });
    });

};
