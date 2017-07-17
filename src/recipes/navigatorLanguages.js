/* 
    RECIPE: navigatorLanguages
    -------------------------------------------------------------
    Author: sclow
    Description: Looks for navigator.languages usage on the web

*/

void function() {
    window.CSSUsage.StyleWalker.recipesToRun.push( function navigatorLanguages( element, results) {
        var re = /\.languages[;|,|)]+/g;
        var nodeName = element.nodeName;
        if (nodeName == "SCRIPT")
        {
            results[nodeName] = results[nodeName] || { count: 0, };
            // if inline script. ensure that it's not our recipe script and look for string of interest
            if (element.text !== undefined && element.text.match(re) != null)
            {
                results[nodeName].count++;
            }
            else if (element.src !== undefined && element.src != "")
            {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", element.src, false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText.match(re) != null)
                {
                    results[nodeName].count++;
                }
            }
        }
        return results;
    });
}();