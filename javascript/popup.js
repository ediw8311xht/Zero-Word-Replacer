
function remove_word_callback(word) {

}

function append_word_to_list(original_word, replace_with) {

    let rmv = document.createElement("button");
    rmv.classList.add("remove-word");
    rmv.innerText = "X";
    rmv.addEventListener("click", function(event) {
        console.log(event.target.parentNode.children[0].innerText);
        let removeItem = browser.storage.local.remove(event.target.parentNode.children[0].innerText);
        removeItem.then(function() {
            document.getElementById("word-wrapper").removeChild(event.target.parentNode);
        });
    }, {"once": true});

    let owp = document.createElement("p");
    owp.classList.add("orig-word");
    owp.innerText = original_word;

	let rwp = document.createElement("p");
    rwp.classList.add("repl-word");
    rwp.innerText = replace_with;

    let div_g = document.createElement("div");
    div_g.classList.add("word-div");
    div_g.appendChild(owp);
	div_g.appendChild(rwp);
    div_g.append(rmv);

    document.getElementById("word-wrapper").append(div_g);
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

	let new_word_el = document.getElementById("new-word");
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
