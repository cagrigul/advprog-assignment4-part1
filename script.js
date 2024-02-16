require([
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/views/MapView",
    "dojo/domReady!"
], function(
    Map,
    FeatureLayer,
    MapView
) {
    // Create the map
    var map = new Map({
        basemap: "gray"
    });

    // Create the MapView
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-90.1994, 38.6270],
        zoom: 12
    });

    /*************************************************************
    * The PopupTemplate content is the text that appears inside the
    * popup. {fieldName} can be used to reference the value of an
    * attribute of the selected feature. HTML elements can be used
    * to provide structure and styles within the content. The
    * fieldInfos property is an array of objects (each object representing
    * a field) that is use to format number fields and customize field
    * aliases in the popup and legend.
    **************************************************************/
    var template = { // autocasts as new PopupTemplate()
        title: "Neighborhood: {NHD_NAME}",
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "NHD_NUM",
                label: "Neighborhood Number: ",
                visible: true
            }, {
                fieldName: "NHD_NUMTXT",
                label: "Neighborhood Text Number: ",
                visible: true,
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }, {
                fieldName: "NHD_NAME",
                label: "Neighborhood Name: ",
                visible: true
            }, {
                fieldName: "ANGLE",
                label: "Orientation Angle: ",
                visible: true,
                format: {
                    digitSeparator: true,
                    places: 2
                }
            }, {
                fieldName: "NHD_NUM_ST",
                label: "Neighborhood Street Number: ",
                visible: true
            }, {
                fieldName: "Shape__Area",
                label: "Area: ",
                visible: true,
                format: {
                    digitSeparator: true,
                    places: 2
                }
            }, {
                fieldName: "Shape__Length",
                label: "Perimeter Length: ",
                visible: true,
                format: {
                    digitSeparator: true,
                    places: 2
                }
            }]
        }]
    };

    var renderer = {
        type: "simple", // Use a simple renderer for single-symbol visualization.
        symbol: {
            type: "simple-fill", // Use a fill symbol for polygon features.
            color: [0, 0, 0, 0.1], // Change the fill color to black with very low opacity.
            outline: {
                width: 0.5, // Keep the outline width as before.
                color: [255, 0, 0, 0.7] // Change the outline color to a semi-transparent red for contrast.
            }
        }
    };

    // Reference the popupTemplate instance in the popupTemplate property of FeatureLayer
    var featureLayer = new FeatureLayer({
        url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/ArcGIS/rest/services/STL_Neighborhood/FeatureServer/0",
        outFields: ["*"],
        popupTemplate: template,
        renderer: renderer
    });

    map.add(featureLayer);
});
