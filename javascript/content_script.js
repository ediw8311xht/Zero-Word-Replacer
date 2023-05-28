

function replace_in_element(th_el, word_obj) {
    for (key in word_obj) {
        let rgg = new RegExp(key, "ig");
        th_el.nodeValue = th_el.nodeValue.replace(rgg, word_obj[key]);
    }
}


function get_replace(start_element, word_obj) {
    const avoid_nodes = ["style", "script"];
    //developer.mozilla.org/en-US/docs/Web/API/
    //Info on nodes, nodeType, etc.
    if (avoid_nodes.includes(start_element.tagName.toLowerCase())) {
        return; // Might be worth to add code to handle script/style/etc nodes, but for now just skipping.
    }
    else {
        let all_elements = start_element.childNodes;
        for (let i = 0; i < all_elements.length; i++) {
            if (all_elements[i].nodeType == Node.ELEMENT_NODE) {
                get_replace(all_elements[i], word_obj);
            }
            else if (all_elements[i].nodeType == Node.TEXT_NODE) {
                replace_in_element(all_elements[i], word_obj)
            }
        }
    }
}

function replacer_main() {
    setTimeout(function() {
        let getData = browser.storage.local.get();
        getData.then(function(data){
            get_replace(document.body, data);
        })
    }, 100);
}


var lastcheck = 0;
var mlimit = 500; //miliseconds

function main() {
    replacer_main();

    document.addEventListener("DOMSubtreeModified", function() {
        let time_between = Math.abs(Date.now() - lastcheck);
        if ( time_between > mlimit ) {
            replacer_main();
            lastcheck = Date.now();
        }
    });
}

document.addEventListener("DOMContentLoaded", main);


