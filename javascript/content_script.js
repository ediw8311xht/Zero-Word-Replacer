

function replace_in_element(th_el, word_obj) {
    for (key in word_obj) {
        let rgg = new RegExp(key, "ig");
        th_el.nodeValue = th_el.nodeValue.replace(rgg, word_obj[key]);
    }
}

function get_replace(start_element, word_obj) {
    let all_elements = start_element.getElementsByTagName("*");
    for (let i = 0; i < all_elements.length; i++) {

        //developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        //nodeType 3 means text node.
        if (all_elements[i].nodeType == 1) {
            for (let j = 0; j < all_elements[i].childNodes.length; j++) {
                if (all_elements[i].childNodes[j].nodeType == 3) {
                    replace_in_element(all_elements[i].childNodes[j], word_obj);
                }
            }
        }
        if (all_elements[i].nodeType == 3) {
            replace_in_element(all_elements[i], word_obj)
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function()
    {
        let getData = browser.storage.local.get();

        getData.then(function(data){
            console.log(data);
            console.log('updated');
            get_replace(document.body, data);
        })

    }, 100);

});
