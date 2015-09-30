"use strict";angular.module("troutDashApp",["ngAnimate","ngCookies","ngResource","ngSanitize","ngTouch","ui.router","fsm"]),angular.module("troutDashApp").controller("MainCtrl",["$scope","StreamApiService","TableOfContentsRepository",function(a,b,c){}]),angular.module("troutDashApp").controller("StreamlistcontrollerCtrl",["$scope","StreamApiService","TableOfContentsRepository","RegionGeometryService","$anchorScroll",function(a,b,c,d,e){a.isSmallView=!0;var f=function(){var a={isExpanded:!1,isLoading:!1,selectedRegionGeometry:null,selectedRegion:null,selectedCounty:null,highlightedStream:null,currentClientCoordinates:[NaN,NaN]};return a};a.mapState=f(),a.selectCounty=function(a){console.log(a)},a.selectRegion=function(b){if(null==b)throw new Error("regionModel cannot be null");var c=!1;if(c)return a.mapState.selectedRegionGeometry=null,void(a.mapState.selectedRegion=[b]);var f=b.parent;return d.getRegion(f,b).then(function(c){return a.mapState.selectedRegionGeometry=[c],a.mapState.selectedRegion=[b],e("top"),c})},a.getTableOfContents=function(){return c.getTableOfContents().then(function(a){return a})},a.bustCache=function(){console.log("busting cache..."),c.bustTableOfContentsCache()},a.toggleMinimap=function(){null!=a.mapState&&(a.mapState.isExpanded=!a.mapState.isExpanded)}}]),angular.module("troutDashApp").directive("streamList",["StreamApiService",function(a){return{templateUrl:"./views/streamlisttemplate.html",restrict:"A",link:function(a,b,c){a.stage={isLoaded:!1,streams:null,selectedStream:null},a.getCountyScrollBodyId=function(b){var c="#"+a.getCountyId(b);return c},a.getScrollContainer=function(){return"#js-list-container"},a.getCountyId=function(a){return"hdr-county_"+a.id},a.getRegionScrollBodyId=function(b){var c="#"+a.getRegionId(b);return c},a.getRegionId=function(a){var b="hdr-region_"+a.id;return b},a.$watch("stage.streams",function(a,b){}),a.$watch("stage.selectedStream",function(a,b){})}}}]),angular.module("troutDashApp").directive("streamListItemDirective",function(){return{templateUrl:"./views/streamlistitemtemplate.html",restrict:"A",link:function(a,b,c){a.isSmall=!0,a.isAlertSymbolDisplayed=function(){if(a.isSmall===!1)return!1;var b=a.stream.Restrictions.length>0,c=null!=a.stream.AlertMessage&&a.stream.AlertMessage.length>0;return b&&c?!0:void 0},a.getAlertMessage=function(){return a.stream.AlertMessage},a.expand=function(){a.isSmall=!a.isSmall}}}}),angular.module("troutDashApp").factory("StreamApiService",["$rootScope","$cacheFactory","$http","$q","$timeout",function(a,b,c,d,e){function f(){}return f.prototype={getStreams:function(){var a=d.defer();return e(function(){var b=c.get("./data/trout-dash-minnesota.json").then(function(a){return a.data});a.resolve(b)},1e3),a.promise},getRegions:function(){var a=d.defer();return e(function(){var b=c.get("./data/regionDetails.json").then(function(a){return a.data});a.resolve(b)},1e3),a.promise}},new f}]),angular.module("troutDashApp").directive("speciesSummary",function(){return{templateUrl:"./views/speciessummarytemplate.html",restrict:"A",link:function(a,b,c){}}}),angular.module("troutDashApp").directive("streamLine",["LinearReferenceViewModel",function(a){return{templateUrl:"./views/streamlinetemplate.html",restrict:"A",link:function(b,c,d){var e=parseFloat(b.stream.LengthMiles);if(!(0>=e)){b.stage={width:292};var f=function(a){var c=Math.floor(e),d=[];if(1>c)return d.push({xOffset:0,width:1,height:3,yOffset:7}),d;for(var f=b.stage.width/a,g=0;c>=g;g++)d.push({xOffset:g*f,width:1.5,height:4,yOffset:8});return d};b.drawLines=function(){var d=parseFloat(b.stream.LengthMiles),e=1/d;b.streamLine=d3.select(c[0]).append("svg").attr("class","stream-line").attr("width",b.stage.width).attr("height",16).attr("xmlns","http://www.w3.org/2000/svg"),b.publicSegments=b.stream.Pal.Sections.map(function(b){return new a(b,e)}),b.streamLine.publicLand=b.streamLine.append("g").attr("class","stream-line_public-land"),b.streamLine.publicLand.selectAll("rect").data(b.publicSegments).enter().append("rect").attr("x",function(a){return a.xOffset*b.stage.width}).attr("y",0).attr("width",function(a){return a.width*b.stage.width}).attr("height",11).attr("rx",4).attr("ry",4).attr("class","public-land"),b.streamLine.stream=b.streamLine.append("g").attr("class","stream-line_stream").append("rect").attr("x",0).attr("y",3).attr("height",5).attr("width",b.stage.width),b.lakes=b.stream.Lakes.Sections.map(function(b){return new a(b,e)}),b.streamLine.lakes=b.streamLine.append("g").attr("class","stream-line_stream"),b.streamLine.lakes.selectAll("rect").data(b.lakes).enter().append("rect").attr("x",function(a){return a.xOffset*b.stage.width}).attr("y",1).attr("width",function(a){return a.width*b.stage.width}).attr("height",9).attr("rx",4).attr("ry",4).attr("class","stream-line_stream"),b.publicSegments=b.stream.TroutStreams.Sections.map(function(b){return new a(b,e)}),b.streamLine.troutStreamSections=b.streamLine.append("g").attr("class","stream-line_route"),b.streamLine.append("g").attr("class","stream-line_route").selectAll("g").data(b.publicSegments).enter().append("g").append("rect").attr("x",function(a){return a.xOffset*b.stage.width}).attr("y",3).attr("width",function(a){return a.width*b.stage.width}).attr("height",5).attr("class","stream-line_route"),b.stream.Restrictions.forEach(function(c,d){var f=c.Sections.map(function(b){var c=new a(b,e);return b.segment=c,b});b.streamLine.append("g").attr("class",0===d?"stream-line_restriction":"stream-line_restriction_secondary").selectAll("g").data(f).enter().append("g").append("rect").attr("x",function(a){return a.segment.xOffset*b.stage.width}).attr("y",3).attr("width",function(a){return a.segment.width*b.stage.width}).attr("height",5).attr("class","restriction")});var g=f(d),h=g[0];h.width=1,h.height=3,b.streamLine.tickMarks=b.streamLine.append("g").attr("class","stream-line_grid-lines").selectAll("rect").data(g).enter().append("rect").attr("x",function(a){return b.stage.width-a.xOffset-a.width}).attr("y",function(a){return a.yOffset}).attr("width",function(a){return a.width}).attr("height",function(a){return a.height}).attr("class","tick")},b.getCounties=function(){return b.stream.Counties?b.stream.Counties.map(function(a){return a.Name}).join(","):null},b.getAlternativeNames=function(){return b.stream.LocalNames?0===b.stream.LocalNames.length?"":"aka "+b.stream.LocalNames.join(","):null},b.drawLines()}}}}]),angular.module("troutDashApp").directive("restrictionLegend",function(){return{templateUrl:"./views/restrictionlegendtemplate.html",restrict:"A",link:function(a,b,c){}}}),angular.module("troutDashApp").directive("streamRatioText",function(){return{templateUrl:"./views/streamratiotexttemplate.html",restrict:"A",link:function(a,b,c){var d=parseFloat(a.stream.LengthMiles),e=parseFloat(a.stream.PalsLength);a.streamLength=d.toFixed(1),a.publicLandLength=e.toFixed(1)}}}),angular.module("troutDashApp").directive("streamRatio",["StreamRatioViewModel",function(a){return{templateUrl:"./views/streamratiotemplate.html",restrict:"A",link:function(b,c,d){var e=new a(b.stream.TroutStreamsLength,b.stream.PalsLength);b.streamRatio=e}}}]),angular.module("troutDashApp").factory("LinearReferenceViewModel",function(){var a=function(a,b){this.lineSegment=null,this.xOffset=0,this.width=0,this.init(a,b)};return a.prototype.init=function(a,b){this.lineSegment=a;var c=a.Stop*b,d=a.Start*b;this.xOffset=1-c,this.width=Math.abs(c-d)},a}),angular.module("troutDashApp").factory("StreamRatioViewModel",function(){var a=function(a,b){this.totalLength=0,this.publicLandLength=0,this.init(a,b)},b=a.prototype;return b.init=function(a,b){if(null==a||0>b)throw new Error("totalLength cannot be null or less than 0");if(null==b||0>b)throw new Error("publicLength cannot be null or less than 0");b>a&&(b=a),this.totalLength=a,this.publicLandLength=b;var c=function(a){var b=Math.sqrt(a/Math.PI);return b};this.waterRadius=c(this.totalLength);var d=this.publicLandLength/this.totalLength;this.publicLandRadius=this.waterRadius*d},a});var MINI_MAP_CLASS=".js-mini-map";angular.module("troutDashApp").directive("miniMapDirective",["$rootScope","GeometryApiService","$q","$timeout",function(a,b,c,d){return{templateUrl:"./views/minimaptemplate.html",restrict:"A",link:function(b,c,e){function f(){console.log("reset!"),b.active.classed("active",!1),b.active=d3.select(null),b.svg.transition().duration(300).call(b.zoom.translate([0,0]).scale(1).event)}function g(){b.root.style("stroke-width",1.5/d3.event.scale+"px"),b.root.attr("transform","translate("+d3.event.translate+")scale("+d3.event.scale+")")}function h(a){i(),b.minimapState.loadingRegion=d3.select(this).classed("minimap-geogrpahy_region_loading",!0);var c=a.children.map(function(a){return a.children}),d=_.unique(_.flatten(c),"Id"),e=b.streams.selectAll("path.minimap-geography_stream").data(d,function(a){return a.Id});e.enter().append("path").attr("class","minimap-geography_stream").attr("data-id",function(a){return a.id}).attr("id",function(a){return"streamPoint_"+a.id}).attr("data-name",function(a){return a.name}).attr("d",function(a){return b.path(a.geometry)}).style("opacity",0).transition().delay(200).duration(750).style("opacity",1),e.exit().transition().duration(300).style("opacity",0).remove()}function i(){null!=b.minimapState.loadingRegion&&(b.minimapState.loadingRegion.classed("minimap-geogrpahy_region_loading",!1),b.minimapState.loadingRegion=d3.select(null))}function j(a){if(b.active.node()===this)return f();b.active.classed("active",!1),b.active=d3.select(this).classed("active",!0);var c=b.path.bounds(a.geometry),d=c[1][0]-c[0][0],e=c[1][1]-c[0][1],g=(c[0][0]+c[1][0])/2,h=(c[0][1]+c[1][1])/2,i=.95/Math.max(d/b.minimapState.width,e/b.minimapState.height),j=[b.minimapState.width/2-i*g,b.minimapState.height/2-i*h];b.svg.transition().delay(200).duration(750).call(b.zoom.translate(j).scale(i).event)}function k(a){if(null==a)return"";var b=a.statefp+a.countyfp;return b}function l(a){return"county_"+k(a)}function m(a){var c=l(a),d="[data-id="+c+"]",e=b.counties.select(d).node();b.selectedCounty.node()!==e&&(b.selectedCounty.classed("active",!1),b.selectedCounty=d3.select(e).classed("active",!0))}function n(){d3.event.defaultPrevented&&d3.event.stopPropagation()}b.minimapState={isLoading:!0,regionGeometries:null,selectedRegionId:null,selectedCountyId:null,width:45,height:45,isMacro:!0,loadingRegion:d3.select(null)},b.active=d3.select(null),b.selectedCounty=d3.select(null),a.$on("county-select",function(a,b){console.log(b)}),a.$on("header-clone",function(a,c){null!=c&&("region"===c.type&&d(function(){b.minimapState.selectedRegionId=c.id,b.$apply()}),"county"===c.type&&d(function(){b.minimapState.selectedCountyId=c.name,b.$apply()}))});var o=b.$watch(function(){return b.minimapState.selectedRegionId},function(a,c){if(null!=a&&a!==c){var d=b.currentRegions.filter(function(b){return b.id===a});d.length>0&&a!==c&&j(d[0])}}),p=b.$watch(function(){return b.minimapState.selectedCountyId},function(a,c){if(null!=a){var d=b.currentCounties.filter(function(b){return b.name===a});d.length>0&&a!==c&&m(d[0])}}),q=b.$watch(function(){return b.minimapState.regionGeometries},function(a,b){null!=a&&(console.log("new Geometries!",a),r(a))}),r=function(a){var b=d3.select(c[0]);console.log(b)},s=function(a){b.projection=d3.geo.albersUsa().scale(1).translate([0,0]),b.path=d3.geo.path().projection(b.projection).pointRadius(.15);var d=a.geometry,e=b.path.bounds(d),f=.95/Math.max((e[1][0]-e[0][0])/b.minimapState.width,(e[1][1]-e[0][1])/b.minimapState.height),h=[(b.minimapState.width-f*(e[1][0]+e[0][0]))/2,(b.minimapState.height-f*(e[1][1]+e[0][1]))/2];b.projection.scale(f).translate(h),b.zoom=d3.behavior.zoom().translate([0,0]).scale(1).scaleExtent([1,8]).size([40,40]).on("zoom",g),b.svg=d3.select(c[0]).select(MINI_MAP_CLASS).append("svg").attr("viewBox","0 0 "+b.minimapState.width+" "+b.minimapState.height).attr("preserveAspectRatio","xMinYMin meet").attr("class","minimap-root").on("click",n,!0),b.root=b.svg.append("g").attr("class","minimap-geography"),b.root.append("rect").attr("class","minimap-geography_background").attr("width","100%").attr("height","100%").on("click",u),b.counties=b.root.append("g").attr("class","minimap-geography minimap-geogrpahy_counties"),b.states=b.root.append("g").attr("class","minimap-geography minimap-geogrpahy_states"),b.streams=b.root.append("g").attr("class","minimap-geography minimap-geogrpahy_streams"),b.regions=b.root.append("g").attr("class","minimap-geography minimap-geogrpahy_regions")},t=function(a,c){var e=b.minimapState.isMacro;e?(h.bind(this)(a),b.minimapState.selectedRegionId=a.id,b.selectRegion(a).then(function(a){d(function(){i(),d(v,500)},1e3)})):w(),d(function(){b.$apply()})},u=function(){var a=b.minimapState.isMacro;console.log(a),a?v():w(),d(function(){b.$apply()})},v=function(){b.minimapState.isMacro=!1},w=function(){b.minimapState.isMacro=!0,f()},x=function(a,c,d){b.regions.selectAll("path.minimap-geogrpahy_region").data(c,function(a){return a.id}).enter().append("path").attr("class","minimap-geogrpahy_region").attr("opacity","0.0").attr("data-id",function(a){return a.id}).attr("id",function(a){return"region_"+a.id}).attr("data-name",function(a){return a.shortName}).attr("d",function(a){return b.path(a.geometry)}).on("click",t).transition().attr("opacity","1.0").duration(600).delay(function(a,b){return 100+200*b})};b.getTableOfContents().then(function(a){console.log("minimap got toc");var c=_.map(a),d=_(c).pluck("children").flatten().value(),e=_(d).pluck("children").flatten().value();b.currentState=c[0],b.currentCounties=e,b.currentRegions=d;var f=0,g=b.currentCounties.map(function(a){return Math.max(0,a.stream_count)}),h=d3.max(g);b.countyChoroplethScale=d3.scale.linear().domain([f,h]).range(["#FFFFBB","#BB00CC"]),b.minimapState.isLoading=!1,s(b.currentState),x(c,d,e)}),b.$on("$destroy",function(){o(),p(),q(),unwatchTableOfContents()})}}}]),angular.module("troutDashApp").factory("GeometryApiService",["$rootScope","$cacheFactory","$http","$q","$timeout",function(a,b,c,d,e){function f(){}return f.prototype={getRegionGeometries:function(){var a=d.defer();return e(function(){var b=c.get("./data/regionGeometry.json").then(function(a){return a.data});a.resolve(b)},1e3),a.promise}},new f}]),angular.module("troutDashApp").factory("HierarchicalGeometryViewModel",function(){function a(){this.init()}return a.prototype={id:null,name:"",shortName:"",geometry:null,centroidLatitude:NaN,centroidLongitude:NaN,type:null,parent:null,children:[],init:function(){this.id=null,this.name="",this.shortName="",this.geometry=null,this.centroidLongitude=NaN,this.centroidLatitude=NaN,this.parent=null,this.children=[]}},a});var TABLE_OF_CONTENTS_CACHE_KEY="tableOfContents",COUNTIES_CACHE_KEY="counties",REGIONS_CACHE_KEY="regions";angular.module("troutDashApp").factory("TableOfContentsRepository",["BaseApiService","RegionGeometryService","HierarchicalGeometryViewModel",function(a,b,c){var d=function(){a.call(this),this.logCache()},e=d.prototype=Object.create(a.prototype);return e.bustTableOfContentsCache=function(){this.cache.remove(TABLE_OF_CONTENTS_CACHE_KEY)},e.getTableOfContents=function(){var a=TABLE_OF_CONTENTS_CACHE_KEY;if(this.cache.get(a))return console.log("found in cache"),this.cache.get(a);var b=this.doCall({},"/data/tableOfContents.topo.json").then(function(a){var b=topojson.feature(a,a.objects.state),d=topojson.feature(a,a.objects.region),e=topojson.feature(a,a.objects.county),f=topojson.feature(a,a.objects.streamProperties),g=_(b.features).map(function(a){var b=new c,d=a.properties;return b.id=d.gid,b.name=d.name,b.centroidLatitude=NaN,b.shortName=d.short_name,b.centroidLongitude=NaN,b.parent=null,b.type="state",b.children=[],b.geometry=a,b}).indexBy("id").value(),h=_(d.features).map(function(a){var b=new c;return b.shortName=a.properties.name,b.id=a.properties.gid,b.name=a.properties.name,b.geometry=a,b.type="region",b}).sortBy("name").indexBy("id").value(),i=_(e.features).filter(function(a){return a.properties.stream_count>0}).map(function(a){var b=new c,d=a.properties;return b.id=d.gid,b.name=d.name,b.geometry=a,_.extend(b,d),b.type="county",b}).sortBy("name").indexBy("id").value(),j=_(i).groupBy("region_id").value(),k=g[49],l=_(h).groupBy(function(){return k.id}).value(),m=_(f.features).map(function(a){var b=new c,d=a.properties;return b.id=d.Id,b.name=d.Name,b.geometry=a,b.centroidLongitude=d.CentroidLongitude,b.centroidLatitude=d.CentroidLatitude,_.extend(b,d),b.type="streamCentroid",b}).sortBy("name").indexBy("id").value();return _.forEach(g,function(a){var b=a.id,c=l[b];a.children=c,_.forEach(a.children,function(b){var c=b.id,d=j[c];b.children=d,b.parent=a,_.forEach(b.children,function(a){a.parent=b})})}),_.forEach(m,function(a){_.forEach(a.Counties,function(b){var c=i[b.Id];c.children.push(a)})}),this.logCache(),g}.bind(this));return this.cache.put(a,b),b},d.prototype=e,new d}]);var createPath=function(a,b){return a+"/"+b+".topo.json"};angular.module("troutDashApp").factory("RegionApiService",["BaseApiService",function(a){var b=function(){a.call(this),this.logCache()},c=b.prototype=Object.create(a.prototype);return c.getRegion=function(a,b){if(null==a)throw new Error("stateId cannot be null");if(null==b)throw new Error("regionId cannot be null");var c=createPath(a,b);return this.doCall({},"/data/"+c)},b.prototype=c,new b}]),angular.module("troutDashApp").factory("StateApiService",function(){var a=function(){},b={};return a.prototype=b,new a}),angular.module("troutDashApp").factory("RegionRepositoryService",["RegionGeometryService","TableOfContentsRepository","$q",function(a,b,c){var d=function(){},e={getRegions:function(){return b.getTableOfContents().then(function(a){console.log("got em")})},isCached:function(a){return!1},cacheRegion:function(a){return!0},uncacheRegion:function(a){return!0},getRegion:function(a){this.isCached()}};return d.prototype=e,new d}]);var REGION_CACHE_KEY="region",createKey=function(a,b){return REGION_CACHE_KEY+"_"+a+"_"+b};angular.module("troutDashApp").factory("RegionGeometryService",["BaseApiService","RegionApiService","HierarchicalGeometryViewModel",function(a,b,c){var d=function(){a.call(this)},e=d.prototype=Object.create(a.prototype);return e.getRegion=function(a,c){if(null==a||null==a.shortName)throw new Error("state cannot be null");if(null==c||null==c.shortName)throw new Error("region cannot be null");var d=a.shortName,e=c.shortName,f=createKey(d,e);if(this.cache.get(f))return console.log("found in cache"),this.cache.get(f);var g=b.getRegion(d,e).then(function(a){return console.log("new geom",a),a});return this.cache.put(f,g),g},d.prototype=e,new d}]),angular.module("troutDashApp").factory("BaseApiService",["$rootScope","$cacheFactory","$http","$q","$timeout",function(a,b,c,d,e){function f(){this.cache=h}var g=(window.sessionStorage,800),h=b("du");return f.prototype={cache:null,resetCache:function(){h.removeAll()},logCache:function(){var a=this.cache.info();console.log("cache",a)},doCall:function(a,b,h){h=!1;var i={url:f.API_BASE_PATH+b,params:a,cache:h,method:"GET"},j=d.defer();return e(function(){var a=c(i).then(function(a){return a&&a.data&&a.data.exceptionType?d.reject(a.data):a.data})["catch"](function(a){return d.reject(a)});j.resolve(a)},g),j.promise}},f.API_BASE_PATH="",f}]),angular.module("troutDashApp").directive("miniMapTestHarnessDirective",function(){return{templateUrl:"./views/minimaptestharnesstemplate.html",restrict:"A",link:function(a,b,c){console.log("test harness"),a.onLoadTocClick=function(){a.getTableOfContents().then(function(b){a.regions=_.values(b)[0].children})},a.onToggleClick=function(){console.log("onToggleClick")},a.onLoadRegionGeometriesClick=function(b){console.log("click"),a.selectRegion(b)},a.onZoomClick=function(){console.log("onZoomClick")}}}}),angular.module("troutDashApp").factory("BaseModel",function(){function a(a){a&&this._fromJSON(a)}return a.prototype={constructor:a,_fromJSON:function(a){var b;for(b in a)a.hasOwnProperty(b)&&(this[b]=a[b])},toJSON:function(){var a,b={};for(a in this)this.hasOwnProperty(a)&&"function"!=typeof this[a]&&(b[a]=this[a]);return b},destroy:function(){var a;for(a in this)this.hasOwnProperty(a)&&delete this[a]}},a.generateIdomaticName=function(a){return a.type},a}),angular.module("troutDashApp").factory("BaseCollection",["BaseModel",function(a){function b(a){this._models=[],a&&this._addAll(a)}b.prototype={model:a,constructor:b,_models:null,length:0,toJSON:function(){return this.map(function(a){return a.toJSON()})},toArray:function(){return this._models.slice()},destroy:function(){this.each(function(a){a.destroy()}),this._models.length=0,this._models=null},copy:function(a){return a?new this.constructor(a):new this.constructor(this._models)},_addAll:function(a){var b,c=a.length;for(b=0;c>b;b++)this.add(a[b])},add:function(a){var b;return b=a instanceof this.model?a:new this.model(a),this._models.push(b),this.length++,this.length},remove:function(a){var b,c=a;return b=c instanceof this.model?this._removeByModel(c):this._removeById(c),b&&-1!==b&&this.length--,this.length},empty:function(){this._models.length=0,this.length=0},first:function(){return this._models[0]},sort:function(a){this._models.sort(a)},sortBy:function(a,b){this.sort(function(c,d){var e=c[a],f=d[a];return b?e>f?-1:f>e?1:0:f>e?-1:e>f?1:0})},sortByType:function(a,b,c){"string"===c?this.sortByString(a,b,!0):"arrayLength"===c?this.sortByCount(a,b):"number"===c?this.sortByNumber(a,b):this.sortBy(a,b)},sortByString:function(a,b,c){this.sort(function(d,e){var f=d[a],g=e[a];return c&&(f=f.toLowerCase(),g=g.toLowerCase()),b?f>g?-1:g>f?1:0:g>f?-1:f>g?1:0})},sortByCount:function(a,b){this.sort(function(c,d){var e=c[a]?c[a].length:0,f=d[a]?d[a].length:0;return b?e>f?-1:f>e?1:0:f>e?-1:e>f?1:0})},sortByNumber:function(a,b){this.sort(function(c,d){var e=c[a]?c[a]:0,f=d[a]?d[a]:0;return b?e>f?-1:f>e?1:0:f>e?-1:e>f?1:0})},get:function(a){for(var b=0,c=this._models.length;c>b;b++)if(this._models[b].id==a)return this._models[b]},at:function(a){return this._models[a]},getPage:function(a,b){var c=b*(a-1),d=c+b;return c>this._models.length-1?[]:this._models.slice(c,d)},contains:function(a){var b,c=this.length;for(b=0;c>b;b++)if(this._models[b].id===a)return!0;return!1},merge:function(a){var b,c,d;return this.constructor!==a.constructor?[]:(b=this,c=[],d=[],this.each(function(b,d){a.contains(b.id)||(this.remove(b.id),c.push(b.id))}),a.each(function(a,b){this.contains(a.id)||(this.add(a),d.push(a.id))}),{removed:c,added:d})},_removeById:function(a){var b,c=this.length;for(b=0;c>b;b++)if(this._models[b].id===a)return this._models.splice(b,1)},_removeByModel:function(a){var b,c=this.length;for(b=0;c>b;b++)if(this._models[b]===a)return this._models.splice(b,1)}};var c=["forEach","each","map","reduce","find","filter","indexOf"];return _.each(c,function(a){b.prototype[a]=function(){var b=Array.prototype.slice.call(arguments);return b.unshift(this._models),_[a].apply(_,b)}}),b.SORT={TYPE:{ARRAY_LENGTH:"arrayLength",STRING:"string",DATE:"date",NUMBER:"number"}},b}]),angular.module("troutDashApp").factory("HierarchicalGeometryCollection",["BaseCollection","HierarchicalGeometryViewModel",function(a,b){function c(b){a.call(this,b)}var d=c.prototype=Object.create(a.prototype);return c.prototype.constructor=c,d.model=b,c}]);