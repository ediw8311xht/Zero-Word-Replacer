
function remove_item_callback(event) {
    let removeItem = browser.storage.local.remove(event.target.parentNode.children[0].innerText);
    removeItem.then(function() {
        document.getElementById("word-wrapper").removeChild(event.target.parentNode);
    });
}

function append_word_to_list(orig, repl) {
    let adl = { 'rmv'   : ['button', 'remove-word',  'X'],
                'owp'   : ['p'     , 'orig-word'  , orig],
                'rwp'   : ['p'     , 'repl-word'  , repl],
                'div_g' : ['div'   , 'word-div'   ,   '']   };

    for (const prp in adl) {
        let nl = document.createElement(adl[prp][0]);
        nl.classList.add(adl[prp][1]);
        nl.innerText = adl[prp][2];
        adl[prp] = nl;
    }

    adl['rmv'].addEventListener("click", remove_item_callback, {"once": true});
    adl['div_g'].appendChild(    adl['owp'] );
	adl['div_g'].appendChild(    adl['rwp'] );
    adl['div_g'].append(         adl['rmv'] );

    document.getElementById("word-wrapper").append(adl['div_g']);
}

function empty_fill() {
    let og_div = document.getElementById("word-wrapper");
    while (og_div.children.length > 0) {
        og_div.removeChild(og_div.firstChild);
    }
}

function write_full_list(storage_data) {
    empty_fill();
    if (storage_data) {
        for (key in storage_data) {
            append_word_to_list(key, storage_data[key]);
        }
    }
}

function click_event_callback() {

	let new_word_el     = document.getElementById("new-word");
	let replace_word_el = document.getElementById("replace-with");

    //Because js does not like {new_word_el.value : value}
    let nwobj = {};
    nwobj[new_word_el.value] = replace_word_el.value;

    let setStoredData = browser.storage.local.set(nwobj);
    setStoredData.then(function() {
        new_word_el.value = "";
        replace_word_el.value = "";
        let getStoredData = browser.storage.local.get();

        getStoredData.then(function(results){
            write_full_list(results);
        });
    });
}


let getStoredData = browser.storage.local.get();

getStoredData.then(function(results){
    write_full_list(results);
    document.getElementById("input-word").addEventListener("click", click_event_callback);
});
